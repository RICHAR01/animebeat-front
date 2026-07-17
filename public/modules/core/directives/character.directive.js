(function(){
'use strict';
  function character() {
    return {
      scope: {
        character: '='
      },
      restrict: 'E',
      templateUrl:'modules/core/views/character.client.view.html'
    };
  }

  angular.module('core').directive('character', [
    character
  ]);
})();