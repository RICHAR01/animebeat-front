(function() {
  'use strict';

  function SeasonsCtrl($scope, AppConfig, SeriesAPI, $q, VisitsAPI) {
    AppConfig.setTitle('Temporadas');
    var _this = this;
    $scope.isContentLoaded = false;
    $scope.loadingSeasonSeries = false;
    $scope.seasons = [];
    this.currentSelectedSeason = {};

    this.setSeason = function(seasonSeries) {
      var season = {
        name: _this.currentSelectedSeason.name,
        year: _this.currentSelectedSeason.year,
        series: seasonSeries
      };
      $scope.seasons.push(season);
    };

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
        _this.setSeason(seasonSeries);
      })
      .catch(function(err) {
        Materialize.toast('No se pudieron obtener series de temporada', 4000);
      })
      .finally(function() {
        $scope.loadingSeasonSeries = false;
      });

      return seasonSeriesPromise;
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

    this.setPrevousSeason = function() {
      if (_this.currentSelectedSeason.season === 'winter') {
        _this.currentSelectedSeason.season = 'autumn';
        _this.currentSelectedSeason.name = 'Otoño';
        _this.currentSelectedSeason.year--;
      }
      else if (_this.currentSelectedSeason.season === 'spring') {
        _this.currentSelectedSeason.season = 'winter';
        _this.currentSelectedSeason.name = 'Invierno';
      }
      else if (_this.currentSelectedSeason.season === 'summer') {
        _this.currentSelectedSeason.season = 'spring';
        _this.currentSelectedSeason.name = 'Primavera';
      }
      else if (_this.currentSelectedSeason.season === 'autumn') {
        _this.currentSelectedSeason.season = 'summer';
        _this.currentSelectedSeason.name = 'Verano';
      }
    };

    $scope.fetchPreviousSeason = function() {
      _this.setPrevousSeason();
      $scope.fetchSeasonSeries();
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
        type: 'seasons',
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
    this.setPrevousSeason();
    this.fetchEpisodesAndCarouselToShowContent();
    this.saveUserVisit();

  }

  angular.module('genres').controller('SeasonsCtrl', [
    '$scope',
    'AppConfig',
    'SeriesAPI',
    '$q',
    'VisitsAPI',
    SeasonsCtrl
  ]);
})();