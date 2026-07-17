'use strict';

// Setting up route
angular.module('core').config(['socialProvider',
  function(socialProvider) {

		socialProvider.setGoogleKey('302829922239-rh0tmpnmchfpggijl1bkc4ne42j0j70i.apps.googleusercontent.com');

  }
]);
