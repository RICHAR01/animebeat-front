(function() {
  'use strict';

  function EpisodesEditionCtrl($scope, $rootScope, $q, SeriesAPI, EpisodesAPI, DownloadsAPI, VideosAPI, 
                               serie, fansubs, qualities, downloadServers, videoServers, fileTypes, $state) {

    /* Configuración inicial */

    var _this = this;
    this.episodeEditionModal = null;
    $scope.episodesQualities = [];
    $scope.showQualities = false;
    $scope.fansubs = fansubs;
    $scope.qualities = qualities;
    $scope.downloadServers = downloadServers;
    $scope.videoServers = videoServers;
    $scope.fileTypes = fileTypes;

    $scope.toggleQualities = function() {
      $scope.showQualities = !$scope.showQualities;
    };

    this.transformEpisodesNumberIntoStringToCompare = function(serie) {
      serie.episodes.forEach(function(episode) {
        episode.number = episode.number + '';
      });
    };

    this.transformEpisodesNumberIntoStringToCompare(serie);

    this.getOriginals = function(serie) {
      $scope.episodes = angular.copy(serie.episodes);
      $scope.serieName = serie.name;
      $scope.serieId = serie.id;
    };

    this.getOriginals(serie); 

    this.getEpisodesQualities = function(episodes) {
      episodes.forEach(function(episode) {
        episode.downloads.forEach(function(download) {
          var episodeQuality = {
            qualityId: download.qualityId,
            qualityName: download.quality.name,
            fansubId: download.fansubId,
            fansubName: download.fansub.name,
            fileTypeId: download.fileTypeId,
            fileTypeName: download.fileType.name,
            mbs: download.mbs
          };

          if(!_.findWhere($scope.episodesQualities, episodeQuality)) {
            $scope.episodesQualities.push(episodeQuality);
          }
        });
      });
    };

    this.getEpisodesQualities(serie.episodes);
    
    /* Configuración inicial fin */


    /* Cambios en episodios */

    this.episodeAttributes = ['id', 'name', 'number', 'image', 'serieId'];
    
    $scope.onAddOrUpdateEpisode = function(episode) {
      if (episode) {
        $scope.selectedEpisode = angular.copy(episode);
        _this.originalEpisode = _.pick(episode, _this.episodeAttributes);
        _this.originalDownloads = angular.copy(episode.downloads);
        _this.originalVideos = angular.copy(episode.videos);
      }
      else {
        $scope.selectedEpisode = {
          name: '',
          number: _.isEmpty($scope.episodes) ? 1 : parseInt(parseInt(_.last($scope.episodes).number) + 1),
          image: '',
          serieId: $scope.serieId,
          downloads: [],
          videos: []
        };
      }

      if (!_this.episodeEditionModal) {
        _this.episodeEditionModal = angular.element('#episode-edition-modal');
        _this.episodeEditionModal.modal();
      }
      _this.episodeEditionModal.modal('open');
      
    };

    $scope.onDeleteEpisode = function(episode, index) {
      _this.episodeIdToDelete = episode.id;
      _this.episodeIndexToDelete = index;

      if (!_this.episodeDeletionModal) {
        _this.episodeDeletionModal = angular.element('#episode-deletion-modal');
        _this.episodeDeletionModal.modal();
      }

      _this.episodeDeletionModal.modal('open');
    };

    $scope.deleteEpisode = function() {
      _this.deleteEpisode(_this.episodeIdToDelete)
      .then(function() {
        $scope.episodes.splice(_this.episodeIndexToDelete, 1);
        _this.episodeDeletionModal.modal('close');
        Materialize.toast('Episodio eliminado exitosamente', 4000);
      })
      .catch(function(err) {
        Materialize.toast('Error al eliminar episodio', 4000);
      });
    };

    /* sub: api calls */

    this.createEpisode = function(episode) {
      return EpisodesAPI.save(episode).$promise;
    };

    this.deleteEpisode = function(episodeId) {
      return EpisodesAPI.delete({
        id: episodeId
      }).$promise;
    };

    this.updateEpisode = function(episode) {
      return EpisodesAPI.update({
        id: episode.id
      }, episode).$promise;
    };

    this.createDownload = function(download) {
      return DownloadsAPI.save(download).$promise;
    };

    this.updateDownload = function(download) {
      return DownloadsAPI.update({
        id: download.id
      }, download).$promise;
    };

    this.deleteDownload = function(downloadId) {
      return DownloadsAPI.delete({
        id: downloadId
      }).$promise;
    };

    this.createVideo = function(video) {
      return VideosAPI.save(video).$promise;
    };

    this.updateVideo = function(video) {
      return VideosAPI.update({
        id: video.id
      }, video).$promise;
    };

    this.deleteVideo = function(videoId) {
      return VideosAPI.delete({
        id: videoId
      }).$promise;
    };

    /* sub: api calls end */

    this.caseCreateEpisode = function() {
      var episode = _.pick($scope.selectedEpisode, _this.episodeAttributes);
      var downloads = $scope.selectedEpisode.downloads;
      var videos = $scope.selectedEpisode.videos;

      _this.createEpisode(episode)
      .then(function(savedEpisode) {

        if (downloads.length || videos.length) {
          var promises = [];
          var videoPromises = [];

          downloads.forEach(function(download) {
            download.episodeId = savedEpisode.id;
            promises.push(_this.createDownload(download));
          });

          videos.forEach(function(video) {
            video.episodeId = savedEpisode.id;
            videoPromises.push(_this.createVideo(video));
          });

          $q.all([$q.all(promises), $q.all(videoPromises)])
          .then(function(response) {
            var savedDownloads = response[0];
            var savedVideos = response[1];
            savedEpisode.downloads = savedDownloads;
            savedEpisode.videos = savedVideos;
            $scope.episodes.push(savedEpisode);
            _this.episodeEditionModal.modal('close');
            Materialize.toast('Episodio guardado con éxito', 4000);
          })
          .catch(function(err) {
            Materialize.toast('Se guardó episodio, pero falló al guardar descargas/videos, intente nuevamente', 8000);
            $state.reload();
          });
        }
        else {
          $scope.episodes.push(savedEpisode);
          _this.episodeEditionModal.modal('close');
          Materialize.toast('Episodio guardado con éxito', 4000);
        }

      })
      .catch(function(){
        Materialize.toast('Error al guardar episodio', 4000);
      });
    };

    this.delupsertDownloads = function(downloads, originalDownloads) {
      var defered = $q.defer();  
      var promise = defered.promise;  

      var promises = [];
      var promisesOfDeleteds = [];

      downloads.forEach(function(download) {
        if (_.has(download, 'id')) {
          promises.push(_this.updateDownload(download));
        }
        else {
          promises.push(_this.createDownload(download));
        }
      });

      var episodesToDelete = _.filter(originalDownloads, function(originalDownload) {
        return !_.findWhere(downloads, { id: originalDownload.id });
      });

      episodesToDelete.forEach(function(download) {
        promisesOfDeleteds.push(_this.deleteDownload(download.id));
      });

      $q.all(promisesOfDeleteds)
      .then(function() {
        $q.all(promises)
        .then(defered.resolve)
        .catch(defered.reject);
      })
      .catch(defered.reject);

      return promise;
    };

    this.delupsertVideos = function(videos, originalVideos) {
      var defered = $q.defer();  
      var promise = defered.promise;  

      var promises = [];
      var promisesOfDeleteds = [];

      videos.forEach(function(video) {
        if (_.has(video, 'id')) {
          promises.push(_this.updateVideo(video));
        }
        else {
          promises.push(_this.createVideo(video));
        }
      });

      var videosToDelete = _.filter(originalVideos, function(originalVideo) {
        return !_.findWhere(videos, { id: originalVideo.id });
      });

      videosToDelete.forEach(function(video) {
        promisesOfDeleteds.push(_this.deleteVideo(video.id));
      });

      $q.all(promisesOfDeleteds)
      .then(function() {
        $q.all(promises)
        .then(defered.resolve)
        .catch(defered.reject);
      })
      .catch(defered.reject);

      return promise;
    };

    this.validateDownloadsChangesOfEpisode = function(episode, downloads, videos) {
      var originalDownloads = _this.originalDownloads;
      var originalVideos = _this.originalVideos;

      downloads = downloads.map(function(download) {
        download.episodeId = episode.id;
        return download;
      });

      videos = videos.map(function(video) {
        video.episodeId = episode.id;
        return video;
      });

      $q.all([_this.delupsertDownloads(downloads, originalDownloads),
              _this.delupsertVideos(videos, originalVideos)])
      .then(function(response) {
        var upsertedDownloads = response[0];
        var upsertedVideos = response[1];
        Materialize.toast('Episodio actualizado exitosamente', 4000);

        episode.downloads = upsertedDownloads;
        episode.videos = upsertedVideos;
        var episodeIndex = _.findIndex($scope.episodes, { id: episode.id });
        $scope.episodes[episodeIndex] = episode;
        _this.episodeEditionModal.modal('close');
      })
      .catch(function(err) {
        Materialize.toast('Se actualizó episodio, pero falló al actualizar descargas/videos, intente nuevamente', 8000);
        $state.reload();
      });
    };

    this.caseUpdateEpisode = function () {
      var episode = _.pick($scope.selectedEpisode, _this.episodeAttributes);

      if (_.isEqual(episode, _this.originalEpisode)) {
        _this.validateDownloadsChangesOfEpisode($scope.selectedEpisode, $scope.selectedEpisode.downloads,
                                                $scope.selectedEpisode.videos);
      }
      else {
        _this.updateEpisode(episode)
        .then(function(updatedEpisode) {
          _this.validateDownloadsChangesOfEpisode(updatedEpisode, $scope.selectedEpisode.downloads, 
                                                  $scope.selectedEpisode.videos);
        })
        .catch(function(err) {
          Materialize.toast('Error al actualizar episodio', 4000);
        });
      }
    };

    $scope.onSaveEpisode = function() {
      if($scope.selectedEpisode.id) {
        _this.caseUpdateEpisode();
      }
      else {
        _this.caseCreateEpisode();
      }
    };

    $scope.addDownload = function() {
      $scope.selectedEpisode.downloads.push({});
    };
    $scope.removeDownload = function(index) {
      $scope.selectedEpisode.downloads.splice(index, 1);
    };


    /*TODO:
      -Agregar loading en modal cuando haga peticiones
      -Hacer funciones puras (que no trabajen conel scope, sino solo con lo que se le mande)
    */

    $scope.addVideo = function(videosOfEpisode) {
      $scope.selectedEpisode.videos.push({});
    };

    $scope.removeVideo = function(index) {
      $scope.selectedEpisode.videos.splice(index, 1);
    };

  }

  angular.module('series').controller('EpisodesEditionCtrl', [
    '$scope',
    '$rootScope',
    '$q',
    'SeriesAPI',
    'EpisodesAPI',
    'DownloadsAPI',
    'VideosAPI',
    'serie',
    'fansubs',
    'qualities',
    'downloadServers',
    'videoServers',
    'fileTypes',
    '$state',
    EpisodesEditionCtrl
  ]);
})();