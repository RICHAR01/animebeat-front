(function() {
  'use strict';

  function DownloadsAPI($resource, API_URL) {
    return $resource(API_URL + '/downloads/:id', {}, {
      update: { method: 'PUT' },
      count: {
        method: 'GET',
        url: API_URL + '/downloads/count',
        isArray: false,
        responseType: 'json'
      }
    });
  }

  angular.module('core').factory('DownloadsAPI', [
    '$resource',
    'API_URL',
    DownloadsAPI
  ]);
})();