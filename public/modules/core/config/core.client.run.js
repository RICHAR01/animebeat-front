(function() {
  'use strict';

  function CoreRun($rootScope, $state, amMoment) {

    amMoment.changeLocale('es');

    var scrollTop = function() {
      angular.element('html,body').scrollTop(0);
    };
    
    var onStateChangeSuccess = function(event, toState, toParams, fromState,
                                      fromParams, error) {

      scrollTop();

     // event.preventDefault();
     //  console.log(toState)
     //  if(toState.name == 'home')
     //  	$state.go('main');
      
    };

    var listenForStateChangeSuccess = function() {
      $rootScope.$on('$stateChangeSuccess', onStateChangeSuccess);  
    };
    
    listenForStateChangeSuccess();
  }

  angular.module('core').run([
    '$rootScope',
    '$state',
    'amMoment',
    CoreRun
  ]);
})();