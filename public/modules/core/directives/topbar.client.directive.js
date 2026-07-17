(function() {
  'use strict';

  function TopbarDirective($rootScope, $timeout, $interval, $state, $stateParams, SeriesAPI,
                           Authentication) {
    function link(scope, element, attrs) {
      scope.isSearching = false;
      scope.loadingSearch = false;
      scope.credentials = {};
      scope.register = {};
      scope.loginScope = {
        view: 'login'
      };
      scope.series = [];
      var loginModal = null;

      var setMenuOption = function(stateName) {
        scope.currentStateName = stateName;
      };

      $rootScope.$on('$stateChangeSuccess', function(event, toState) {
        scope.title = toState.appTitle || 'AnimeBeat';
        setMenuOption(toState.name);
      });

      $rootScope.$on('authentication:change', function(event, toState) {
        setUser();
      });

      var searchSeries = function(query) {
        scope.loadingSearch = true;

        SeriesAPI.query({
          filter: {
            where: {
              name: { regexp: '/' + query + '/i' }
            },
            order: 'name DESC',
            limit: 18
          }
        }).$promise
        .then(function(series) {
          scope.series = series;
        })
        .catch(function() {
          Materialize.toast('No se pudo realizar búsqueda', 4000);
        })
        .finally(function() {
          scope.shownQuery = query;
          scope.loadingSearch = false;
        });
      };

      var setDefaultValuesOnSearchEnabled = function() {
        scope.series.length = 0;
        scope.query = '';

        $timeout(function() {
          angular.element('#topbar-search').focus();
        });

        angular.element('.search-results-container').scroll(function(event){
          onScroll('.search-results-container');
        });
      };

      scope.toggleSearch = function() {
        scope.isSearching = !scope.isSearching;
        if (scope.isSearching) {
          setDefaultValuesOnSearchEnabled();
        }
        else {
          angular.element('body').removeClass('disable-scroll');
        }
      };

      var searchDebounce = _.debounce(searchSeries, 600);

      scope.onSearch = function(query) {
        if (query) {
          angular.element('body').addClass('disable-scroll');
          searchDebounce(query);
        }
        else {
          angular.element('body').removeClass('disable-scroll');
        }
      };

      scope.onCloseSearch = function() {
        scope.query = '';
        scope.toggleSearch();
      };

      var setUser = function() {
        scope.user = Authentication.user;
      };

      scope.title = $state.current.appTitle;

      scope.logout = function() {
        Authentication.logout();
      };

      // Hide Header on on scroll down

      var lastScrollTop = 0;
      var move = 0;
      var top = 0;
      var topbarHeight = angular.element('topbar nav').outerHeight() * -1;

      function onScroll(element) {
        var topDistance = $(element).scrollTop();

        var move =  topDistance - lastScrollTop;
        if (topDistance > lastScrollTop) {
          // Scroll Down
          top = top - move;
          if(top < topbarHeight)
            top = topbarHeight;

          angular.element('topbar nav').css('top', top+'px');
        } else {
          // Scroll Up
          top = top - move;
          if(top > 0)
            top = 0;

          angular.element('topbar nav').css('top', top+'px');
        }

        lastScrollTop = topDistance;
      };

      scope.launchFullScreen = function() {
        var element = document.documentElement;
        if(element.requestFullScreen) {
          element.requestFullScreen();
        } else if(element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if(element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        }
      };

      setUser();

      angular.element(window).scroll(function(event){
        onScroll(window);
      });


      /* login */

      scope.showLogin = function() {
        scope.changeView('login');

        if (!loginModal) {
          loginModal = angular.element('#login-modal');
          loginModal.modal();
        }

        loginModal.modal('open');
      };

      scope.changeView = function(viewType) {
        scope.loginScope = {
          view: viewType
        };
      };

      var getRandomLoginImage = function() {
        var baseImgUrl = 'modules/core/imgs/login';
        var randomImgNumber = Math.floor(Math.random() * 7) + 1;
        var fileType = '.png';
        return baseImgUrl + randomImgNumber + fileType;
      };

			var openLoginModalWithRegisterOption = function() {
				scope.showLogin();
				scope.changeView('register');
			};

			$rootScope.$on('action:require:loged:user', openLoginModalWithRegisterOption);

      scope.login = function() {
        Authentication.login(scope.credentials);
      };

      scope.singIn = function() {
        Authentication.singIn(scope.register);
      };

      scope.loginImage = getRandomLoginImage();

			$rootScope.$on('event:social-sign-in-success', function(event, userDetails) {
				var socialCredentials = {
					token: userDetails.token,
					provider: userDetails.provider
				};

				Authentication.loginSocial(socialCredentials);
			});

      /* login end */

    }

    return {
      templateUrl: 'modules/core/views/topbar.client.view.html',
      restrict: 'E',
      link: link
    };
  }

  angular.module('core').directive('topbar', [
    '$rootScope',
    '$timeout',
    '$interval',
    '$state',
    '$stateParams',
    'SeriesAPI',
    'Authentication',
    TopbarDirective
  ]);
})();
