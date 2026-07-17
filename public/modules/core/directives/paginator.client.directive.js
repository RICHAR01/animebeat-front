(function(){
'use strict';

  function Paginator() {
    function link (scope, element, attrs) {
      scope.page = scope.page || 0;
      scope.pageSize = scope.pageSize || 0;
      scope.total = scope.total || 0;
      scope.showPrevNext = scope.showPrevNext || true;
      scope.showFirstLast = scope.showFirstLast || true;
      scope.textFirst = scope.textFirst || '«';
      scope.textLast = scope.textLast || '»';
      scope.textNext = scope.textNext || '';
      scope.textPrev = scope.textPrev || '';
      scope.textTitlePage = scope.textTitlePage || 'Página {page}';
      scope.textTitleFirst = scope.textTitleFirst || 'Primera';
      scope.textTitleLast = scope.textTitleLast || 'Última';
      scope.textTitleNext = scope.textTitleNext || 'Siguiente';
      scope.textTitlePrev = scope.textTitlePrev || 'Anterior';
      scope.textFirstClass = scope.textFirstClass || '';
      scope.textLastClass = scope.textLastClass || '';
      scope.textNextClass = scope.textNextClass || '';
      scope.textPrevClass = scope.textPrevClass || '';
      scope.ulClass = scope.ulClass || 'pagination';
      scope.activeClass = scope.activeClass || null;
      scope.disabledClass = scope.disabledClass || null;
      scope.disabled = scope.disabled || false;
      scope.scrollTop = scope.scrollTop || true;
      scope.hideIfEmpty = scope.hideIfEmpty || false;
      scope.adjacent = scope.adjacent || 2;
      scope.dots = scope.dots || '...';
      scope.showOnlyNextPrev = scope.showOnlyNextPrev || false;
      scope.align = scope.align || 'right';
      // NOTE: Reset showInfo to default false
      // scope.showInfo = scope.showInfo || false;
      scope.showInfo = scope.showInfo || true;
     
      var lastPage = scope.page;

      var setOnlyNextPrevButtons = function() {
        scope.showPrevNext = true;
        scope.showFirstLast = false;
        scope.ulClass = scope.ulClass + ' only-next-prev';
      };

      if(scope.showOnlyNextPrev) {
        setOnlyNextPrevButtons();
      }

      var setAlign = function(align) {
        scope.rightAlign = align === 'right';
        scope.leftAlign = align === 'left';
      };

      setAlign(scope.align);

      var onSearchSuccess = function(results) {
        lastPage = scope.page;
        scope.collection.length = 0;
        results.forEach(function(result) {
          scope.collection.push(result);
        });
      };

      var onSearchFail = function(err) {
        scope.page = lastPage;
        scope.collection.length = 0;
        Materialize.toast('No se pudo realizar búsqueda, intente nuevamente', 4000);
      };

      scope.changePage = function(page) {
        scope.page = page;

        var queryParams = {
          filter: {
            limit: scope.pageSize,
            skip: (page - 1) * scope.pageSize
          }
        };

        if(scope.searchWhere) {
          queryParams.filter.where = scope.searchWhere;
        }

        if(scope.extendFilter) {
          _.extend(queryParams.filter, scope.extendFilter);
        }

        scope.ngResource.query(queryParams).$promise
        .then(onSearchSuccess)
        .catch(onSearchFail);
      };

    }

    return {
      templateUrl: 'modules/core/views/paginator.client.view.html',
      restrict: 'E',
      link: link,
      scope: {
        page: '=?',
        pageSize: '=?',
        total: '=?',
        showPrevNext: '=?',
        showFirstLast: '=?',
        textFirst: '=?',
        textLast: '=?',
        textNext: '=?',
        textPrev: '=?',
        textTitlePage: '=?',
        textTitleFirst: '=?',
        textTitleLast: '=?',
        textTitleNext: '=?',
        textTitlePrev: '=?',
        textFirstClass: '=?',
        textLastClass: '=?',
        textNextClass: '=?',
        textPrevClass: '=?',
        ulClass: '=?',
        activeClass: '=?',
        disabledClass: '=?',
        disabled: '=?',
        scrollTop: '=?',
        hideIfEmpty: '=?',
        adjacent: '=?',
        dots: '=?',
        showOnlyNextPrev: '=?',
        align: '=?',
        showInfo: '=?',
        ngResource: '=?',
        collection: '=?',
        extendFilter: '=?',
        searchWhere: '=?'
      }
    };
  }

  angular.module('core').directive('paginator', [
    Paginator
  ]);
})();
