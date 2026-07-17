(function(){
'use strict';
  function quote() {
		function link(scope) {
			scope.isFavorited = false;
			var foundCurrentUser = _.find(scope.favorites, { userId: scope.currentUserId });
			if (foundCurrentUser) scope.isFavorited = true;
		}

    return {
      scope: {
				showFavorites: '=?',
				onCreateQuoteFavorite: '=?',
				onDeleteQuoteFavorite: '=?',
				currentUserId: '=?',
        quote: '='
      },
      restrict: 'E',
      templateUrl:'modules/core/views/quote.client.view.html'
    };
  }

  angular.module('core').directive('quote', [
    quote
  ]);
})();
