(function() {
  'use strict';

  function FooterDirective($rootScope) {
    return {
      templateUrl: 'modules/core/views/footer.client.view.html',
      restrict: 'E'
    };
  }

  angular.module('core').directive('footer', [
    '$rootScope',
    FooterDirective
  ]);
})();