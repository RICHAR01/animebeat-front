(function() {
  'use strict';

  function RecoveryPasswordCtrl($scope, $state, $stateParams, AppConfig, UsersNEWAPI) {
		$scope.recoveryCredentials = {};
		$scope.step = $stateParams.step || null;
		$scope.recoveryCredentials.folio = $stateParams.folio || null;

		$scope.requestRecoveryPassword = function() {
			if ($scope.loadingRecovery) return;
			$scope.loadingRecovery = true;
			UsersNEWAPI.requestRecoveryPassword($scope.recoveryCredentials).$promise
      .then(function(user) {
				Materialize.toast('Te hemos enviado un email de recuperación', 4000);
				$scope.step = 'email';
      })
      .catch(function(err) {
        Materialize.toast('Error al solicitar restauracion', 4000);
      })
			.finally(function() {
				$scope.loadingRecovery = false;
			});
		}

		$scope.recoveryPassword = function() {
			if ($scope.loadingRecovery) return;
			$scope.loadingRecovery = true;
			UsersNEWAPI.recoveryPassword($scope.recoveryCredentials).$promise
      .then(function(user) {
				Materialize.toast('Haz actualizado tu contraseña', 4000);
				$state.go('start');
      })
      .catch(function(err) {
        Materialize.toast('Error al actualizar contraseña', 4000);
      })
			.finally(function() {
				$scope.loadingRecovery = false;
			});
		}

		AppConfig.setTitle('Recuperar contraseña');

  }

  angular.module('users').controller('RecoveryPasswordCtrl', [
    '$scope',
		'$state',
		'$stateParams',
    'AppConfig',
		'UsersNEWAPI',
    RecoveryPasswordCtrl
  ]);
})();
