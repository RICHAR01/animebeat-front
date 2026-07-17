(function() {
'use strict';

  function VisitsConfig($stateProvider) {

    $stateProvider
    .state('visits', {
      url: '/visits',
      parent: 'admin',
      templateUrl: 'modules/core/views/general-catalog-main.client.view.html',
      controller: 'VisitsCtrl',
      resolve: {
        VisitsAPI: 'VisitsAPI',
        $q: '$q',
        visits: function(VisitsAPI, $q) {
          return $q.all({
            total: VisitsAPI.count().$promise,
            items: VisitsAPI.query({
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

  angular.module('visits').config([
    '$stateProvider',
    VisitsConfig
  ]);
})();
