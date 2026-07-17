(function() {
  'use strict';

  function FileTypesAPI($resource, API_URL) {
    return $resource(API_URL + '/fileTypes/:id', {}, {
      update: { method: 'PUT' },
      count: {
        method: 'GET',
        url: API_URL + '/fileTypes/count',
        isArray: false,
        responseType: 'json'
      }
    });
  }

  angular.module('core').factory('FileTypesAPI', [
    '$resource',
    'API_URL',
    FileTypesAPI
  ]);
})();