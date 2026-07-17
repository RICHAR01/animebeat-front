(function() {
'use strict';

  function GenresConfig($stateProvider) {

    $stateProvider
    .state('genres', {
      url: '/genres',
      parent: 'admin',
      templateUrl: 'modules/core/views/general-catalog-main.client.view.html',
      controller: 'GenresCtrl',
      resolve: {
        GenresAPI: 'GenresAPI',
        $q: '$q',
        genres: function(GenresAPI, $q) {
          return $q.all({
            total: GenresAPI.count().$promise,
            items: GenresAPI.query({
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

  angular.module('genres').config([
    '$stateProvider',
    GenresConfig
  ]);
})();
