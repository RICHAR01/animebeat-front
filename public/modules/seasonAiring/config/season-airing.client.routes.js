(function() {
'use strict';

  function SeasonAiringConfig($stateProvider) {

    $stateProvider
    .state('seasonAiring', {
      url: '/en-emision',
      parent: 'home',
      templateUrl: 'modules/seasonAiring/views/season-airing.client.view.html',
      controller: 'SeasonAiringCtrl'
    });

  }

  angular.module('home').config([
    '$stateProvider',
    SeasonAiringConfig
  ]);
})();
