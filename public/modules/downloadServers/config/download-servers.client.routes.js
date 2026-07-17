(function() {
'use strict';

  function DownloadServersConfig($stateProvider) {

    $stateProvider
    .state('downloadServers', {
      url: '/download-servers',
      parent: 'admin',
      templateUrl: 'modules/core/views/general-catalog-main.client.view.html',
      controller: 'DownloadServersCtrl',
      resolve: {
        DownloadServersAPI: 'DownloadServersAPI',
        $q: '$q',
        downloadServers: function(DownloadServersAPI, $q) {
          return $q.all({
            total: DownloadServersAPI.count().$promise,
            items: DownloadServersAPI.query({
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

  angular.module('downloadServers').config([
    '$stateProvider',
    DownloadServersConfig
  ]);
})();
