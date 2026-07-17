(function() {
  'use strict';

  function SeriesAPI($resource, API_URL) {
    return $resource(API_URL + '/series/:id', {}, {
      update: { method: 'PUT' },
      count: {
        method: 'GET',
        url: API_URL + '/series/count',
        isArray: false,
        responseType: 'json'
      },
      changeStatus: {
        method: 'POST',
        url: API_URL + '/series/:id/changeStatus',
        isArray: false,
        responseType: 'json'
      },
      saveQuote: {
        method: 'POST',
        url: API_URL + '/series/:id/quotes',
        isArray: false,
        responseType: 'json'
      },
      saveGenre: {
        method: 'PUT',
        url: API_URL + '/series/:id/genres/rel/:genreId',
        isArray: false,
        responseType: 'json'
      },
      generateNewGroupId: {
        method: 'GET',
        url: API_URL + '/series/groupId',
        isArray: false,
        responseType: 'json'
      },
      favoriteBySeason: {
        method: 'GET',
        url: API_URL + '/series/favoriteBySeason',
        isArray: false,
        responseType: 'json'
      },
      characters: {
        method: 'GET',
        url: API_URL + '/series/:id/characters',
        isArray: true,
        responseType: 'json'
      }
    });
  }

  angular.module('series').factory('SeriesAPI', [
    '$resource',
    'API_URL',
    SeriesAPI
  ]);
})();