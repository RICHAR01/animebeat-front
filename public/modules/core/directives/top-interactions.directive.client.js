(function() {
  'use strict';

  function TopInteractions($timeout) {
    function link(scope, element, attrs) {
			scope.goToReactionsTab = function() {
				$timeout(function() {
					var tarjetElement = angular.element('#reactions-tab a');
			    tarjetElement.trigger('click');
					angular.element('html, body').animate({ scrollTop: $(tarjetElement).offset().top - 60 }, 'slow');
			  });
      }

      scope.goToQuotesTab = function() {
				$timeout(function() {
					var tarjetElement = angular.element('#quotes-tab a');
			    tarjetElement.trigger('click');
					angular.element('html, body').animate({ scrollTop: $(tarjetElement).offset().top - 60 }, 'slow');
			  });
      }
    }

    return {
      templateUrl: 'modules/core/views/top-interactions.client.view.html',
      scope: {
				onDeleteReactionFavorite: '=',
				onCreateReactionFavorite: '=',
				onCreateQuoteFavorite: '=',
				onDeleteQuoteFavorite: '=',
				currentUserId: '=',
        interactions: '='
      },
      link:  link,
      restrict: 'E'
    };
  }

  angular.module('core').directive('topInteractions', [
		'$timeout',
    TopInteractions
  ]);
})();
