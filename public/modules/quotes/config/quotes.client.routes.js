(function() {
'use strict';

  function QuotesConfig($stateProvider) {

    $stateProvider
    .state('adminQuotes', {
      url: '/quotes',
      parent: 'admin',
      templateUrl: 'modules/core/views/general-catalog-main.client.view.html',
      controller: 'QuotesCtrl',
      resolve: {
        QuotesAPI: 'QuotesAPI',
        $q: '$q',
        quotes: function(QuotesAPI, $q) {
          return $q.all({
            total: QuotesAPI.count().$promise,
            items: QuotesAPI.query({
              filter: {
                include: 'character',
                limit: 20,
                skip: 0
              }
            }).$promise
          });
        }
      }
    })
    .state('quotesEdit', {
      url: '/quotes/:quoteId',
      parent: 'admin',
      templateUrl: 'modules/quotes/views/quotes-edition.client.view.html',
      controller: 'QuotesEditionCtrl',
      resolve: {
        QuotesAPI: 'QuotesAPI',
        quote: function(QuotesAPI, $stateParams) {
          return QuotesAPI.get({
            id: $stateParams.quoteId
          }).$promise;
        }
      }
    });

  }

  angular.module('quotes').config([
    '$stateProvider',
    QuotesConfig
  ]);
})();
