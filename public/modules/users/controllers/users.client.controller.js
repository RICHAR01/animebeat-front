//TODO: Agregar nuevo diseño, edicion de usuarios y adaptar a directiva catalog si es posible (para busqueda, paginado y edicion).
(function() {
  'use strict';

  function UsersCtrl($scope, UsersAPI, users) {
    var paginator = {
      page: 1,
      totalItems : users.total.count,
      pageSize: 20
    };

    var searcher = {
      searchBy: ['username', 'email']
    };

    $scope.catalogOptions = {
      collection: users.items,
      ngResource: UsersAPI,
      table: {
        headers: ['USERNAME', 'EMAIL', 'ROL'],
        fieldNames: ['username', 'email', { property: 'role' , subproperty: 'name'}]
      },
      searcher: searcher,
      extendFilter: {
        include: 'role'
      },
      paginator: paginator,
      editionTpl: 'modules/core/views/general-edition-form.client.view.html',
    };

  }

  angular.module('users').controller('UsersCtrl', [
    '$scope',
    'UsersAPI',
    'users',
    UsersCtrl
  ]);
})();