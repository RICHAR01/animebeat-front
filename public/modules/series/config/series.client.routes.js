'use strict';

angular.module('series').config(['$stateProvider', 
  function($stateProvider) {
    
    $stateProvider
    .state('admin', {
      url: '/admin',
      parent: 'home',
      templateUrl: 'modules/core/views/topbar-admin.client.view.html',
      controller: 'TopbarAdminCtrl'
    })
    .state('serie', {
      url: '/series/:serieId',
      parent: 'home',
      templateUrl: 'modules/series/views/serie-main.client.view.html',
      controller: 'SerieCtrl'
    })
    .state('watchEpisode', {
      url: '/episodios/:episodeId/ver',
      parent: 'home',
      templateUrl: 'modules/series/views/watch-episode-main.client.view.html',
      controller: 'WatchEpisodeCtrl'
    })
    .state('adminSeries', {
      url: '/series',
      parent: 'admin',
      templateUrl: 'modules/core/views/general-catalog-main.client.view.html',
      controller: 'AnimesCtrl',
      resolve: {
        SeriesAPI: 'SeriesAPI',
        $q: '$q',
        series: function(SeriesAPI, $q) {
          return $q.all({
            total: SeriesAPI.count().$promise,
            items: SeriesAPI.query({
              filter: {
                include: 'studio',
                limit: 20,
                skip: 0,
                order: 'createdAt DESC'
              }
            }).$promise
          });
        }
      }
    })
    .state('animesCreate', {
      url: '/series/crear',
      parent: 'admin',
      // menuOption: 'cellphones',
      // appTitle: 'Marcas',
      templateUrl: 'modules/series/views/animes-edition.client.view.html',
      controller: 'AnimesEditionCtrl',
      resolve: {
        GenresAPI: 'GenresAPI',
        StudiosAPI: 'StudiosAPI',
        serie: function() {
          return {
            episodes: []
          };
        },
        genres: function(GenresAPI, $q) {
          return GenresAPI.query({}).$promise;
        },
        studios: function(StudiosAPI, $q) {
          return StudiosAPI.query({}).$promise;
        }
      }
    })
    .state('animesEdit', {
      url: '/series/:serieId',
      parent: 'admin',
      // menuOption: 'cellphones',
      // appTitle: 'Marcas',
      templateUrl: 'modules/series/views/animes-edition.client.view.html',
      controller: 'AnimesEditionCtrl',
      resolve: {
        SeriesAPI: 'SeriesAPI',
        GenresAPI: 'GenresAPI',
        StudiosAPI: 'StudiosAPI',
        $q: '$q',
        serie: function(SeriesAPI, $stateParams) {
          return SeriesAPI.get({
            id: $stateParams.serieId
          }).$promise;
        },
        genres: function(GenresAPI, $q) {
          return GenresAPI.query({}).$promise;
        },
        studios: function(StudiosAPI, $q) {
          return StudiosAPI.query({}).$promise;
        }
      }
    })
    .state('episodesEdition', {
      url: '/series/:serieId/episodios',
      parent: 'admin',
      // menuOption: 'cellphones',
      // appTitle: 'Marcas',
      templateUrl: 'modules/series/views/episodes-edition.client.view.html',
      controller: 'EpisodesEditionCtrl',
      resolve: {
        SeriesAPI: 'SeriesAPI',
        serie: function(SeriesAPI, $stateParams) {
          return SeriesAPI.get({
            id: $stateParams.serieId,
            filter: {
              fields: ['id', 'name'],
              include: {
                relation: 'episodes',
                scope: {
                  order: 'number ASC',
                  include: [
                    {
                      relation: 'downloads',
                      scope: {
                        include: ['quality', 'fansub', 'downloadServer', 'fileType']
                      }
                    },
                    {
                      relation: 'videos',
                      scope: {
                        include: ['videoServer']
                      }
                    }
                  ]
                }
              }
            }
          }).$promise;
        },
        fansubs: function(FansubsAPI, $q) {
          return FansubsAPI.query({}).$promise;
        },
        qualities: function(QualitiesAPI, $q) {
          return QualitiesAPI.query({}).$promise;
        },
        downloadServers: function(DownloadServersAPI, $q) {
          return DownloadServersAPI.query({}).$promise;
        },
        videoServers: function(VideoServersAPI, $q) {
          return VideoServersAPI.query({}).$promise;
        },
        fileTypes: function(FileTypesAPI, $q) {
          return FileTypesAPI.query({}).$promise;
        }
      }
    })
    .state('charactersEdition', {
      url: '/series/:serieId/personajes',
      parent: 'admin',
      // menuOption: 'cellphones',
      // appTitle: 'Marcas',
      templateUrl: 'modules/series/views/characters-edition.client.view.html',
      controller: 'CharactersEditionCtrl',
      resolve: {
        SeriesAPI: 'SeriesAPI',
        serie: function(SeriesAPI, $stateParams) {
          return SeriesAPI.get({
            id: $stateParams.serieId,
            filter: {
              fields: ['id', 'name'],
              include: 'characters'
            }
          }).$promise;
        }
      }
    });

  }
]);