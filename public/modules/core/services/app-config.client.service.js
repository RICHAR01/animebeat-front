(function() {
  'use strict';

  function AppConfig($rootScope) {
    
    return {  
      setTitle: function (title, isFull) {
        var DEFAULT_APP_TITLE = 'AnimeBeat - Anime Online Sub Español HD';

        if (title && isFull) {
          $rootScope.title = title;
        }
        else if (title) {
          $rootScope.title = title + ' - AnimeBeat';
        }
        else {
          $rootScope.title = DEFAULT_APP_TITLE;
        }
        
      }
    };

  }

  angular.module('core').factory('AppConfig', [
    '$rootScope',
    AppConfig
  ]);
})();