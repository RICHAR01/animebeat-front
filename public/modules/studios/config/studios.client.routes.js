(function() {
'use strict';

  function StudiosConfig($stateProvider) {

    $stateProvider
    .state('studios', {
      url: '/studios',
      parent: 'admin',
      templateUrl: 'modules/core/views/general-catalog-main.client.view.html',
      controller: 'StudiosCtrl',
      resolve: {
        StudiosAPI: 'StudiosAPI',
        $q: '$q',
        studios: function(StudiosAPI, $q) {
          return $q.all({
            total: StudiosAPI.count().$promise,
            items: StudiosAPI.query({
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

  angular.module('studios').config([
    '$stateProvider',
    StudiosConfig
  ]);
})();
