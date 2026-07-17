(function() {
  'use strict';

  function Catalog($state) {
    function link($scope, $element, $attrs) {
      $scope.searchWhere = $scope.searchWhere || {};
      $scope.extendFilter = $scope.extendFilter || {};

      var selectedItemIndex = null;
      $scope.editionMode = false;
      var deletionModal = null;
      var deletionModalContainer = null;
      $scope.forms = {};
      $scope.selectedItem = {};
      
      $scope.openDeletionModal = function(item, index) {
        selectedItemIndex = index;
        $scope.selectedItem = item;

        if($scope.deletionModalTpl) {
          if (!deletionModal) {
            deletionModalContainer = $element.find('#deletionModalContainer');
            deletionModal = deletionModalContainer.children();
            deletionModal.modal();
          }
        }
        else {
          if (!deletionModal) {
            deletionModal = $element.find('#defaultDeletionModal');
            deletionModal.modal();
          }
        }
        
        deletionModal.modal('open');
      };

      $scope.showEditionMode = function(item, index) {
        if($scope.editionState) return $state.go($scope.editionState);

        selectedItemIndex = index;
        $scope.itemName = item ? item.name : '';
        $scope.selectedItem = item ? angular.copy(item) : {};
        
        $scope.editionMode = true;
      };

      $scope.closeEditionMode = function() {
        $scope.editionMode = false;
      };

      $scope.save = function(item) {
        if (isNew(item)) {
          create(item);
        }
        else {
          update(item);
        }
      };

      var isNew = function(item) {
        return !_.has(item, 'id');
      };

      var create = function(item) {
        $scope.ngResource.save(item).$promise
        .then(onCreateSucces)
        .catch(function(){
          Materialize.toast('No se pudo guardar el registro, intente de nuevo más tarde', 4000);
        });
      };

      var onCreateSucces = function(newItem) {
        $scope.collection.push(newItem);
        $scope.paginatorOptions.totalItems++;
        $scope.editionMode = false;
        Materialize.toast('Registro guardado exitosamente', 4000);
      };

      var update = function(item) {
        var requestParams = { id: item.id };
        var requestBody = item;
        $scope.ngResource.update(requestParams, requestBody).$promise
        .then(onUpdateSucces)
        .catch(function() {
          Materialize.toast('No se pudo actualizar el registro, intente de nuevo más tarde', 4000);
        });
      };

      var onUpdateSucces = function(updatedItem) {
        $scope.collection[selectedItemIndex] = updatedItem;
        $scope.editionMode = false;
        Materialize.toast('Registro actualizado exitosamente', 4000);
      };

      $scope.delete = function(itemId) {
        var requestParams = { id: itemId };
        $scope.ngResource.delete(requestParams).$promise
        .then(onDeletionSucces)
        .catch(function() {
          Materialize.toast('No se pudo eliminar registro, intente de nuevo más tarde', 4000);
        });
      };

      var onDeletionSucces = function() {
        if (isDeletedItemTheLastOneOnPage()) {
          $scope.paginatorOptions.page--;
          fetchItemsOfCollection();
        }
        else{
          $scope.collection.splice(selectedItemIndex, 1);
        }
        $scope.paginatorOptions.totalItems--;
        deletionModal.modal('close');
        Materialize.toast('Registro eliminado correctamente', 4000);
      };

      var isDeletedItemTheLastOneOnPage = function() {
        return $scope.paginatorOptions.page > 1 &&
               $scope.collection.length === 1;
      };

      var fetchItemsOfCollection = function() {
        var requestParams = {
          filter: {
            limit: $scope.paginatorOptions.pageSize,
            skip: $scope.paginatorOptions.pageSize * ($scope.paginatorOptions.page - 1)
          }
        };
        $scope.ngResource.query(requestParams).$promise
        .then(setCollection)
        .catch(function() {
          Materialize.toast('No se pudieron obtener registros, intente de nuevo más tarde', 4000);
        });
      };

      var setCollection = function(collection) {
        $scope.collection.length = 0;

        collection.forEach(function(item) {
          $scope.collection.push(item);
        });
      };
    }

    // TODO:
    // poder editar con modal
    // poder mandar a otro state
    // mensaje cuando no hay registros o resultados de busqueda
    // opcion mostrar iconos de accion en hover
    // hacer configuracion más simple
    // formulario dinamico basico
    // fetch de nueva pagina con where y extend(?)
    // posibilidad integrar graphql
    // mensaje custom al crear/actualizar/eliminar
    // agregar loading en busqueda, paginado y carga inicial

    return {
      restrict: 'E',
      scope: {
        collection: '=?',
        ngResource: '=?',
        editionState: '=?',
        customItemsTpl: '=?',
        editionTpl: '=?',
        deletionModalTpl: '=?',
        searcherOptions: '=?',
        paginatorOptions: '=?',
        tableOptions: '=?',
        extendFilter: '=?'
      },
      templateUrl:'modules/core/views/catalog.client.view.html',
      link: link
    };
  }

  angular.module('core').directive('catalog', [
    '$state',
    Catalog
  ]);
})();