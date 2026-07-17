(function() {
  'use strict';

  function AnimesCtrl($scope, SeriesAPI, series) {
    var paginator = {
      page: 1,
      totalItems : series.total.count,
      pageSize: 20
    };

    $scope.catalogOptions = {
      collection: series.items,
      ngResource: SeriesAPI,
      paginator: paginator,
      editionState: 'animesCreate',
      customItemsTpl: 'modules/series/views/animes-table.client.view.html',
      extendFilter: {
        include: 'studio',
        order: 'createdAt DESC'
      }
    };

  }

  angular.module('series').controller('AnimesCtrl', [
    '$scope',
    'SeriesAPI',
    'series',
    AnimesCtrl
  ]);
})();
