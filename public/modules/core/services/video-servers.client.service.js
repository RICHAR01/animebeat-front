(function() {
  'use strict';

  function VideoServersAPI($resource, API_URL) {
    return $resource(API_URL + '/videoServers/:id', {}, {
      update: { method: 'PUT' },
      count: {
        method: 'GET',
        url: API_URL + '/videoServers/count',
        isArray: false,
        responseType: 'json'
      }
    });
  }

  angular.module('core').factory('VideoServersAPI', [
    '$resource',
    'API_URL',
    VideoServersAPI
  ]);
})();