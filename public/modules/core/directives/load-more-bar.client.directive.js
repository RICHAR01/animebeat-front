(function(){
'use strict';
  function loadMoreBar() {
    return {
      restrict: 'E',
      templateUrl:'modules/core/views/load-more-bar.client.view.html'
    };
  }

  angular.module('core').directive('loadMoreBar', [
    loadMoreBar
  ]);
})();