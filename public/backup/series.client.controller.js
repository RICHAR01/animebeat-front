(function() {
  'use strict';

  function SeriesCtrl($scope, SeriesAPI) {

    var _this = this;

    this.fetchSeries = function() {
      SeriesAPI.query({
        filter: {
          limit: 1000,
          skip: 0
        }
      }).$promise
      .then(function(series){
        $scope.series = series;
      })
      .catch(function(err){
        Materialize.toast('Error', 4000);
      });
    };

    this.fetchSeries();

  }

  angular.module('series').controller('SeriesCtrl', [
    '$scope',
    'SeriesAPI',
    SeriesCtrl
  ]);
})();