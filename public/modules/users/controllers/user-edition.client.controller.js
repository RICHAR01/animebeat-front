(function() {
  'use strict';

  function UserEditionCtrl($scope, AppConfig, $timeout, $stateParams, UsersAPI, UsersNEWAPI, Authentication, $state) {

    var _this = this;
    $scope.isContentLoaded = false;
		$scope.user = {};

		$scope.updateUser = function() {
			UsersNEWAPI.updateUser($scope.user).$promise
      .then(function(user) {
				Materialize.toast('Perfil actualizado', 4000);
				$state.go('user', { username: $stateParams.username });
      })
      .catch(function(err) {
        Materialize.toast('Error al actualizar usuario', 4000);
      });
		}

    this.fetchUser = function() {
      UsersAPI.getByUsername({
        username: $stateParams.username
      }, {}).$promise
      .then(function(user) {
        $scope.user = user;
        AppConfig.setTitle(user.username);
        $scope.isContentLoaded = true;
      })
      .catch(function(err) {
        Materialize.toast('Error al obtener usuario', 4000);
      });
    };

    this.fetchUser();

  }

  angular.module('users').controller('UserEditionCtrl', [
    '$scope',
    'AppConfig',
    '$timeout',
    '$stateParams',
    'UsersAPI',
		'UsersNEWAPI',
    'Authentication',
		'$state',
    UserEditionCtrl
  ]);
})();
