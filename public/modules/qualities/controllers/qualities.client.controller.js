(function() {
  'use strict';

  function QualitiesCtrl($scope, QualitiesAPI, qualities) {
    var paginator = {
      page: 1,
      totalItems : qualities.total.count,
      pageSize: 20
    };

    $scope.catalogOptions = {
      collection: qualities.items,
      ngResource: QualitiesAPI,
      table: {
        headers: ['NOMBRE'],
        fieldNames: ['name']
      },
      paginator: paginator,
      editionTpl: 'modules/core/views/general-edition-form.client.view.html'
    };

  }

  angular.module('qualities').controller('QualitiesCtrl', [
    '$scope',
    'QualitiesAPI',
    'qualities',
    QualitiesCtrl
  ]);
})();