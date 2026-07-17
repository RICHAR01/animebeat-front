(function() {
  'use strict';

  function QuotesAPI($resource, NEW_API_URL) {
    return $resource(NEW_API_URL + '/quotes/:id', {}, {
      update: { method: 'PUT' },
      count: {
        method: 'GET',
        url: NEW_API_URL + '/quotes/count',
        isArray: false,
        responseType: 'json'
      }
    });
  }

  angular.module('core').factory('QuotesAPI', [
    '$resource',
    'NEW_API_URL',
    QuotesAPI
  ]);
})();