(function() {
  'use strict';

  function StudiosCtrl($scope, StudiosAPI, studios) {
    var paginator = {
      page: 1,
      totalItems : studios.total.count,
      pageSize: 20
    };

    $scope.catalogOptions = {
      collection: studios.items,
      ngResource: StudiosAPI,
      table: {
        headers: ['NOMBRE'],
        fieldNames: ['name']
      },
      paginator: paginator,
      editionTpl: 'modules/core/views/general-edition-form.client.view.html'
    };

  }

  angular.module('studios').controller('StudiosCtrl', [
    '$scope',
    'StudiosAPI',
    'studios',
    StudiosCtrl
  ]);
})();