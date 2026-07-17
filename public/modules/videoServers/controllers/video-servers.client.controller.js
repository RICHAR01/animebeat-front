(function() {
  'use strict';

  function VideoServersCtrl($scope, VideoServersAPI, videoServers) {
    var paginator = {
      page: 1,
      totalItems : videoServers.total.count,
      pageSize: 20
    };

    $scope.catalogOptions = {
      collection: videoServers.items,
      ngResource: VideoServersAPI,
      table: {
        headers: ['NOMBRE'],
        fieldNames: ['name']
      },
      paginator: paginator,
      editionTpl: 'modules/core/views/general-edition-form.client.view.html'
    };

  }

  angular.module('videoServers').controller('VideoServersCtrl', [
    '$scope',
    'VideoServersAPI',
    'videoServers',
    VideoServersCtrl
  ]);
})();