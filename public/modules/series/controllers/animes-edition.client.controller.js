(function() {
  'use strict';

  function AnimesEditionCtrl($scope, SeriesAPI, serie, genres, studios, $state) {

    var _this = this;

    /* Initial configuration */

    this.fixValuesToCompare = function() {
      if(serie.year)
        serie.year = serie.year.toString();
      if(serie.chaptersNumber)
        serie.chaptersNumber = serie.chaptersNumber.toString();
    };

    this.fixValuesToCompare(serie);

    this.getOriginals = function(serie) {
      var originalSerieTemp = angular.copy(serie);
      this.originalSerie = _.omit(originalSerieTemp, ['episodes']);
    };

    this.getOriginals(serie); 

    this.setDefaultValues = function(serie) {
      serie.type = 'serie';

      var currentDate = new Date();
      serie.year = currentDate.getFullYear().toString();
      var currentMonth = currentDate.getMonth();
      
      if(currentMonth > 8)
        serie.season = 'autumn';
      else if(currentMonth > 5)
        serie.season = 'summer';
      else if(currentMonth > 2)
        serie.season = 'spring';
      else
        serie.season = 'winter';

      serie.status = 'ongoing';
    };

    if(!serie.id) {
      this.setDefaultValues(serie);
    }

    $scope.studios = studios;

    $scope.options = {
      years: ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020']
    };

    $scope.serie = serie;

    /* Initial configuration end */

    /* Save/update serie */

    $scope.save = function() {
      if(!$scope.serie.id) {
        _this.saveSerie();
      }
      else {
        if(angular.equals(_this.originalSerie, $scope.serie)){
          Materialize.toast('Serie no requiere actualizarse', 4000);
          _this.beforeSaveSerie();
        }
        else {
          _this.updateSerie();
        }
      }
    };

    this.saveSerie = function() {
      SeriesAPI.save($scope.serie).$promise
      .then(function(serie) {
        $scope.serie = serie;
        Materialize.toast('Serie creada exitosamente', 4000);
        $state.go('episodesEdition', { serieId: serie.id });
      })
      .catch(function(){
        Materialize.toast('Error al guardar serie', 4000);
      });
    };

    this.updateSerie = function() {
      SeriesAPI.update(
        { id: $scope.serie.id }, 
        $scope.serie
      ).$promise
      .then(function(updatedSerie) {
        Materialize.toast('Serie actualizada exitosamente', 4000);
        _this.beforeSaveSerie();
      })
      .catch(function(){
        Materialize.toast('Error al actualizar serie', 4000);
      });
    };

    this.beforeSaveSerie = function() {
      $state.go('adminSeries');
    };

    /* Save/update serie end */

    /* Genres behavior */

    this.setGenresBehavior = function() {
      $scope.searchInputTranslations = {
        reset: 'Limpiar',
        search: 'Buscar...',
        nothingSelected: ''
      };
      $scope.genres = genres;
      $scope.selectedGenres = [];
      $scope.genres.forEach(function(genre) {
        genre.isChecked = false;
      });

      if($scope.serie.genres) {
        $scope.serie.genres.forEach(function(genreName) {
          var idx = _.findIndex(genres, function(genre) { 
            return genre.name === genreName;
          });
          if(idx !== -1)
            genres[idx].isChecked = true;
        });
      }

      $scope.onGenreChange = function() {
        if(_.isArray($scope.serie.genres))
          $scope.serie.genres.lenght = 0;
        else
          $scope.serie.genres = [];

        $scope.serie.genres = $scope.selectedGenres.map(function(genre){
          return genre.name;
        });
      };
    };

    this.setGenresBehavior();

    /* Genres behavior end */

    /* Group selector behavior */

    $scope.groupSelectorOptions = {};
    $scope.triggerSearchOnChange = false;

    $scope.onGroupChange = function() {
      $scope.groupSelectorOptions.groupId = angular.copy($scope.serie.groupId);
      if($scope.groupSelectorOptions.groupId) {
        $scope.triggerSearchOnChange = !$scope.triggerSearchOnChange;
      }

      if (!_this.groupSelectorModal) {
        _this.groupSelectorModal = angular.element('#group-selector-modal');
        _this.groupSelectorModal.modal();
      }

      _this.groupSelectorModal.modal('open');
    };

    $scope.onGroupIdSelected = function(groupId) {
      $scope.serie.groupId = groupId;
      _this.groupSelectorModal.modal('close');
    };

    /* Group selector behavior end */

  }

  angular.module('series').controller('AnimesEditionCtrl', [
    '$scope',
    'SeriesAPI',
    'serie',
    'genres',
    'studios',
    '$state',
    AnimesEditionCtrl
  ]);
})();