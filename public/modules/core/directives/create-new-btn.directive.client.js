(function(){
'use strict';
  function createNewBtn() {
    return {
      scope: {
        message: '='
      },
      restrict: 'E',
      templateUrl:'modules/core/views/create-new-btn.client.view.html'
    };
  }

  angular.module('core').directive('createNewBtn', [
    createNewBtn
  ]);
})();