(function() {
  'use strict';

  function VisitsCtrl($scope, VisitsAPI, visits) {
    var paginator = {
      page: 1,
      totalItems : visits.total.count,
      pageSize: 20
    };

    $scope.catalogOptions = {
      collection: visits.items,
      ngResource: VisitsAPI,
      table: {
        headers: ['TIPO', 'FECHA'],
        fieldNames: ['type', 'date']
      },
      paginator: paginator,
      editionTpl: 'modules/core/views/general-edition-form.client.view.html'
    };

  }

  angular.module('visits').controller('VisitsCtrl', [
    '$scope',
    'VisitsAPI',
    'visits',
    VisitsCtrl
  ]);
})();