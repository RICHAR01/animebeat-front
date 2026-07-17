(function() {
  'use strict';

  function SeasonAiringCtrl($scope, AppConfig, SeriesAPI, $q, VisitsAPI) {
    AppConfig.setTitle('Temporadas');
    var _this = this;
    $scope.isContentLoaded = false;
    $scope.loadingSeasonSeries = false;
    $scope.series = [];
    this.currentSelectedSeason = {};

    $scope.fetchSeasonSeries = function() {
      if ($scope.loadingSeasonSeries) return;
      $scope.loadingSeasonSeries = true;

      var seasonSeriesPromise = SeriesAPI.query({
        filter: {
          fields: ['id', 'name', 'poster', 'type'],
          where: {
            year: _this.currentSelectedSeason.year,
            season: _this.currentSelectedSeason.season
          },
          order: 'id DESC'
        }
      }).$promise
      .then(function(seasonSeries) {
        $scope.seasonSeries = seasonSeries;
      })
      .catch(function(err) {
        Materialize.toast('No se pudieron obtener series de temporada', 4000);
      })
      .finally(function() {
        $scope.loadingSeasonSeries = false;
      });

      return seasonSeriesPromise;
    };

    this.getSeasonInfoByMonthIndex = function(monthIndex) {
      var seasonName = '';
      var displayName = '';

      if(monthIndex > 8) {
        seasonName = 'autumn';
        displayName = 'Otoño';
      }
      else if(monthIndex > 5) {
        seasonName = 'summer';
        displayName = 'Verano';
      }
      else if(monthIndex > 2) {
        seasonName = 'spring';
        displayName = 'Primavera';
      }
      else {
        seasonName = 'winter';
        displayName = 'Invierno';
      }

      return {
        seasonName: seasonName,
        displayName: displayName
      };
    };

    this.setCurrentSeason = function() {
      var currentDate = new Date();
      var currentYear = currentDate.getFullYear();
      var currentMonth = currentDate.getMonth();
      var seasonInfo = _this.getSeasonInfoByMonthIndex(currentMonth);

      _this.currentSelectedSeason = {
        year: currentYear,
        monthIndex: currentMonth,
        season: seasonInfo.seasonName,
        name: seasonInfo.displayName
      };
    };

    this.fetchFavoriteSerie = function() {
      var favoriteSeriePromise = SeriesAPI.favoriteBySeason({
        year: _this.currentSelectedSeason.year,
        season: _this.currentSelectedSeason.season
      }).$promise
      .then(function(favoriteSerie) {
        $scope.favoriteSerie = favoriteSerie;
      })
      .catch(function(err) {
        Materialize.toast('No se pudo obtener serie favorita', 4000);
      });

      return favoriteSeriePromise;
    };

    this.saveUserVisit = function () {
      VisitsAPI.save({
        type: 'season-airing',
        serieId: '',
        episodeId: '',
        username: ''
      });
    };

    this.fetchEpisodesAndCarouselToShowContent = function() {
      $q.all([
        $scope.fetchSeasonSeries(),
        _this.fetchFavoriteSerie()
      ])
      .finally(function() {
        $scope.isContentLoaded = true;
      });
    };

    this.setCurrentSeason();
    this.fetchEpisodesAndCarouselToShowContent();
    this.saveUserVisit();

  }

  angular.module('genres').controller('SeasonAiringCtrl', [
    '$scope',
    'AppConfig',
    'SeriesAPI',
    '$q',
    'VisitsAPI',
    SeasonAiringCtrl
  ]);
})();