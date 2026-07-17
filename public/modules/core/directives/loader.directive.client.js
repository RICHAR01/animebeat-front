(function(){
'use strict';
  function loader() {

    function link(scope, element, attrs) {
      scope.color = scope.color || 'default';
      scope.ngStyle = {
        width: scope.size + 'px',
        height: scope.size + 'px'
      };
    }

    return {
      restrict: 'E',
      templateUrl:'modules/core/views/loader.client.view.html',
      link: link,
      scope: {
        size: '=',
        color: '=?',
        customClass: '='
      }
    };
  }

  angular.module('core').directive('loader', [
    loader
  ]);
})();