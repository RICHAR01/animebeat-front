(function() {
  'use strict';

  function FileTypesCtrl($scope, FileTypesAPI, fileTypes) {
    var paginator = {
      page: 1,
      totalItems : fileTypes.total.count,
      pageSize: 20
    };

    $scope.catalogOptions = {
      collection: fileTypes.items,
      ngResource: FileTypesAPI,
      table: {
        headers: ['NOMBRE'],
        fieldNames: ['name']
      },
      paginator: paginator,
      editionTpl: 'modules/core/views/general-edition-form.client.view.html'
    };

  }

  angular.module('fileTypes').controller('FileTypesCtrl', [
    '$scope',
    'FileTypesAPI',
    'fileTypes',
    FileTypesCtrl
  ]);
})();