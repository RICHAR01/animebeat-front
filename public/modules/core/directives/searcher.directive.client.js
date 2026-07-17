(function() {
  'use strict';

  function Searcher($q) {
    function link(scope, element, attrs) {
      scope.placeholder = scope.placeholder || 'Buscar...';
      scope.debounce = scope.debounce || 600;
      scope.searchBy = scope.searchBy || 'name';
      scope.resultsQuantity = scope.resultsQuantity || 20;

      var search = function(criteria) {
        $q.all([
          getTotalItems(criteria),
          searchItems(criteria)
        ])
        .then(onSearchItemsAndCountSuccess)
        .catch(function(err) {
          scope.collection.length = 0;
          scope.totalItems = 0;
          Materialize.toast('No se pudo realizar búsqueda, intente nuevamente', 4000);
        });
      };

      var onSearchItemsAndCountSuccess = function(results) {
        //Share total items with paginator through 'totalItems' 
        //Share new current page with paginator through 'currentPage' 
        scope.totalItems = results[0].count;
        scope.currentPage = 1;

        scope.collection.length = 0;
        results[1].forEach(function(item) {
          scope.collection.push(item);
        });
      }

      var getTotalItems = function(criteria) {
        var queryParams = generateQueryParams(criteria);
        queryParams = _.pick(queryParams.filter, 'where');
        return scope.ngResource.count(queryParams).$promise;
      };

      var searchItems = function(criteria) {
        var queryParams = generateQueryParams(criteria);
        return scope.ngResource.query(queryParams).$promise;
      };

      var generateQueryParams = function(criteria) {
        var queryParams = {
          filter: {
            where: {},
            limit: scope.resultsQuantity
          }
        };

        if(criteria) {
          var where = generateWhereStatement(criteria);
          queryParams.filter.where = where;

          //Share where statement with paginator through 'searchWhere'
          scope.searchWhere = where;
        }

        if(scope.extendFilter) {
          _.extend(queryParams.filter, scope.extendFilter);
        }

        return queryParams;
      };

      var generateWhereStatement = function(criteria) {
        var where = {};

        if(typeof scope.searchBy === 'string') {
          where[scope.searchBy] = generatePropertySearch('searchBy', criteria);
        }

        if(Object.prototype.toString.call(scope.searchBy) === '[object Array]') {
          where.or = [];
          scope.searchBy.forEach(function(fieldName) {
            // TODO: Check well done?
            // var orStatement = {
            //   [fieldName + '']: generatePropertySearch(fieldName, criteria)
            // };

            var orStatement = {};
            orStatement[fieldName] = generatePropertySearch(fieldName, criteria);

            where.or.push(orStatement);
          });
        }

        return where;
      };

      var generatePropertySearch = function(property, criteria) {
        return { regexp: '/' + criteria + '/i' };
      };

      scope.changeSearchQuery = _.debounce(search, scope.debounce);

    }

    return {
      templateUrl: 'modules/core/views/searcher.client.view.html',
      restrict: 'E',
      link: link,
      scope: {
        collection: '=?',
        searchBy: '=?',
        placeholder: '=?',
        debounce: '=?',
        ngResource: '=?',
        resultsQuantity: '=?',
        totalItems: '=?',
        currentPage: '=?',
        extendFilter: '=?',
        searchWhere: '=?'
      }
    };
  }

  angular.module('core').directive('searcher', [
    '$q',
    Searcher
  ]);
})();