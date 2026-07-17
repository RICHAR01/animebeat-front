(function() {
  'use strict';

  function PreLoaderDirective($rootScope) {
    return {
      templateUrl: 'modules/core/views/pre-loader.client.view.html',
      restrict: 'E'
    };
  }

  angular.module('core').directive('preLoader', [
    '$rootScope',
    PreLoaderDirective
  ]);
})();