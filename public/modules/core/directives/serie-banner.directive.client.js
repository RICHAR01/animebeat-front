(function(){
'use strict';
  function serieBanner() {
    return {
      scope: {
        serie: '=',
        bannerTitle: '='
      },
      restrict: 'E',
      templateUrl:'modules/core/views/serie-banner.client.view.html'
    };
  }

  angular.module('core').directive('serieBanner', [
    serieBanner
  ]);
})();