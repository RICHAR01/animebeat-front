(function() {
  'use strict';

  function GenresCtrl($scope, GenresAPI, genres) {
    var paginator = {
      page: 1,
      totalItems : genres.total.count,
      pageSize: 20
    };

    $scope.catalogOptions = {
      collection: genres.items,
      ngResource: GenresAPI,
      table: {
        headers: ['NOMBRE'],
        fieldNames: ['name']
      },
      paginator: paginator,
      editionTpl: 'modules/core/views/general-edition-form.client.view.html'
    };

  }

  angular.module('genres').controller('GenresCtrl', [
    '$scope',
    'GenresAPI',
    'genres',
    GenresCtrl
  ]);
})();