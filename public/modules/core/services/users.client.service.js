(function() {
  'use strict';

  function UsersAPI($resource, API_URL) {
    return $resource(API_URL + '/users/:id', {}, {
      update: { method: 'PUT' },
      count: {
        method: 'GET',
        url: API_URL + '/users/count',
        isArray: false,
        responseType: 'json'
      },
      saveSerie: {
        method: 'POST',
        url: API_URL + '/users/series',
        isArray: false,
        responseType: 'json'
      },
      deleteSerie: {
        method: 'DELETE',
        url: API_URL + '/users/series/:userSerieId',
        isArray: false,
        responseType: 'json'
      },
      getSeriesList: {
        method: 'GET',
        url: API_URL + '/users/series',
        isArray: true,
        responseType: 'json'
      },
      getByUsername: {
        method: 'GET',
        url: API_URL + '/users/getByUsername/:username',
        isArray: false,
        responseType: 'json'
      },
      getSerieInfo: {
        method: 'GET',
        url: API_URL + '/users/series/:serieId',
        isArray: false,
        responseType: 'json'
      },
      saveFavoriteSerie: {
        method: 'POST',
        url: API_URL + '/users/series/favorites',
        isArray: false,
        responseType: 'json'
      },
      deleteFavoriteSerie: {
        method: 'DELETE',
        url: API_URL + '/users/series/favorites/:favoriteSerieId',
        isArray: false,
        responseType: 'json'
      }
    });
  }

  angular.module('core').factory('UsersAPI', [
    '$resource',
    'API_URL',
    UsersAPI
  ]);
})();