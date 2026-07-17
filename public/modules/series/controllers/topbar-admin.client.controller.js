(function() {
  'use strict';

  function TopbarAdminCtrl($scope, AppConfig, Authentication) {
    var _this = this;
    AppConfig.setTitle();
    $scope.Authentication = Authentication;
    

  }

  angular.module('series').controller('TopbarAdminCtrl', [
    '$scope',
    'AppConfig',
    'Authentication',
    TopbarAdminCtrl
  ]);
})();