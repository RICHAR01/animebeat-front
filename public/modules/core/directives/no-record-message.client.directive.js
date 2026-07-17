(function(){
'use strict';
  function noRecordMessage() {
    function link (scope, element, attrs) {
      attrs.message = attrs.message || 'No hay registros para mostrar';
    }

    return {
      templateUrl:'modules/core/views/no-record-message.client.view.html',
      restrict: 'E',
      link: link,
      scope: {
        message: '@'
      }
    };
  }

  angular.module('core').directive('noRecordMessage', [
    noRecordMessage
  ]);
})();
