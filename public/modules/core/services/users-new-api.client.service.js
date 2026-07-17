(function() {
  'use strict';

  function UsersNEWAPI($resource, NEW_API_URL) {
    return $resource(NEW_API_URL + '/users/:id', {}, {
      update: { method: 'PUT' },
      createReactionFavorite: {
        method: 'POST',
        url: NEW_API_URL + '/users/reactions/:reactionId/favorite',
        isArray: false,
        responseType: 'json'
      },
			deleteReactionFavorite: {
        method: 'DELETE',
        url: NEW_API_URL + '/users/reactions/:reactionId/favorite',
        isArray: false,
        responseType: 'json'
      },
			createQuoteFavorite: {
        method: 'POST',
        url: NEW_API_URL + '/users/quotes/:quoteId/favorite',
        isArray: false,
        responseType: 'json'
      },
			deleteQuoteFavorite: {
        method: 'DELETE',
        url: NEW_API_URL + '/users/quotes/:quoteId/favorite',
        isArray: false,
        responseType: 'json'
      },
			createSerieRate: {
        method: 'POST',
        url: NEW_API_URL + '/users/series/:serieId/rate',
        isArray: false,
        responseType: 'json'
      },
			deleteSerieRate: {
        method: 'DELETE',
        url: NEW_API_URL + '/users/series/:serieId/rate',
        isArray: false,
        responseType: 'json'
      },
			updateUser: {
        method: 'PATCH',
        url: NEW_API_URL + '/users/me',
        isArray: false,
        responseType: 'json'
      },
			requestRecoveryPassword: {
        method: 'POST',
        url: NEW_API_URL + '/users/requestRecoveryPassword',
        isArray: false,
        responseType: 'json'
      },
			recoveryPassword: {
        method: 'POST',
        url: NEW_API_URL + '/users/recoveryPassword',
        isArray: false,
        responseType: 'json'
      }
    });
  }

  angular.module('core').factory('UsersNEWAPI', [
    '$resource',
    'NEW_API_URL',
    UsersNEWAPI
  ]);
})();
