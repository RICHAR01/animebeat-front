(function() {
  'use strict';

  function QuotesCtrl($scope, QuotesAPI, quotes) {
    var paginator = {
      page: 1,
      totalItems : quotes.total.count,
      pageSize: 20
    };

    $scope.catalogOptions = {
      collection: quotes.items,
      ngResource: QuotesAPI,
      paginator: paginator,
      editionState: 'notExistentCreate', // Note: No se pueden crear citas desde admin, solo desde serie.
      customItemsTpl: 'modules/quotes/views/quotes-table.client.view.html',
      extendFilter: {
        include: 'character'
      }
    };

  }

  angular.module('quotes').controller('QuotesCtrl', [
    '$scope',
    'QuotesAPI',
    'quotes',
    QuotesCtrl
  ]);
})();