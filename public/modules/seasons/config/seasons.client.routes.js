(function() {
'use strict';

  function SeasonsConfig($stateProvider) {

    $stateProvider
    .state('seasons', {
      url: '/temporadas',
      parent: 'home',
      templateUrl: 'modules/seasons/views/seasons.client.view.html',
      controller: 'SeasonsCtrl'
    });

  }

  angular.module('home').config([
    '$stateProvider',
    SeasonsConfig
  ]);
})();
