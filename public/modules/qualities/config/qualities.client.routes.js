(function() {
'use strict';

  function QualitiesConfig($stateProvider) {

    $stateProvider
    .state('qualities', {
      url: '/qualities',
      parent: 'admin',
      templateUrl: 'modules/core/views/general-catalog-main.client.view.html',
      controller: 'QualitiesCtrl',
      resolve: {
        QualitiesAPI: 'QualitiesAPI',
        $q: '$q',
        qualities: function(QualitiesAPI, $q) {
          return $q.all({
            total: QualitiesAPI.count().$promise,
            items: QualitiesAPI.query({
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

  angular.module('qualities').config([
    '$stateProvider',
    QualitiesConfig
  ]);
})();
