(function(){
  'use strict';

  function AuthenticationService($rootScope, $http, $location, localStorageService,
																 socialLoginService, API_URL, NEW_API_URL) {
    var _this = this;
    _this.user = localStorageService.get('user');
    _this.accessToken = localStorageService.get('access_token');
    _this.loadingLogin = false;
    _this.loadingSingIn = false;

    function onAuthenticationChange() {
      $rootScope.$emit('authentication:change');
    }

    function setAuthenticationData(user, tokenId) {
      _this.user = user;
      _this.accessToken = tokenId;

      localStorageService.set('user', user);
      localStorageService.set('access_token', tokenId);

      onAuthenticationChange();
    }

    function unsetAuthenticationData() {
      _this.user = null;
      _this.accessToken = null;

      localStorageService.remove('user', 'access_token');

      onAuthenticationChange();
    }

    function onLoginSuccess(response) {
      setAuthenticationData(response.user, response.id);
      var loginModal = angular.element('#login-modal');
      if (loginModal) {
        loginModal.modal('close');
      }
    }

    this.login = function(credentials) {
      if (_this.loadingLogin) return;
      _this.loadingLogin = true;

      $http.post(API_URL + '/users/login?include=user', credentials)
      .success(onLoginSuccess)
      .error(function(err) {
        //TODO: Sin importar el error; el mismo mensaje
        Materialize.toast('Usuario o contraseña incorrectos', 4000);
      })
      .finally(function() {
        _this.loadingLogin = false;
      });
    };

    this.singIn = function(account) {
      if (_this.loadingSingIn) return;
      _this.loadingSingIn = true;

      $http.post(API_URL + '/users', account)
      .success(function(response) {
        //TODO: Manejo de errores; validacion de: username, email, password
        _this.login(account);
      })
      .error(function(response) {
        Materialize.toast('No se pudo crear cuenta, intente nuevamente', 4000);
      })
      .finally(function() {
        _this.loadingSingIn = false;
      });
    };

    this.logout = function() {
      if(!_this.accessToken) return;

			socialLoginService.logout()
      var logoutURL = API_URL + '/users/logout?access_token=' +
                      _this.accessToken;

      $http.post(logoutURL)
      .finally(function(response) {
        unsetAuthenticationData();
        //$location.path('/inicio');
      });
    };


		this.loginSocial = function(socialCredentials) {
      if (_this.loadingLogin) return;
      _this.loadingLogin = true;

      $http.post(NEW_API_URL + '/users/auth/social', socialCredentials)
      .success(onLoginSuccess)
      .error(function(err) {
        //TODO: Sin importar el error; el mismo mensaje
        Materialize.toast('No se logró logear', 4000);
      })
      .finally(function() {
        _this.loadingLogin = false;
      });
    };

  }

  angular.module('users').service('Authentication', [
    '$rootScope',
    '$http',
    '$location',
    'localStorageService',
		'socialLoginService',
    'API_URL',
		'NEW_API_URL',
    AuthenticationService
  ]);
})();
