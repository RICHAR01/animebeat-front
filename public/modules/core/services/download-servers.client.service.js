(function() {
  'use strict';

  function DownloadServersAPI($resource, API_URL) {
    return $resource(API_URL + '/downloadServers/:id', {}, {
      update: { method: 'PUT' },
      count: {
        method: 'GET',
        url: API_URL + '/downloadServers/count',
        isArray: false,
        responseType: 'json'
      }
    });
  }

  angular.module('core').factory('DownloadServersAPI', [
    '$resource',
    'API_URL',
    DownloadServersAPI
  ]);
})();