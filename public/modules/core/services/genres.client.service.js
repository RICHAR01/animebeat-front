(function() {
  'use strict';

  function GenresAPI($resource, API_URL) {
    return $resource(API_URL + '/genres/:id', {}, {
      update: { method: 'PUT' },
      count: {
        method: 'GET',
        url: API_URL + '/genres/count',
        isArray: false,
        responseType: 'json'
      }
    });
  }

  angular.module('genres').factory('GenresAPI', [
    '$resource',
    'API_URL',
    GenresAPI
  ]);
})();