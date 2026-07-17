(function() {
  'use strict';

  function PlayersAPI($resource, API_URL) {
    return $resource(API_URL + '/notifications/players/:id', {}, {
      upsert: { method: 'PUT' }
    });
  }

  angular.module('core').factory('PlayersAPI', [
    '$resource',
    'API_URL',
    PlayersAPI
  ]);
})();
