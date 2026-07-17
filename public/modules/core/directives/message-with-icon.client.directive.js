(function() {
  'use strict';

  function TopbarDirective() {
    function link(scope, element, attrs) {
      var setDefaultValues = function() {
        scope.padding = scope.padding || 50;
        scope.iconSize = scope.iconSize || 140;
        scope.titleSize = scope.titleSize || 14;
        scope.messageSize = scope.messageSize || 14;
        scope.iconClass = scope.iconClass || '';
      };

      setDefaultValues();
      
      scope.containerStyle = {
        padding: scope.padding + 'px 0'
      };

      scope.iconStyle = {
        'font-size': scope.iconSize + 'px !important'
      };
      scope.iconStyle = 'font-size: ' + scope.iconStyle['font-size'];

      scope.titleStyle = {
        'font-size': scope.titleSize + 'px'
      };

      scope.messageStyle = {
        'font-size': scope.messageSize + 'px'
      };

      scope.ngStyle = {
        'font-size': scope.fontSize + 'px',
        height: scope.height + 'px'
      };

    }

    return {
      templateUrl: 'modules/core/views/message-with-icon.client.view.html',
      scope: {
        padding: '@',
        iconClass: '@',
        iconSize: '@',
        iconText: '@', 
        title: '@',
        titleSize: '@',
        message: '@',
        messageSize: '@'
      },
      link:  link,
      restrict: 'E'
    };
  }

  angular.module('core').directive('messageWithIcon', [
    TopbarDirective
  ]);
})();