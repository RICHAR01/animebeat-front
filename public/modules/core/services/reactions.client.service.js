(function() {
  'use strict';

  function ReactionsAPI($resource, NEW_API_URL) {
    return $resource(NEW_API_URL + '/reactions/:id', {}, {
      update: { method: 'PUT' },
      count: {
        method: 'GET',
        url: NEW_API_URL + '/reactions/count',
        isArray: false,
        responseType: 'json'
      }
    });
  }

  angular.module('core').factory('ReactionsAPI', [
    '$resource',
    'NEW_API_URL',
    ReactionsAPI
  ]);
})();