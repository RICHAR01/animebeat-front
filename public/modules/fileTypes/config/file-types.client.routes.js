(function() {
'use strict';

  function FileTypesConfig($stateProvider) {

    $stateProvider
    .state('fileTypes', {
      url: '/file-types',
      parent: 'admin',
      templateUrl: 'modules/core/views/general-catalog-main.client.view.html',
      controller: 'FileTypesCtrl',
      resolve: {
        FileTypesAPI: 'FileTypesAPI',
        $q: '$q',
        fileTypes: function(FileTypesAPI, $q) {
          return $q.all({
            total: FileTypesAPI.count().$promise,
            items: FileTypesAPI.query({
              filter: {
                limit: 20,
                skip: 0
              }
            }).$promise
          });
        }
      }
    });

  }

  angular.module('fileTypes').config([
    '$stateProvider',
    FileTypesConfig
  ]);
})();
