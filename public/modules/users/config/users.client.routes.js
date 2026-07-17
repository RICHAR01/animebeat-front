'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider
    .state('user', {
      url: '/usuarios/:username',
      parent: 'home',
      templateUrl: 'modules/users/views/user.client.view.html',
      controller: 'UserCtrl'
    })
		.state('user-edition', {
      url: '/usuarios/:username/edicion',
      parent: 'home',
      templateUrl: 'modules/users/views/user-edition.client.view.html',
      controller: 'UserEditionCtrl'
    })
		.state('recovery-password', {
      url: '/recuperar-contrasena?step&folio',
      parent: 'home',
      templateUrl: 'modules/users/views/recovery-password.client.view.html',
      controller: 'RecoveryPasswordCtrl'
    })
    .state('users', {
      url: '/users',
      parent: 'admin',
      templateUrl: 'modules/core/views/general-catalog-main.client.view.html',
      controller: 'UsersCtrl',
      resolve: {
        UsersAPI: 'UsersAPI',
        $q: '$q',
        users: function(UsersAPI, $q) {
          return $q.all({
            total: UsersAPI.count().$promise,
            items: UsersAPI.query({
              filter: {
                include: 'role',
                limit: 20,
                skip: 0
              }
            }).$promise
          });
        }
      }
    });
  }
]);
