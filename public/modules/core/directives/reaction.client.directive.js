(function(){
'use strict';
  function reaction() {
		function link(scope) {
			scope.reaction.position = scope.reaction.position || 'left';
		}

    return {
      scope: {
				showFavorites: '=?',
				onDeleteReactionFavorite: '=?',
				onCreateReactionFavorite: '=?',
				currentUserId: '=?',
        reaction: '='
      },
      restrict: 'E',
      templateUrl:'modules/core/views/reaction.client.view.html',
			link: link
    };
  }

  angular.module('core').directive('reaction', [
    reaction
  ]);
})();
