(function() {
  'use strict';

  function FansubsCtrl($scope, FansubsAPI, fansubs) {
    var paginator = {
      page: 1,
      totalItems : fansubs.total.count,
      pageSize: 20
    };

    $scope.catalogOptions = {
      collection: fansubs.items,
      ngResource: FansubsAPI,
      table: {
        headers: ['NOMBRE'],
        fieldNames: ['name']
      },
      paginator: paginator,
      editionTpl: 'modules/core/views/general-edition-form.client.view.html'
    };

  }

  angular.module('fansubs').controller('FansubsCtrl', [
    '$scope',
    'FansubsAPI',
    'fansubs',
    FansubsCtrl
  ]);
})();