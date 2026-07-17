(function(){
'use strict';
  function CatalogTable() {
    return {
      restrict: 'E',
      templateUrl:'modules/core/views/catalog-table.client.view.html'
    };
  }

  angular.module('core').directive('catalogTable', [
    CatalogTable
  ]);
})();