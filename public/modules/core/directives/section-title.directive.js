(function(){
'use strict';
  function sectionTitle() {
    return {
      scope: {
        sectionTitle: '='
      },
      restrict: 'E',
      templateUrl:'modules/core/views/section-title.client.view.html'
    };
  }

  angular.module('core').directive('sectionTitle', [
    sectionTitle
  ]);
})();