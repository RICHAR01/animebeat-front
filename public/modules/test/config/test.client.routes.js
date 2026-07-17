'use strict';

angular.module('test').config(['$stateProvider', 
  function($stateProvider) {
    
    $stateProvider
    .state('test', {
      url: '/test',
      parent: 'home',
      templateUrl: 'modules/test/views/test-main.client.view.html',
      controller: 'TestCtrl'
    });

  }
]);