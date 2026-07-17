(function() {
  'use strict';

  function GroupSelector(SeriesAPI) {
    function link($scope) {

      var filter = {};
      $scope.groupSeries = [];
      $scope.searchParams = {};

      var onSearchSeriesByNameSucces = function(series) {
        $scope.groupSeries = series;
      };

      var resetGroupSeries = function() {
        $scope.groupSeries.length = 0;
      };

      var seachSeries = function(filter, onSeachSuccess) {
        SeriesAPI.query(filter).$promise
        .then(onSeachSuccess)
        .catch(function(err) {
          Materialize.toast('Error al obtener series', 4000);
        });
      };

      $scope.seachSeriesByName = function() {
        filter = {
          filter: {
            fields: ['id', 'name', 'groupId'],
            where: {
              name: { regexp: '/' + $scope.searchParams.serieName + '/i' }
            },
            limit: 15
          }
        };

        seachSeries(filter, onSearchSeriesByNameSucces);
      };

      $scope.seachSeriesByGroupId = function() {
        filter = {
          filter: {
            fields: ['id', 'name', 'groupId'],
            where: {
              groupId: { inq: [ $scope.searchParams.groupId ] }
            }
          }
        };

        if($scope.searchParams.groupId) {
          seachSeries(filter, onSearchSeriesByNameSucces);
        }
        else {
          resetGroupSeries();
        }
      };

      $scope.generateNewGroupId = function() {
        SeriesAPI.generateNewGroupId().$promise
        .then(function(response) {
          $scope.onGroupIdSelected(response.groupId);  
        })
        .catch(function() {
          Materialize.toast('No se pudo generar nuevo id de grupo');
        });
      };

      var setWatcherToTriggerSearchOutsideDirective = function() {
        $scope.$watch('triggerSearchOnChange', function() {
          $scope.searchParams.groupId = $scope.groupId;
          if($scope.searchParams.groupId) {
            $scope.seachSeriesByGroupId();
          }
          else {
            resetGroupSeries();
          }
        }); 
      };

      setWatcherToTriggerSearchOutsideDirective();

    }

    return {
      restrict: 'E',
      scope: {
        groupId: '=',
        onGroupIdSelected: '=',
        triggerSearchOnChange: '='
      },
      templateUrl:'modules/core/views/group-selector.client.view.html',
      link: link
    };
  }

  angular.module('core').directive('groupSelector', [
    'SeriesAPI',
    GroupSelector
  ]);
})();