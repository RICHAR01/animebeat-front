(function() {
  'use strict';

  function DownloadServersCtrl($scope, DownloadServersAPI, downloadServers) {
    var paginator = {
      page: 1,
      totalItems : downloadServers.total.count,
      pageSize: 20
    };

    $scope.catalogOptions = {
      collection: downloadServers.items,
      ngResource: DownloadServersAPI,
      table: {
        headers: ['NOMBRE'],
        fieldNames: ['name']
      },
      paginator: paginator,
      editionTpl: 'modules/core/views/general-edition-form.client.view.html'
    };

  }

  angular.module('downloadServers').controller('DownloadServersCtrl', [
    '$scope',
    'DownloadServersAPI',
    'downloadServers',
    DownloadServersCtrl
  ]);
})();