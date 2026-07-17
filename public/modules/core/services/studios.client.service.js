(function() {
  'use strict';

  function StudiosAPI($resource, API_URL) {
    return $resource(API_URL + '/studios/:id', {}, {
      update: { method: 'PUT' },
      count: {
        method: 'GET',
        url: API_URL + '/studios/count',
        isArray: false,
        responseType: 'json'
      }
    });
  }

  angular.module('genres').factory('StudiosAPI', [
    '$resource',
    'API_URL',
    StudiosAPI
  ]);
})();