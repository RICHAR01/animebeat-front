(function() {
  'use strict';

  function EpisodesAPI($resource, API_URL) {
    return $resource(API_URL + '/episodes/:id', {}, {
      update: { method: 'PUT' },
      count: {
        method: 'GET',
        url: API_URL + '/episodes/count',
        isArray: false,
        responseType: 'json'
      },
      play: {
        method: 'GET',
        url: API_URL + '/episodes/play/:id',
        isArray: false,
        responseType: 'json'
      }
    });
  }

  angular.module('series').factory('EpisodesAPI', [
    '$resource',
    'API_URL',
    EpisodesAPI
  ]);
})();