(function() {
  'use strict';

  function HomeCtrl($scope, AppConfig, EpisodesAPI, SeriesAPI, $q, $timeout, VisitsAPI) {
    AppConfig.setTitle();
    var _this = this;
    $scope.isContentLoaded = false;
    this.episodes = [];
    $scope.episodeDays = [];
    $scope.series = [];
    $scope.carouselSeries = [];
    $scope.loadingEpisodes = false;
    $scope.loadingSeries = false;

    $scope.owlOptions = {
      items: 1
    };

    this.episodesFilter = {
      filter: {
        include: {
          relation: 'serie',
          scope: {
            fields: ['name']
          }
        },
        limit: 48,
        skip: 0,
        order: 'createdAt DESC'
      }
    };

    this.seriesFilter = {
      filter: {
        fields: ['id', 'name', 'poster', 'type', 'createdAt'],
        limit: 18,
        skip: 0,
        order: 'id DESC'
      }
    };

    this.setEpisodeDays = function(episodeDays) {
      $scope.episodeDays.length = 0;
      episodeDays.forEach(function(episodeDay) {
        $scope.episodeDays.push(episodeDay);
      });
    };

    this.setSerieNameAsNameForEpisodes = function(episodes) {
      return episodes.map(function(episode) {
        if (episode.serie && episode.serie.name) {
          episode.name = episode.serie.name;
        }
        return episode;
      });
    };

    this.capitalize = function(stringValue) {
      return stringValue.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    };

    this.groupEpisodesByDay = function(episodes) {
      var episodesGroups = _.groupBy(episodes, function (episodes) {
        return moment(episodes.createdAt).startOf('day').format();
      });

      var episodeDays = _.map(episodesGroups, function(episodesGroup, day){
        return {
          day: day,
          episodes: episodesGroup
        };
      });

      episodeDays.forEach(function(groupDay) {
        groupDay.daysAgo = moment().diff(moment(groupDay.day), 'days');

        var otro = moment(groupDay.day).format('dddd D');
        var year = moment(groupDay.day).format('MMMM');
        groupDay.humanDate = _this.capitalize(otro) + ' de ' +
                            _this.capitalize(year);
      });

      _this.setEpisodeDays(episodeDays);
    };

    $scope.fetchEpisodes = function() {
      if ($scope.loadingEpisodes) return;
      $scope.loadingEpisodes = true;

      var episodesPromise = EpisodesAPI.query(_this.episodesFilter).$promise;
      
      episodesPromise.then(function(episodes) {
        episodes = _this.setSerieNameAsNameForEpisodes(episodes);
        
        _this.episodesFilter.filter.skip += 20;

        if (_this.episodes.length) {
          episodes.forEach(function(episode) {
            _this.episodes.push(episode);
          });
        }
        else {
          _this.episodes = episodes;
        }

        _this.groupEpisodesByDay(_this.episodes);
        

      })
      .catch(function(err) {
        Materialize.toast('No se pudieron obtener episodios', 4000);
      })
      .finally(function() {
        $scope.loadingEpisodes = false;
      });

      return episodesPromise;
    };

    this.setSeries = function(series) {
      series.forEach(function(serie) {
        $scope.series.push(serie);
      });
    };

    $scope.fetchSeries = function() {
      if ($scope.loadingSeries) return;
      $scope.loadingSeries = true;

      SeriesAPI.query(_this.seriesFilter).$promise
      .then(function(series) {
        _this.setSeries(series);
        _this.seriesFilter.filter.skip += 18;
      })
      .catch(function(err) {
        Materialize.toast('No se pudieron obtener series', 4000);
      })
      .finally(function(series, series2) {
        $scope.loadingSeries = false;
      });
    };

    this.getRandomNumberBetweenZeroAndTen = function() {
      return Math.floor(Math.random() * 7);
    };

    this.fetchCarouselSerie = function() {
      var carouselSeriesFilter = {
        filter: {
          fields: ['id', 'name', 'japaneseName', 'backgroundImage'],
          skip: _this.getRandomNumberBetweenZeroAndTen(),
          limit: 1,
          order: 'id DESC'
        }
      };

      var seriesPromise = SeriesAPI.query(carouselSeriesFilter).$promise;
      seriesPromise.then(function(carouselSeries) {
        carouselSeries.forEach(function(carouselSerie) {
          $scope.carouselSeries.push(carouselSerie);
        });
      })
      .catch(function(err) {
        Materialize.toast('No se pudo obtener serie random', 4000);
      });

      return seriesPromise;
    };

    this.fetchEpisodesAndCarouselToShowContent = function() {
      $q.all([
        $scope.fetchEpisodes(),
        _this.fetchCarouselSerie()
      ])
      .finally(function() {
        $scope.isContentLoaded = true;
        _this.selectDefaultTab();
      });
    };

    this.selectDefaultTab = function () {
      $timeout(function() {
        angular.element('.ab-tabs li:first a').click();
      });
    };

    this.saveUserVisit = function () {
      VisitsAPI.save({
        type: 'home',
        serieId: '',
        episodeId: '',
        username: ''
      });
    }

    this.fetchEpisodesAndCarouselToShowContent();
    $scope.fetchSeries();
    this.saveUserVisit();

  }

  angular.module('genres').controller('HomeCtrl', [
    '$scope',
    'AppConfig',
    'EpisodesAPI',
    'SeriesAPI',
    '$q',
    '$timeout',
    'VisitsAPI',
    HomeCtrl
  ]);
})();