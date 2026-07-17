(function(){
'use strict';
  function navigationDrawer() {
    return {
      restrict: 'E',
      templateUrl:'modules/core/views/navigation-drawer.client.view.html'
    };
  }

  angular.module('core').directive('navigationDrawer', [
    navigationDrawer
  ]);
})();