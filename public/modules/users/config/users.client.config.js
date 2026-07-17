'use strict';

function UsersConfig($httpProvider) {
    $httpProvider.interceptors.push('RequestsInterceptor');
  }

angular.module('users').config(['$httpProvider',
  UsersConfig
]);
