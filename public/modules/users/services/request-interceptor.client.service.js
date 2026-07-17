(function() {
  'use strict';

  function RequestsInterceptor($q, $location, localStorage) {
    var UNAUTHORIZED_CODE = 401;
    var FORBIDDEN_CODE = 403;
    var accessToken;

    this.request = function(config) {
      accessToken = localStorage.get('access_token');

      if(accessToken)
        config.headers.Authorization = accessToken;

      return config;
    };

    this.responseError = function(rejection) {
      switch (rejection.status) {
        case UNAUTHORIZED_CODE:
          localStorage.remove('user', 'access_token');
          $location.path('/login');
          break;
        case FORBIDDEN_CODE:
          // $location.path('/error-403');
          // TODO
          break;
      }

      return $q.reject(rejection);
    };
  }

  angular.module('users').service('RequestsInterceptor', [
    '$q',
    '$location',
    'localStorageService',
    RequestsInterceptor
  ]);
})();