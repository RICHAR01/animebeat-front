(function(){
'use strict';
  function noResults() {

    function link(scope, element, attrs) {
      scope.ngStyle = {
        'font-size': scope.fontSize + 'px',
        height: scope.height + 'px'
      };
    }

    return {
      restrict: 'E',
      templateUrl:'modules/core/views/no-results.client.view.html',
      link: link,
      scope: {
        message: '@',
        fontSize: '@',
        height: '@'
      }
    };
  }

  angular.module('core').directive('noResults', [
    noResults
  ]);
})();