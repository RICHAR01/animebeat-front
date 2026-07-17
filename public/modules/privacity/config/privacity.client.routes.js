(function() {
'use strict';

  function PrivacityConfig($stateProvider) {

    $stateProvider
    .state('terms-of-service', {
      url: '/terminos-de-servicio',
      parent: 'home',
      templateUrl: 'modules/privacity/views/terms-of-service.client.view.html'
    })
    .state('privacity', {
      url: '/politica-de-privacidad',
      parent: 'home',
      templateUrl: 'modules/privacity/views/privacity.client.view.html'
    });

  }

  angular.module('privacity').config([
    '$stateProvider',
    PrivacityConfig
  ]);
})();
