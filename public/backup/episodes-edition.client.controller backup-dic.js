/*
 *  $scope.episodes :: Es la lista de episodios mostrada al usuario dividida en calidades
 *  Reparar directiva de number-input : si se agrega numero redondear y no agregar signo menos "-"
 */

(function() {
  'use strict';

  function EpisodesEditionCtrl($scope, $rootScope, SeriesAPI, EpisodesAPI, serie, $state) {

    var _this = this;
    /* Configuración inicial */
    $scope.showQualities = false;

    $scope.toggleQualities = function() {
      $scope.showQualities = !$scope.showQualities;
    }

    this.getOriginals = function(serie) {
      this.originalEpisodes = angular.copy(serie.episodes);
      $scope.serieName = serie.name;
      $scope.serieId = serie.id;
    };

    this.getOriginals(serie); 

    this.getQualities = function(episodes) {
      $scope.qualities = [];

      episodes.forEach(function(episode) {
        episode.downloads.forEach(function(download) {
          if(!_.contains($scope.qualities, download.quality))
            $scope.qualities.push(download.quality);
        });
      });

      _this.qualitiesObj = {};

      $scope.qualities.forEach(function(quality){
        _this.qualitiesObj[quality] = [];
      });
    };

    this.getQualities(serie.episodes);

   

    this.setUserEpisodesWithQualities = function(episodes) {
      episodes.forEach(function(episode) {
        episode.qualities = angular.copy(_this.qualitiesObj);

        episode.downloads.forEach(function(download) {
          episode.qualities[download.quality].push(download);
        });
      });

      $scope.episodes = episodes;
    };

    this.setUserEpisodesWithQualities(serie.episodes);

    $scope.extensions = ['MP4', 'MKV', 'XVID'];
    $scope.spaces = [100,200,300,350];
    $scope.fansubs = ['KKF', 'RBF', 'WZF', 'JDF'];
    //TODO: Definir estas 3 variables
    
    /* Configuración inicial fin */

    
    /* Cambios en episodios */
    
    $scope.addEpisode = function() {
      $scope.episodes.push({
        name: '',
        number: !_.isEmpty($scope.episodes) ? parseInt(_.last($scope.episodes).number + 1) : 1,
        image: '',
        qualities: angular.copy(_this.qualitiesObj),
        videos: [],
        serieId: $scope.serieId
      });
    };

    $scope.addServer = function (qualityOfEpisode) {
      qualityOfEpisode.push({});
    };

    $scope.removeServer = function(qualityOfEpisode, index) {
      qualityOfEpisode.splice(index, 1);
    };

    $scope.saveEpisode = function(episode) {
      //TODO: FIX -
      // -actualiza cambios multiples veces
      // -si es nuevo guarda el episodio muchas veces, asi que se repide el capitulo.
      var saveEpisode = _this.restoreEpisodeStructure(episode);
      _this.validateToSaveEpisode(saveEpisode);
    };

    $scope.addVideo = function(videosOfEpisode) {
      videosOfEpisode.push({});
    };

    $scope.removeVideo = function(videosOfEpisode, index) {
      videosOfEpisode.splice(index, 1);
    };

    /* Cambios en episodios fin */


    /* Cambios en calidades Inferior */

    $scope.openQualityNewModal = function() {
      $scope.editingQuality = false;
      $scope.newQuality = {
        extension: '',
        space: '',
        fansub: '',
      };

      _this.qualityNewModal = angular.element('#animes-quality-edition');
      _this.qualityNewModal.openModal();
    };

    $scope.addNewQuality = function() {
      if(!$scope.newQuality.extension || !$scope.newQuality.space || !$scope.newQuality.fansub)
        return Materialize.toast('Calidad no especificada completamente', 4000);

      var newQuality = $scope.newQuality.extension + '-' +
                       $scope.newQuality.space + '-' +
                       $scope.newQuality.fansub;

      if(_this.qualityDoesNotExist(newQuality)){
        $scope.qualities.push(newQuality);
        $scope.episodes.forEach(function(episode) {
          episode.qualities[newQuality] = [];
        });
        _this.qualityNewModal.closeModal();
        Materialize.toast('Calidad agregada', 4000);
      }
      else
        Materialize.toast('Calidad existente, seleccione una distinta.', 4000);
    };

    this.qualityDoesNotExist = function(qualityName) {
      return !_.contains($scope.qualities, qualityName);
    };

    $scope.onDeleteQuality = function(quality) {
      $scope.currentQuality = quality;
      _this.deleteQualityModal = angular.element('#animes-quality-deletion');
      _this.deleteQualityModal.openModal();
    };

    $scope.deleteQuality = function() {
      $scope.episodes.forEach(function(episode) {
        delete episode.qualities[$scope.currentQuality];
      });
      $scope.qualities.splice($scope.qualities.indexOf($scope.currentQuality), 1);
      _this.deleteQualityModal.closeModal();
      Materialize.toast('Calidad eliminada', 4000);
    };

    $scope.onEditQuality = function(quality) {
      $scope.editingQuality = true;
      $scope.currentQuality = quality;
      var qualitySplit = quality.split('-');

      $scope.newQuality = {
        extension: qualitySplit[0],
        space: qualitySplit[1],
        fansub: qualitySplit[2],
      };

      _this.editQualityModal = angular.element('#animes-quality-edition');
      _this.editQualityModal.openModal();
    };

    $scope.updateQuality = function() {
      if(!$scope.newQuality.extension || !$scope.newQuality.space || !$scope.newQuality.fansub)
        return Materialize.toast('Calidad no especificada completamente', 4000);

      var newQuality = $scope.newQuality.extension + '-' +
                       $scope.newQuality.space + '-' +
                       $scope.newQuality.fansub;

      if(_this.qualityDoesNotExist(newQuality)){
        $scope.qualities.splice($scope.qualities.indexOf($scope.currentQuality), 1);
        $scope.qualities.push(newQuality);
        
        $scope.episodes.forEach(function(episode) {
          episode.qualities[newQuality] = angular.copy(episode.qualities[$scope.currentQuality]);
          episode.qualities = _.omit(episode.qualities, [$scope.currentQuality]);
        });

        _this.editQualityModal.closeModal();
        Materialize.toast('Calidad actualizada', 4000);
      }
      else
        Materialize.toast('Calidad existente, seleccione una distinta.', 4000);
    };

    /* Cambios en calidades Inferior fin */
    

    /* Handle deleted episodes */

    this.deletedEpisodesIds = [];

    $scope.onDeleteEpisode = function(episode, index) {
      if(episode.id)
        _this.deletedEpisodesIds.push(episode.id);
      $scope.episodes.splice(index, 1);
    };

    /* Handle deleted episodes fin */

    /* Guardar episodios */
    
    $scope.saveEpisodes = function() {
      _this.prepareEpisodesToSave();
    };

    this.prepareEpisodesToSave = function() {
      var readyEpisodes = [];

      $scope.episodes.forEach(function(episode){
        var readyEpisode = _this.restoreEpisodeStructure(episode);
        readyEpisodes.push(readyEpisode);
      });
        
      _this.saveEpisodes(readyEpisodes);
    };

    this.restoreEpisodeStructure = function(episode) {
      var readyEpisode = {
        id: episode.id || undefined,
        serieId: episode.serieId || $scope.serie.id,
        number: episode.number,
        name: episode.name,
        image: episode.image,
        downloads: [],
        videos: []
      };

      for(var quality in episode.qualities){
        var currentQualityDownloads = episode.qualities[quality];
        currentQualityDownloads.forEach(function(download) {
          if(download.server && download.url)
            readyEpisode.downloads.push({
              quality: quality,
              server: download.server,
              url: download.url
            });
        });
      };

      episode.videos.forEach(function(video) {
        if(video.server && video.url)
          readyEpisode.videos.push({
            server: video.server,
            url: video.url
          });
      });

      return readyEpisode;
    };

    this.saveEpisodes = function(readyEpisodes){
      readyEpisodes.forEach(function(episode) {
        _this.validateEpisodeToSave(episode);
      });
      _this.deletedEpisodesIds.forEach(function(episodeId) {
        _this.deleteEpisode(episodeId);
      });
    };
    
    this.validateEpisodeToSave = function(episode) {
      if(!episode.id)
        _this.saveEpisode(episode);
      else {
        if(_this.episodeHasChanged(episode))
          _this.updateEpisode(episode);
        else
          Materialize.toast('Nada', 4000);
      }
    };

    this.episodeHasChanged = function(episode) {
      var originalEpisode = _.findWhere(this.originalEpisodes, {id: episode.id});
      return !_.isEqual(originalEpisode, episode);
    };

    this.saveEpisode = function(episode) {
      EpisodesAPI.save(episode).$promise
      .then(function(savedEpisode) {
        Materialize.toast('Episodio creado con éxito', 4000);
      })
      .catch(function(){
        Materialize.toast('Error al guardar episodio', 4000);
      });
    };

    this.updateEpisode = function(episode) {
      EpisodesAPI.update(
        {
          id: episode.id
        }, episode
      ).$promise
      .then(function(updatedEpisode) {
        Materialize.toast('Episodio actualizado con éxito', 4000);
      })
      .catch(function(){
        Materialize.toast('Error al actualizar episodio', 4000);
      });
    };

    this.deleteEpisode = function(episodeId) {
      EpisodesAPI.delete({
        id: episodeId
      }).$promise
      .then(function(savedEpisode) {
        Materialize.toast('Episodio eliminado con éxito', 4000);
      })
      .catch(function(){
        Materialize.toast('Error al eliminar episodio', 4000);
      });
    };

    //NEW EDITION EPISODES

    $scope.openEpisodeEditionModal = function(episode) {
      $scope.selectedEpisode = episode;
      
      _this.episodeEditionModal = angular.element('#episode-edition-modal');
      _this.episodeEditionModal.openModal();
    }

  }

  angular.module('series').controller('EpisodesEditionCtrl', [
    '$scope',
    '$rootScope',
    'SeriesAPI',
    'EpisodesAPI',
    'serie',
    '$state',
    EpisodesEditionCtrl
  ]);
})();