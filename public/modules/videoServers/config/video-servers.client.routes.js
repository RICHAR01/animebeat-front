(function() {
'use strict';

  function VideoServersConfig($stateProvider) {

    $stateProvider
    .state('videoServers', {
      url: '/video-servers',
      parent: 'admin',
      templateUrl: 'modules/core/views/general-catalog-main.client.view.html',
      controller: 'VideoServersCtrl',
      resolve: {
        VideoServersAPI: 'VideoServersAPI',
        $q: '$q',
        videoServers: function(VideoServersAPI, $q) {
          return $q.all({
            total: VideoServersAPI.count().$promise,
            items: VideoServersAPI.query({
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

  angular.module('videoServers').config([
    '$stateProvider',
    VideoServersConfig
  ]);
})();
