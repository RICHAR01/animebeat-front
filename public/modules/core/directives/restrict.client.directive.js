(function () {
  'use strict';

  var inputTypes = {
    textNumber: '[^A-z0-9 _-ñÑáéíóúÁÉÍÓÚ]',
    text: '[^A-z _-ñÑáéíóúÁÉÍÓÚ]',
    number: '[^0-9]'
  };

  var Restrict = function ($parse) {
    var link = function ($scope, $element, $attrs) {
      var exp = inputTypes[$attrs.restrict] || $attrs.restrict;
      $scope.$watch($attrs.ngModel, function (value) {
        if (!value) {
          return;
        }
        if (typeof value === 'number') {
          value = value + '';
        }
        $parse($attrs.ngModel).assign($scope, value.replace(new RegExp(exp, 'g'), ''));
      });
    };

    return {
      restrict: 'A',
      require: 'ngModel',
      link: link
    };
  };

  angular.module('core').directive('restrict', [
    '$parse',
    Restrict
  ]);
})();
