(function(){
'use strict';
  function favorites() {
		function link(scope) {
			var loginModal = null;
			var loading = false;
			scope.isFavorited = false;
			scope.modalFavorites = [];

			var checkIsFavorite = function() {
				var foundCurrentUser = _.find(scope.favorites, { userId: scope.currentUserId });
				scope.isFavorited = foundCurrentUser ? true : false;
			};

			scope.showFavoritesListModal = function(favorites) {
				scope.modalFavorites = favorites;
				if (!loginModal) {
        	loginModal = angular.element('#favorites-list-modal-' + scope.identifier);
          loginModal.modal();
        }
        loginModal.modal('open');
			}

			scope.onChangeFavorite = function() {
				if (scope.isFavorited) {
					scope.deleteFavorite();
				}
				else {
					scope.createFavorite();
				}
			}

			scope.createFavorite = function() {
				if (loading) return;
				loading = true;

				var promise = scope.onCreateFavorite(scope.identifier);

				if (promise) {
					promise.then(function(favorite) {
						var foundFavorite = _.find(scope.favorites, { id: favorite.id });
						if (!foundFavorite) {
							scope.favorites.push(favorite);
							checkIsFavorite();
						}
					})
					.finally(function() {
						loading = false;
					});
				}
				else {
					loading = false;
				}
			}

			scope.deleteFavorite = function() {
				if (loading) return;
				loading = true;

				var promise = scope.onDeleteFavorite(scope.identifier);

				if (promise) {
					promise.then(function(favorite) {
						var deletedFavoriteIndex = _.findIndex(scope.favorites, { userId: scope.currentUserId });
						if (deletedFavoriteIndex !== -1) {
							scope.favorites.splice(deletedFavoriteIndex, 1);
							checkIsFavorite();
						}
					})
					.finally(function() {
						loading = false;
					});
				}
				else {
					loading = false;
				}
			}

			checkIsFavorite();
		}

    return {
      scope: {
				onDeleteFavorite: '=',
				onCreateFavorite: '=',
				currentUserId: '=',
				identifier: '=?',
        favorites: '='
      },
      restrict: 'E',
      templateUrl:'modules/core/views/favorites.client.view.html',
			link: link
    };
  }

  angular.module('core').directive('favorites', [
    favorites
  ]);
})();
