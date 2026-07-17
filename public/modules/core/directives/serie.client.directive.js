(function(){
'use strict';
  function serie() {
    return {
      scope: {
        serie: '='
      },
      restrict: 'E',
      templateUrl:'modules/core/views/serie.client.view.html'
    };
  }

  angular.module('core').directive('serie', [
    serie
  ]);
})();