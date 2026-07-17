(function() {
  'use strict';

  function SeriesNEWAPI($resource, NEW_API_URL) {
    return $resource(NEW_API_URL + '/series/:id', {}, {
      update: { method: 'PUT' },
      topInteractions: {
        method: 'GET',
        url: NEW_API_URL + '/series/:id/topInteractions',
        isArray: false,
        responseType: 'json'
      }
    });
  }

  angular.module('series').factory('SeriesNEWAPI', [
    '$resource',
    'NEW_API_URL',
    SeriesNEWAPI
  ]);
})();