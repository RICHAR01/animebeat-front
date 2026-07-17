(function(){
'use strict';
  function episode() {
    return {
      scope: {
        episode: '='
      },
      restrict: 'E',
      templateUrl:'modules/core/views/episode.client.view.html'
    };
  }

  angular.module('core').directive('episode', [
    episode
  ]);
})();