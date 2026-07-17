(function() {
  'use strict';

  function VideosAPI($resource, API_URL) {
    return $resource(API_URL + '/videos/:id', {}, {
      update: { method: 'PUT' },
      count: {
        method: 'GET',
        url: API_URL + '/videos/count',
        isArray: false,
        responseType: 'json'
      }
    });
  }

  angular.module('core').factory('VideosAPI', [
    '$resource',
    'API_URL',
    VideosAPI
  ]);
})();
