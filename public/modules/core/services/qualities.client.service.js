(function() {
  'use strict';

  function QualitiesAPI($resource, API_URL) {
    return $resource(API_URL + '/qualities/:id', {}, {
      update: { method: 'PUT' },
      count: {
        method: 'GET',
        url: API_URL + '/qualities/count',
        isArray: false,
        responseType: 'json'
      }
    });
  }

  angular.module('core').factory('QualitiesAPI', [
    '$resource',
    'API_URL',
    QualitiesAPI
  ]);
})();