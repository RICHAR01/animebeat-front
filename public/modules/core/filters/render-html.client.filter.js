(function (module) {
  'use strict';

  var renderHtml = function($sce) {
    return function(htmlCode){
      return $sce.trustAsHtml(htmlCode);
    };
  };

  module.filter('renderHtml', [
    '$sce',
    renderHtml
  ]);

})(angular.module('core'));
