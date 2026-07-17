(function() {
'use strict';

  function FansubsConfig($stateProvider) {

    $stateProvider
    .state('fansubs', {
      url: '/fansubs',
      parent: 'admin',
      templateUrl: 'modules/core/views/general-catalog-main.client.view.html',
      controller: 'FansubsCtrl',
      resolve: {
        FansubsAPI: 'FansubsAPI',
        $q: '$q',
        fansubs: function(FansubsAPI, $q) {
          return $q.all({
            total: FansubsAPI.count().$promise,
            items: FansubsAPI.query({
              filter: {
                limit: 20,
                skip: 0
              }
            }).$promise
          });
        }
      }
    });

  }

  angular.module('fansubs').config([
    '$stateProvider',
    FansubsConfig
  ]);
})();
