(function() {
  'use strict';

  function CharactersAPI($resource, API_URL) {
    return $resource(API_URL + '/characters/:id', {}, {
      update: { method: 'PUT' },
      count: {
        method: 'GET',
        url: API_URL + '/characters/count',
        isArray: false,
        responseType: 'json'
      }
    });
  }

  angular.module('core').factory('CharactersAPI', [
    '$resource',
    'API_URL',
    CharactersAPI
  ]);
})();