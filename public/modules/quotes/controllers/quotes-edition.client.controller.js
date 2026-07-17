(function() {
  'use strict';

  function QuotesEditionCtrl($scope, QuotesAPI, quote, $state) {

    var _this = this;
    $scope.quote = quote;

    $scope.save = function() {
      QuotesAPI.update(
        { id: $scope.quote.id }, 
        $scope.quote
      ).$promise
      .then(function() {
        Materialize.toast('Cita actualizada exitosamente', 4000);
        $state.go('adminQuotes');
      })
      .catch(function(){
        Materialize.toast('Error al actualizar cita', 4000);
      });
    }

  }

  angular.module('quotes').controller('QuotesEditionCtrl', [
    '$scope',
    'QuotesAPI',
    'quote',
    '$state',
    QuotesEditionCtrl
  ]);
})();