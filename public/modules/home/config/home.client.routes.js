(function() {
'use strict';

  function HomeConfig($stateProvider) {

    $stateProvider
    .state('start', {
      url: '/inicio',
      parent: 'home',
      templateUrl: 'modules/home/views/home.client.view.html',
      controller: 'HomeCtrl'
    });

  }

  angular.module('home').config([
    '$stateProvider',
    HomeConfig
  ]);
})();
