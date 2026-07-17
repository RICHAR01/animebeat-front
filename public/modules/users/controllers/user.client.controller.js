(function() {
  'use strict';

  function UserCtrl($scope, AppConfig, $timeout, $stateParams, UsersAPI, Authentication,
										QuotesAPI, ReactionsAPI, VisitsAPI) {

    var _this = this;
    $scope.isContentLoaded = false;
		$scope.notFoundSeriesStatus = false;
		$scope.currentTabName = 'series';
		$scope.showEditBtn = Authentication && Authentication.user && Authentication.user.username === $stateParams.username;

		$scope.changeSelectedTab = function(tabName) {
			$scope.currentTabName = tabName;

			if (tabName === 'series') {
				$scope.showSeriesByStatus();
			}
			else if (tabName === 'quotes') {
				_this.fetchQuotes();
			}
			else if (tabName === 'reactions') {
				_this.fetchReactions();
			}
		}

		this.fetchQuotes = function() {
      if ($scope.loadingQuotes || _this.quotesLoaded) return;
      $scope.loadingQuotes = true;

      QuotesAPI.query({
        filter: {
          where: {
            userId: $scope.user.id
          },
          include: ['character']
        }
      }).$promise
      .then(function(quotes) {
        $scope.quotes = quotes;
				_this.quotesLoaded = true;
      })
      .catch(function() {
        Materialize.toast('No se pudieron obtener citas', 3000);
      })
			.finally(function() {
				$scope.loadingQuotes = false;
			});
    }

		this.fetchReactions = function() {
      if ($scope.loadingReactions || _this.reactionsLoaded) return;
      $scope.loadingReactions = true;

      ReactionsAPI.query({
        filter: {
          where: {
            userId: $scope.user.id
          }
        }
      }).$promise
      .then(function(reactions) {
      	$scope.reactions = reactions;
				_this.reactionsLoaded = true;
      })
      .catch(function() {
        Materialize.toast('No se pudieron obtener reacciones', 3000);
      })
			.finally(function() {
				$scope.loadingReactions = false;
			});
    }

    this.fetchUser = function() {
      UsersAPI.getByUsername({
        username: $stateParams.username
      }, {}).$promise
      .then(function(user) {
        $scope.user = user;
        AppConfig.setTitle(user.username);
        $scope.showSeriesByStatus();
        _this.selectDefaultTab();
        $scope.isContentLoaded = true;
      })
      .catch(function(err) {
        Materialize.toast('Error al obtener usuario', 4000);
      });

    };

    $scope.showSeriesByStatus = function (status) {
			$scope.notFoundSeriesStatus = true;

      $scope.user.series.forEach(function (serie) {
        if (!status) {
          serie.show = true;
					$scope.notFoundSeriesStatus = false;
          return;
        }

        if (serie.status === status) {
          serie.show = true;
					$scope.notFoundSeriesStatus = false;
        }
        else {
          serie.show = false;
        }
      });
    };

    this.selectDefaultTab = function () {
      $timeout(function() {
        angular.element('.ab-tabs li:first a').click();
      });
    };

    this.saveUserVisit = function () {
      VisitsAPI.save({
        type: 'profile',
        serieId: '',
        episodeId: '',
        username: $stateParams.username
      });
    };

    this.fetchUser();
    this.saveUserVisit();

  }

  angular.module('users').controller('UserCtrl', [
    '$scope',
    'AppConfig',
    '$timeout',
    '$stateParams',
    'UsersAPI',
    'Authentication',
		'QuotesAPI',
		'ReactionsAPI',
    'VisitsAPI',
    UserCtrl
  ]);
})();
