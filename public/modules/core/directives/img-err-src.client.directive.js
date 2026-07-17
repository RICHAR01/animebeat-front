(function() {
  'use strict';

  angular.module('core').directive('imgErrSrc', [
    function() {
      return {
        link: function(scope, element, attrs) {
          element.bind('error', function() {
            if (attrs.src !== attrs.imgErrSrc) {
              attrs.$set('src', attrs.imgErrSrc);
            }
          });

          scope.$watch(function() {
              return attrs.ngSrc;
            }, function (value) {
              if (!value) {
                element.attr('src', attrs.imgErrSrc);  
              }
          });
        }
      };
    }
  ]);
})();