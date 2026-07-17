(function() {
  'use strict';

  function LoadingBarConfig(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
  }

  angular.module('core').config([
    'cfpLoadingBarProvider',
    LoadingBarConfig
  ]);
})();
