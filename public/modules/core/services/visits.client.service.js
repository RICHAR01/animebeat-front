(function() {
  'use strict';

  function VisitsAPI($resource, API_URL) {
    return $resource(API_URL + '/visits/:id', {}, {
      update: { method: 'PUT' },
      count: {
        method: 'GET',
        url: API_URL + '/visits/count',
        isArray: false,
        responseType: 'json'
      }
    });
  }

  angular.module('core').factory('VisitsAPI', [
    '$resource',
    'API_URL',
    VisitsAPI
  ]);
})();
