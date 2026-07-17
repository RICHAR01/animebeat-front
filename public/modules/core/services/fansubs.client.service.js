(function() {
  'use strict';

  function FansubsAPI($resource, API_URL) {
    return $resource(API_URL + '/fansubs/:id', {}, {
      update: { method: 'PUT' },
      count: {
        method: 'GET',
        url: API_URL + '/fansubs/count',
        isArray: false,
        responseType: 'json'
      }
    });
  }

  angular.module('fansubs').factory('FansubsAPI', [
    '$resource',
    'API_URL',
    FansubsAPI
  ]);
})();