'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function () {
	// Init module configuration options
	var applicationModuleName = 'animebeat';

	var applicationModuleVendorDependencies = [
		'ngResource',
		'ui.router',
		'ui.utils',
		'ui.materialize',
		'bw.paging',
		'isteven-multi-select',
		'LocalStorageModule',
		'vjs.video',
		'angular-medium-editor',
		/* 'angular-owl-carousel-directive', */
		'angularMoment',
		'angular-loading-bar',
		'socialLogin',
	];

	// Add a new vertical module
	var registerModule = function (moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule,
	};
})();

('use strict');

//Start by defining the main module and adding the module dependencies
angular
	.module(
		ApplicationConfiguration.applicationModuleName,
		ApplicationConfiguration.applicationModuleVendorDependencies
	)
	.constant('API_URL', API_URL)
	.constant('NEW_API_URL', NEW_API_URL);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config([
	'$locationProvider',
	function ($locationProvider) {
		$locationProvider.hashPrefix('!');
	},
]);

//Then define the init function for starting up the application
angular.element(document).ready(function () {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});

('use strict');

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('core');

('use strict');

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('downloadServers');
('use strict');

ApplicationConfiguration.registerModule('fansubs');
('use strict');

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('fileTypes');
('use strict');

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('genres');
('use strict');

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('home');
('use strict');

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('privacity');
('use strict');

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('qualities');
('use strict');

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('quotes');
('use strict');

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('season-airing');
('use strict');

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('seasons');
('use strict');

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('series');
('use strict');

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('studios');
('use strict');

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('test');
('use strict');

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('users');
('use strict');

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('videoServers');
('use strict');

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('visits');
('use strict');

// Setting up route
angular.module('core').config([
	'$stateProvider',
	'$urlRouterProvider',
	function ($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/inicio');

		// Home state routing
		$stateProvider.state('home', {
			// url: '',
			templateUrl: 'modules/core/views/home.client.view.html',
		});
	},
]);
(function () {
	'use strict';

	function CoreRun($rootScope, $state, amMoment) {
		amMoment.changeLocale('es');

		var scrollTop = function () {
			angular.element('html,body').scrollTop(0);
		};

		var onStateChangeSuccess = function (
			event,
			toState,
			toParams,
			fromState,
			fromParams,
			error
		) {
			scrollTop();

			// event.preventDefault();
			//  console.log(toState)
			//  if(toState.name == 'home')
			//  	$state.go('main');
		};

		var listenForStateChangeSuccess = function () {
			$rootScope.$on('$stateChangeSuccess', onStateChangeSuccess);
		};

		listenForStateChangeSuccess();
	}

	angular.module('core').run(['$rootScope', '$state', 'amMoment', CoreRun]);
})();
(function () {
	'use strict';

	function LoadingBarConfig(cfpLoadingBarProvider) {
		cfpLoadingBarProvider.includeSpinner = false;
		cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
	}

	angular.module('core').config(['cfpLoadingBarProvider', LoadingBarConfig]);
})();

(function () {
	'use strict';

	function PushNotificationsService(
		$rootScope,
		localStorageService,
		PlayersAPI
	) {
		var _this = this;
		var playerId = localStorageService.get('playerId');
		var OneSignal = null;
		var notificationsOptions = {
			appId: 'fcf6477d-b253-444f-8799-be8e59bc673f',
			autoRegister: true /* Set to true to automatically prompt visitors */,
			httpPermissionRequest: {
				enable: true,
				modalTitle: 'Gracias por suscribirte',
				modalMessage:
					'Ahora estás suscrito a notificaciones. Puedes des-suscribirte en cualquier momento.',
				modalButtonText: 'Cerrar',
			},
			notifyButton: {
				enable: true /* Set to false to hide */,
				// size: 'medium', /* One of 'small', 'medium', or 'large' */
				// theme: 'default', /* One of 'default' (red-white) or 'inverse" (white-red) */
				// position: 'bottom-right', /* Either 'bottom-left' or 'bottom-right' */
				// offset: {
				//     bottom: '0px',
				//     left: '0px', /* Only applied if bottom-left */
				//     right: '0px' /* Only applied if bottom-right */
				// },
				prenotify: true /* Show an icon with 1 unread message for first-time site visitors */,
				showCredit: false /* Hide the OneSignal logo */,
				text: {
					'tip.state.unsubscribed': 'Suscribirse a notificaciones',
					'tip.state.subscribed': 'Estás suscrito a notificaciones',
					'tip.state.blocked': 'Notificaciones están bloqueadas',
					'message.prenotify': 'Click para suscribirse a notificaciones',
					'message.action.subscribed': '¡Gracias por suscribirte!',
					'message.action.resubscribed': 'Estás suscrito a notificaciones',
					'message.action.unsubscribed': 'No recibirás notificaciones de nuevo',
					'dialog.main.title': 'Administración de Notificaciones',
					'dialog.main.button.subscribe': 'SUSCRIBIRSE',
					'dialog.main.button.unsubscribe': 'DES-SUSCRIBIRSE',
					'dialog.blocked.title': 'Desbloquear notificaciones',
					'dialog.blocked.message':
						'Sigue estas instrucciones para habilitar las notificaciones:',
				},
				// colors: { // Customize the colors of the main button and dialog popup button
				//   'circle.background': 'rgb(84,110,123)',
				//   'circle.foreground': 'white',
				//   'badge.background': 'rgb(84,110,123)',
				//   'badge.foreground': 'white',
				//   'badge.bordercolor': 'white',
				//   'pulse.color': 'white',
				//   'dialog.button.background.hovering': 'rgb(77, 101, 113)',
				//   'dialog.button.background.active': 'rgb(70, 92, 103)',
				//   'dialog.button.background': 'rgb(84,110,123)',
				//   'dialog.button.foreground': 'white'
				// },
				promptOptions: {
					/* These prompt options values configure both the HTTP prompt and the HTTP popup. */
					/* Change bold title, limited to 30 characters */
					siteName: 'AnimeBeat',
					/* actionMessage limited to 90 characters */
					actionMessage:
						'Nos encantaría mostrarte notificaciones para las últimas noticias y actualizaciones.',
					/* Example notification title */
					exampleNotificationTitle: 'Notificación de ejemplo',
					/* Example notification message */
					exampleNotificationMessage: 'Nuevo episodio de tu serie favorita',
					/* Text below example notification, limited to 50 characters */
					exampleNotificationCaption:
						'Te puedes des-suscribir en cualquier momento',
					/* Accept button text, limited to 15 characters */
					/* acceptButtonText limited to 15 characters */
					acceptButtonText: 'PERMITIR',
					/* cancelButtonText limited to 15 characters */
					cancelButtonText: 'NO GRACIAS',
				},
			},
			welcomeNotification: {
				title: 'AnimeBeat',
				message: '¡Gracias por suscribirte!',
				// url: '' /* Leave commented for the notification to not open a window on Chrome and Firefox (on Safari, it opens to your webpage) */
			},
		};

		var onPlayerSubscribed = function (newPlayerId) {
			localStorageService.set('playerId', newPlayerId);
			playerId = newPlayerId;
			PlayersAPI.upsert({
				playerId: newPlayerId,
			});
		};

		var onPlayerUnsubscribed = function () {
			PlayersAPI.delete({
				id: playerId,
			}).$promise;
			localStorageService.remove('playerId');
			playerId = null;
		};

		var updatePlayer = function () {
			PlayersAPI.upsert({
				playerId: playerId,
			}).$promise;
		};

		$rootScope.$on('authentication:change', updatePlayer);

		var initPushNotifications = function () {
			OneSignal = window.OneSignal || [];

			OneSignal.push(function () {
				OneSignal.on('subscriptionChange', function (isSubscribed) {
					if (isSubscribed) {
						OneSignal.getUserId(function (userId) {
							onPlayerSubscribed(userId);
						});
					} else {
						onPlayerUnsubscribed();
					}
				});

				OneSignal.isPushNotificationsEnabled(function (isEnabled) {
					/* Trigger Custom Link Permission Message */
					// if (!isEnabled) {
					//   document.getElementById("subscribe-link").addEventListener('click', subscribe);
					//   document.getElementById("subscribe-link").style.display = '';
					// }
				});
			});

			OneSignal.push(['init', notificationsOptions]);
		};

		initPushNotifications();
	}

	angular
		.module('core')
		.run([
			'$rootScope',
			'localStorageService',
			'PlayersAPI',
			PushNotificationsService,
		]);
})();

('use strict');

// Setting up route
angular.module('core').config([
	'socialProvider',
	function (socialProvider) {
		socialProvider.setGoogleKey(
			'302829922239-rh0tmpnmchfpggijl1bkc4ne42j0j70i.apps.googleusercontent.com'
		);
	},
]);

/*
{
  name: 'angular-medium-editor-insert-plugin',
  description: 'This is a copy of the shown version added $timeout to work',
  version: 0.1.19,
  dependencies: {
    'angular: ^1.5.7',
    'medium-editor: ^5.21.0',
    'medium-editor-insert-plugin: ^2.3.3'
  },
  homepage: 'https://github.com/himynameistimli/angular-medium-editor-insert-plugin'
}
*/

(function () {
	'use strict';

	function MediumInsert($timeout) {
		function link(scope, elem, attr, ngModel) {
			$timeout(function () {
				var editor = $('medium-editor').length
					? $('medium-editor')
					: $('[medium-editor]');

				editor.mediumInsert({
					editor: ngModel.editor,
					addons: scope.insertAddons,
				});
			});
		}

		return {
			restrict: 'EA',
			require: '^ngModel',
			link: link,
			scope: {
				insertAddons: '=',
			},
		};
	}

	angular.module('core').directive('mediumInsert', ['$timeout', MediumInsert]);
})();

(function () {
	'use strict';
	function CatalogTable() {
		return {
			restrict: 'E',
			templateUrl: 'modules/core/views/catalog-table.client.view.html',
		};
	}

	angular.module('core').directive('catalogTable', [CatalogTable]);
})();
(function () {
	'use strict';

	function Catalog($state) {
		function link($scope, $element, $attrs) {
			$scope.searchWhere = $scope.searchWhere || {};
			$scope.extendFilter = $scope.extendFilter || {};

			var selectedItemIndex = null;
			$scope.editionMode = false;
			var deletionModal = null;
			var deletionModalContainer = null;
			$scope.forms = {};
			$scope.selectedItem = {};

			$scope.openDeletionModal = function (item, index) {
				selectedItemIndex = index;
				$scope.selectedItem = item;

				if ($scope.deletionModalTpl) {
					if (!deletionModal) {
						deletionModalContainer = $element.find('#deletionModalContainer');
						deletionModal = deletionModalContainer.children();
						deletionModal.modal();
					}
				} else {
					if (!deletionModal) {
						deletionModal = $element.find('#defaultDeletionModal');
						deletionModal.modal();
					}
				}

				deletionModal.modal('open');
			};

			$scope.showEditionMode = function (item, index) {
				if ($scope.editionState) return $state.go($scope.editionState);

				selectedItemIndex = index;
				$scope.itemName = item ? item.name : '';
				$scope.selectedItem = item ? angular.copy(item) : {};

				$scope.editionMode = true;
			};

			$scope.closeEditionMode = function () {
				$scope.editionMode = false;
			};

			$scope.save = function (item) {
				if (isNew(item)) {
					create(item);
				} else {
					update(item);
				}
			};

			var isNew = function (item) {
				return !_.has(item, 'id');
			};

			var create = function (item) {
				$scope.ngResource
					.save(item)
					.$promise.then(onCreateSucces)
					.catch(function () {
						Materialize.toast(
							'No se pudo guardar el registro, intente de nuevo más tarde',
							4000
						);
					});
			};

			var onCreateSucces = function (newItem) {
				$scope.collection.push(newItem);
				$scope.paginatorOptions.totalItems++;
				$scope.editionMode = false;
				Materialize.toast('Registro guardado exitosamente', 4000);
			};

			var update = function (item) {
				var requestParams = { id: item.id };
				var requestBody = item;
				$scope.ngResource
					.update(requestParams, requestBody)
					.$promise.then(onUpdateSucces)
					.catch(function () {
						Materialize.toast(
							'No se pudo actualizar el registro, intente de nuevo más tarde',
							4000
						);
					});
			};

			var onUpdateSucces = function (updatedItem) {
				$scope.collection[selectedItemIndex] = updatedItem;
				$scope.editionMode = false;
				Materialize.toast('Registro actualizado exitosamente', 4000);
			};

			$scope.delete = function (itemId) {
				var requestParams = { id: itemId };
				$scope.ngResource
					.delete(requestParams)
					.$promise.then(onDeletionSucces)
					.catch(function () {
						Materialize.toast(
							'No se pudo eliminar registro, intente de nuevo más tarde',
							4000
						);
					});
			};

			var onDeletionSucces = function () {
				if (isDeletedItemTheLastOneOnPage()) {
					$scope.paginatorOptions.page--;
					fetchItemsOfCollection();
				} else {
					$scope.collection.splice(selectedItemIndex, 1);
				}
				$scope.paginatorOptions.totalItems--;
				deletionModal.modal('close');
				Materialize.toast('Registro eliminado correctamente', 4000);
			};

			var isDeletedItemTheLastOneOnPage = function () {
				return (
					$scope.paginatorOptions.page > 1 && $scope.collection.length === 1
				);
			};

			var fetchItemsOfCollection = function () {
				var requestParams = {
					filter: {
						limit: $scope.paginatorOptions.pageSize,
						skip:
							$scope.paginatorOptions.pageSize *
							($scope.paginatorOptions.page - 1),
					},
				};
				$scope.ngResource
					.query(requestParams)
					.$promise.then(setCollection)
					.catch(function () {
						Materialize.toast(
							'No se pudieron obtener registros, intente de nuevo más tarde',
							4000
						);
					});
			};

			var setCollection = function (collection) {
				$scope.collection.length = 0;

				collection.forEach(function (item) {
					$scope.collection.push(item);
				});
			};
		}

		// TODO:
		// poder editar con modal
		// poder mandar a otro state
		// mensaje cuando no hay registros o resultados de busqueda
		// opcion mostrar iconos de accion en hover
		// hacer configuracion más simple
		// formulario dinamico basico
		// fetch de nueva pagina con where y extend(?)
		// posibilidad integrar graphql
		// mensaje custom al crear/actualizar/eliminar
		// agregar loading en busqueda, paginado y carga inicial

		return {
			restrict: 'E',
			scope: {
				collection: '=?',
				ngResource: '=?',
				editionState: '=?',
				customItemsTpl: '=?',
				editionTpl: '=?',
				deletionModalTpl: '=?',
				searcherOptions: '=?',
				paginatorOptions: '=?',
				tableOptions: '=?',
				extendFilter: '=?',
			},
			templateUrl: 'modules/core/views/catalog.client.view.html',
			link: link,
		};
	}

	angular.module('core').directive('catalog', ['$state', Catalog]);
})();
(function () {
	'use strict';
	function character() {
		return {
			scope: {
				character: '=',
			},
			restrict: 'E',
			templateUrl: 'modules/core/views/character.client.view.html',
		};
	}

	angular.module('core').directive('character', [character]);
})();
(function () {
	'use strict';
	function createNewBtn() {
		return {
			scope: {
				message: '=',
			},
			restrict: 'E',
			templateUrl: 'modules/core/views/create-new-btn.client.view.html',
		};
	}

	angular.module('core').directive('createNewBtn', [createNewBtn]);
})();
(function () {
	'use strict';

	function DisqusDirective($location) {
		function link(scope, element, attrs) {
			var htmlText =
				'<div id="disqus_thread"></div>' +
				'  <script>' +
				'    var disqus_config = function () {' +
				'      this.page.url = "' +
				$location.absUrl() +
				'";' +
				'      this.page.identifier = "' +
				scope.identifier +
				'";' +
				'      this.page.title = "' +
				scope.title +
				'";' +
				'    };' +
				'  </script>';

			element.html(htmlText);

			var resetDisqus = function () {
				window.DISQUS.reset({
					reload: true,
					config: function () {
						this.page.url = $location.absUrl();
						this.page.identifier = scope.identifier;
						this.page.title = scope.title;
					},
				});
			};

			var setDisqus = function () {
				var d = document,
					s = d.createElement('script');

				s.src = '//animebeat.disqus.com/embed.js';

				s.setAttribute('data-timestamp', +new Date());
				(d.head || d.body).appendChild(s);
			};

			angular.isDefined(window.DISQUS) ? resetDisqus() : setDisqus();
		}

		return {
			restrict: 'E',
			link: link,
			scope: {
				identifier: '=',
				title: '=',
			},
		};
	}

	angular.module('core').directive('disqus', ['$location', DisqusDirective]);
})();
(function () {
	'use strict';
	function episode() {
		return {
			scope: {
				episode: '=',
			},
			restrict: 'E',
			templateUrl: 'modules/core/views/episode.client.view.html',
		};
	}

	angular.module('core').directive('episode', [episode]);
})();
(function () {
	'use strict';
	function favorites() {
		function link(scope) {
			var loginModal = null;
			var loading = false;
			scope.isFavorited = false;
			scope.modalFavorites = [];

			var checkIsFavorite = function () {
				var foundCurrentUser = _.find(scope.favorites, {
					userId: scope.currentUserId,
				});
				scope.isFavorited = foundCurrentUser ? true : false;
			};

			scope.showFavoritesListModal = function (favorites) {
				scope.modalFavorites = favorites;
				if (!loginModal) {
					loginModal = angular.element(
						'#favorites-list-modal-' + scope.identifier
					);
					loginModal.modal();
				}
				loginModal.modal('open');
			};

			scope.onChangeFavorite = function () {
				if (scope.isFavorited) {
					scope.deleteFavorite();
				} else {
					scope.createFavorite();
				}
			};

			scope.createFavorite = function () {
				if (loading) return;
				loading = true;

				var promise = scope.onCreateFavorite(scope.identifier);

				if (promise) {
					promise
						.then(function (favorite) {
							var foundFavorite = _.find(scope.favorites, { id: favorite.id });
							if (!foundFavorite) {
								scope.favorites.push(favorite);
								checkIsFavorite();
							}
						})
						.finally(function () {
							loading = false;
						});
				} else {
					loading = false;
				}
			};

			scope.deleteFavorite = function () {
				if (loading) return;
				loading = true;

				var promise = scope.onDeleteFavorite(scope.identifier);

				if (promise) {
					promise
						.then(function (favorite) {
							var deletedFavoriteIndex = _.findIndex(scope.favorites, {
								userId: scope.currentUserId,
							});
							if (deletedFavoriteIndex !== -1) {
								scope.favorites.splice(deletedFavoriteIndex, 1);
								checkIsFavorite();
							}
						})
						.finally(function () {
							loading = false;
						});
				} else {
					loading = false;
				}
			};

			checkIsFavorite();
		}

		return {
			scope: {
				onDeleteFavorite: '=',
				onCreateFavorite: '=',
				currentUserId: '=',
				identifier: '=?',
				favorites: '=',
			},
			restrict: 'E',
			templateUrl: 'modules/core/views/favorites.client.view.html',
			link: link,
		};
	}

	angular.module('core').directive('favorites', [favorites]);
})();

(function () {
	'use strict';

	function FooterDirective($rootScope) {
		return {
			templateUrl: 'modules/core/views/footer.client.view.html',
			restrict: 'E',
		};
	}

	angular.module('core').directive('footer', ['$rootScope', FooterDirective]);
})();
(function () {
	'use strict';

	function GroupSelector(SeriesAPI) {
		function link($scope) {
			var filter = {};
			$scope.groupSeries = [];
			$scope.searchParams = {};

			var onSearchSeriesByNameSucces = function (series) {
				$scope.groupSeries = series;
			};

			var resetGroupSeries = function () {
				$scope.groupSeries.length = 0;
			};

			var seachSeries = function (filter, onSeachSuccess) {
				SeriesAPI.query(filter)
					.$promise.then(onSeachSuccess)
					.catch(function (err) {
						Materialize.toast('Error al obtener series', 4000);
					});
			};

			$scope.seachSeriesByName = function () {
				filter = {
					filter: {
						fields: ['id', 'name', 'groupId'],
						where: {
							name: { regexp: '/' + $scope.searchParams.serieName + '/i' },
						},
						limit: 15,
					},
				};

				seachSeries(filter, onSearchSeriesByNameSucces);
			};

			$scope.seachSeriesByGroupId = function () {
				filter = {
					filter: {
						fields: ['id', 'name', 'groupId'],
						where: {
							groupId: { inq: [$scope.searchParams.groupId] },
						},
					},
				};

				if ($scope.searchParams.groupId) {
					seachSeries(filter, onSearchSeriesByNameSucces);
				} else {
					resetGroupSeries();
				}
			};

			$scope.generateNewGroupId = function () {
				SeriesAPI.generateNewGroupId()
					.$promise.then(function (response) {
						$scope.onGroupIdSelected(response.groupId);
					})
					.catch(function () {
						Materialize.toast('No se pudo generar nuevo id de grupo');
					});
			};

			var setWatcherToTriggerSearchOutsideDirective = function () {
				$scope.$watch('triggerSearchOnChange', function () {
					$scope.searchParams.groupId = $scope.groupId;
					if ($scope.searchParams.groupId) {
						$scope.seachSeriesByGroupId();
					} else {
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
				triggerSearchOnChange: '=',
			},
			templateUrl: 'modules/core/views/group-selector.client.view.html',
			link: link,
		};
	}

	angular
		.module('core')
		.directive('groupSelector', ['SeriesAPI', GroupSelector]);
})();
(function () {
	'use strict';

	angular.module('core').directive('imgErrSrc', [
		function () {
			return {
				link: function (scope, element, attrs) {
					element.bind('error', function () {
						if (attrs.src !== attrs.imgErrSrc) {
							attrs.$set('src', attrs.imgErrSrc);
						}
					});

					scope.$watch(
						function () {
							return attrs.ngSrc;
						},
						function (value) {
							if (!value) {
								element.attr('src', attrs.imgErrSrc);
							}
						}
					);
				},
			};
		},
	]);
})();
(function () {
	'use strict';
	function loadMoreBar() {
		return {
			restrict: 'E',
			templateUrl: 'modules/core/views/load-more-bar.client.view.html',
		};
	}

	angular.module('core').directive('loadMoreBar', [loadMoreBar]);
})();
(function () {
	'use strict';
	function loader() {
		function link(scope, element, attrs) {
			scope.color = scope.color || 'default';
			scope.ngStyle = {
				width: scope.size + 'px',
				height: scope.size + 'px',
			};
		}

		return {
			restrict: 'E',
			templateUrl: 'modules/core/views/loader.client.view.html',
			link: link,
			scope: {
				size: '=',
				color: '=?',
				customClass: '=',
			},
		};
	}

	angular.module('core').directive('loader', [loader]);
})();
(function () {
	'use strict';

	function TopbarDirective() {
		function link(scope, element, attrs) {
			var setDefaultValues = function () {
				scope.padding = scope.padding || 50;
				scope.iconSize = scope.iconSize || 140;
				scope.titleSize = scope.titleSize || 14;
				scope.messageSize = scope.messageSize || 14;
				scope.iconClass = scope.iconClass || '';
			};

			setDefaultValues();

			scope.containerStyle = {
				padding: scope.padding + 'px 0',
			};

			scope.iconStyle = {
				'font-size': scope.iconSize + 'px !important',
			};
			scope.iconStyle = 'font-size: ' + scope.iconStyle['font-size'];

			scope.titleStyle = {
				'font-size': scope.titleSize + 'px',
			};

			scope.messageStyle = {
				'font-size': scope.messageSize + 'px',
			};

			scope.ngStyle = {
				'font-size': scope.fontSize + 'px',
				height: scope.height + 'px',
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
				messageSize: '@',
			},
			link: link,
			restrict: 'E',
		};
	}

	angular.module('core').directive('messageWithIcon', [TopbarDirective]);
})();
(function () {
	'use strict';
	function navigationDrawer() {
		return {
			restrict: 'E',
			templateUrl: 'modules/core/views/navigation-drawer.client.view.html',
		};
	}

	angular.module('core').directive('navigationDrawer', [navigationDrawer]);
})();
(function () {
	'use strict';
	function noRecordMessage() {
		function link(scope, element, attrs) {
			attrs.message = attrs.message || 'No hay registros para mostrar';
		}

		return {
			templateUrl: 'modules/core/views/no-record-message.client.view.html',
			restrict: 'E',
			link: link,
			scope: {
				message: '@',
			},
		};
	}

	angular.module('core').directive('noRecordMessage', [noRecordMessage]);
})();

(function () {
	'use strict';
	function noResults() {
		function link(scope, element, attrs) {
			scope.ngStyle = {
				'font-size': scope.fontSize + 'px',
				height: scope.height + 'px',
			};
		}

		return {
			restrict: 'E',
			templateUrl: 'modules/core/views/no-results.client.view.html',
			link: link,
			scope: {
				message: '@',
				fontSize: '@',
				height: '@',
			},
		};
	}

	angular.module('core').directive('noResults', [noResults]);
})();
(function () {
	'use strict';

	function Paginator() {
		function link(scope, element, attrs) {
			scope.page = scope.page || 0;
			scope.pageSize = scope.pageSize || 0;
			scope.total = scope.total || 0;
			scope.showPrevNext = scope.showPrevNext || true;
			scope.showFirstLast = scope.showFirstLast || true;
			scope.textFirst = scope.textFirst || '«';
			scope.textLast = scope.textLast || '»';
			scope.textNext = scope.textNext || '';
			scope.textPrev = scope.textPrev || '';
			scope.textTitlePage = scope.textTitlePage || 'Página {page}';
			scope.textTitleFirst = scope.textTitleFirst || 'Primera';
			scope.textTitleLast = scope.textTitleLast || 'Última';
			scope.textTitleNext = scope.textTitleNext || 'Siguiente';
			scope.textTitlePrev = scope.textTitlePrev || 'Anterior';
			scope.textFirstClass = scope.textFirstClass || '';
			scope.textLastClass = scope.textLastClass || '';
			scope.textNextClass = scope.textNextClass || '';
			scope.textPrevClass = scope.textPrevClass || '';
			scope.ulClass = scope.ulClass || 'pagination';
			scope.activeClass = scope.activeClass || null;
			scope.disabledClass = scope.disabledClass || null;
			scope.disabled = scope.disabled || false;
			scope.scrollTop = scope.scrollTop || true;
			scope.hideIfEmpty = scope.hideIfEmpty || false;
			scope.adjacent = scope.adjacent || 2;
			scope.dots = scope.dots || '...';
			scope.showOnlyNextPrev = scope.showOnlyNextPrev || false;
			scope.align = scope.align || 'right';
			// NOTE: Reset showInfo to default false
			// scope.showInfo = scope.showInfo || false;
			scope.showInfo = scope.showInfo || true;

			var lastPage = scope.page;

			var setOnlyNextPrevButtons = function () {
				scope.showPrevNext = true;
				scope.showFirstLast = false;
				scope.ulClass = scope.ulClass + ' only-next-prev';
			};

			if (scope.showOnlyNextPrev) {
				setOnlyNextPrevButtons();
			}

			var setAlign = function (align) {
				scope.rightAlign = align === 'right';
				scope.leftAlign = align === 'left';
			};

			setAlign(scope.align);

			var onSearchSuccess = function (results) {
				lastPage = scope.page;
				scope.collection.length = 0;
				results.forEach(function (result) {
					scope.collection.push(result);
				});
			};

			var onSearchFail = function (err) {
				scope.page = lastPage;
				scope.collection.length = 0;
				Materialize.toast(
					'No se pudo realizar búsqueda, intente nuevamente',
					4000
				);
			};

			scope.changePage = function (page) {
				scope.page = page;

				var queryParams = {
					filter: {
						limit: scope.pageSize,
						skip: (page - 1) * scope.pageSize,
					},
				};

				if (scope.searchWhere) {
					queryParams.filter.where = scope.searchWhere;
				}

				if (scope.extendFilter) {
					_.extend(queryParams.filter, scope.extendFilter);
				}

				scope.ngResource
					.query(queryParams)
					.$promise.then(onSearchSuccess)
					.catch(onSearchFail);
			};
		}

		return {
			templateUrl: 'modules/core/views/paginator.client.view.html',
			restrict: 'E',
			link: link,
			scope: {
				page: '=?',
				pageSize: '=?',
				total: '=?',
				showPrevNext: '=?',
				showFirstLast: '=?',
				textFirst: '=?',
				textLast: '=?',
				textNext: '=?',
				textPrev: '=?',
				textTitlePage: '=?',
				textTitleFirst: '=?',
				textTitleLast: '=?',
				textTitleNext: '=?',
				textTitlePrev: '=?',
				textFirstClass: '=?',
				textLastClass: '=?',
				textNextClass: '=?',
				textPrevClass: '=?',
				ulClass: '=?',
				activeClass: '=?',
				disabledClass: '=?',
				disabled: '=?',
				scrollTop: '=?',
				hideIfEmpty: '=?',
				adjacent: '=?',
				dots: '=?',
				showOnlyNextPrev: '=?',
				align: '=?',
				showInfo: '=?',
				ngResource: '=?',
				collection: '=?',
				extendFilter: '=?',
				searchWhere: '=?',
			},
		};
	}

	angular.module('core').directive('paginator', [Paginator]);
})();

(function () {
	'use strict';
	function passwordVerify() {
		function link(scope, element, attrs, ctrl) {
			scope.$watch(
				function () {
					var combined;

					if (scope.passwordVerify || ctrl.$viewValue) {
						combined = scope.passwordVerify + '_' + ctrl.$viewValue;
					}
					return combined;
				},
				function (value) {
					if (value) {
						ctrl.$parsers.unshift(function (viewValue) {
							var origin = scope.passwordVerify;
							if (origin !== viewValue) {
								ctrl.$setValidity('passwordVerify', false);
								return undefined;
							} else {
								ctrl.$setValidity('passwordVerify', true);
								return viewValue;
							}
						});
					}
				}
			);
		}

		return {
			require: 'ngModel',
			scope: {
				passwordVerify: '=',
			},
			link: link,
		};
	}

	angular.module('core').directive('passwordVerify', [passwordVerify]);
})();
(function () {
	'use strict';

	function PreLoaderDirective($rootScope) {
		return {
			templateUrl: 'modules/core/views/pre-loader.client.view.html',
			restrict: 'E',
		};
	}

	angular
		.module('core')
		.directive('preLoader', ['$rootScope', PreLoaderDirective]);
})();
(function () {
	'use strict';
	function quote() {
		function link(scope) {
			scope.isFavorited = false;
			var foundCurrentUser = _.find(scope.favorites, {
				userId: scope.currentUserId,
			});
			if (foundCurrentUser) scope.isFavorited = true;
		}

		return {
			scope: {
				showFavorites: '=?',
				onCreateQuoteFavorite: '=?',
				onDeleteQuoteFavorite: '=?',
				currentUserId: '=?',
				quote: '=',
			},
			restrict: 'E',
			templateUrl: 'modules/core/views/quote.client.view.html',
		};
	}

	angular.module('core').directive('quote', [quote]);
})();

(function () {
	'use strict';
	function reaction() {
		function link(scope) {
			scope.reaction.position = scope.reaction.position || 'left';
		}

		return {
			scope: {
				showFavorites: '=?',
				onDeleteReactionFavorite: '=?',
				onCreateReactionFavorite: '=?',
				currentUserId: '=?',
				reaction: '=',
			},
			restrict: 'E',
			templateUrl: 'modules/core/views/reaction.client.view.html',
			link: link,
		};
	}

	angular.module('core').directive('reaction', [reaction]);
})();

(function () {
	'use strict';

	var inputTypes = {
		textNumber: '[^A-z0-9 _-ñÑáéíóúÁÉÍÓÚ]',
		text: '[^A-z _-ñÑáéíóúÁÉÍÓÚ]',
		number: '[^0-9]',
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
				$parse($attrs.ngModel).assign(
					$scope,
					value.replace(new RegExp(exp, 'g'), '')
				);
			});
		};

		return {
			restrict: 'A',
			require: 'ngModel',
			link: link,
		};
	};

	angular.module('core').directive('restrict', ['$parse', Restrict]);
})();

(function () {
	'use strict';

	function Searcher($q) {
		function link(scope, element, attrs) {
			scope.placeholder = scope.placeholder || 'Buscar...';
			scope.debounce = scope.debounce || 600;
			scope.searchBy = scope.searchBy || 'name';
			scope.resultsQuantity = scope.resultsQuantity || 20;

			var search = function (criteria) {
				$q.all([getTotalItems(criteria), searchItems(criteria)])
					.then(onSearchItemsAndCountSuccess)
					.catch(function (err) {
						scope.collection.length = 0;
						scope.totalItems = 0;
						Materialize.toast(
							'No se pudo realizar búsqueda, intente nuevamente',
							4000
						);
					});
			};

			var onSearchItemsAndCountSuccess = function (results) {
				//Share total items with paginator through 'totalItems'
				//Share new current page with paginator through 'currentPage'
				scope.totalItems = results[0].count;
				scope.currentPage = 1;

				scope.collection.length = 0;
				results[1].forEach(function (item) {
					scope.collection.push(item);
				});
			};

			var getTotalItems = function (criteria) {
				var queryParams = generateQueryParams(criteria);
				queryParams = _.pick(queryParams.filter, 'where');
				return scope.ngResource.count(queryParams).$promise;
			};

			var searchItems = function (criteria) {
				var queryParams = generateQueryParams(criteria);
				return scope.ngResource.query(queryParams).$promise;
			};

			var generateQueryParams = function (criteria) {
				var queryParams = {
					filter: {
						where: {},
						limit: scope.resultsQuantity,
					},
				};

				if (criteria) {
					var where = generateWhereStatement(criteria);
					queryParams.filter.where = where;

					//Share where statement with paginator through 'searchWhere'
					scope.searchWhere = where;
				}

				if (scope.extendFilter) {
					_.extend(queryParams.filter, scope.extendFilter);
				}

				return queryParams;
			};

			var generateWhereStatement = function (criteria) {
				var where = {};

				if (typeof scope.searchBy === 'string') {
					where[scope.searchBy] = generatePropertySearch('searchBy', criteria);
				}

				if (
					Object.prototype.toString.call(scope.searchBy) === '[object Array]'
				) {
					where.or = [];
					scope.searchBy.forEach(function (fieldName) {
						// TODO: Check well done?
						// var orStatement = {
						//   [fieldName + '']: generatePropertySearch(fieldName, criteria)
						// };

						var orStatement = {};
						orStatement[fieldName] = generatePropertySearch(
							fieldName,
							criteria
						);

						where.or.push(orStatement);
					});
				}

				return where;
			};

			var generatePropertySearch = function (property, criteria) {
				return { regexp: '/' + criteria + '/i' };
			};

			scope.changeSearchQuery = _.debounce(search, scope.debounce);
		}

		return {
			templateUrl: 'modules/core/views/searcher.client.view.html',
			restrict: 'E',
			link: link,
			scope: {
				collection: '=?',
				searchBy: '=?',
				placeholder: '=?',
				debounce: '=?',
				ngResource: '=?',
				resultsQuantity: '=?',
				totalItems: '=?',
				currentPage: '=?',
				extendFilter: '=?',
				searchWhere: '=?',
			},
		};
	}

	angular.module('core').directive('searcher', ['$q', Searcher]);
})();
(function () {
	'use strict';
	function sectionTitle() {
		return {
			scope: {
				sectionTitle: '=',
			},
			restrict: 'E',
			templateUrl: 'modules/core/views/section-title.client.view.html',
		};
	}

	angular.module('core').directive('sectionTitle', [sectionTitle]);
})();
(function () {
	'use strict';
	function serieBanner() {
		return {
			scope: {
				serie: '=',
				bannerTitle: '=',
			},
			restrict: 'E',
			templateUrl: 'modules/core/views/serie-banner.client.view.html',
		};
	}

	angular.module('core').directive('serieBanner', [serieBanner]);
})();
(function () {
	'use strict';
	function serie() {
		return {
			scope: {
				serie: '=',
			},
			restrict: 'E',
			templateUrl: 'modules/core/views/serie.client.view.html',
		};
	}

	angular.module('core').directive('serie', [serie]);
})();
(function () {
	'use strict';

	function TopInteractions($timeout) {
		function link(scope, element, attrs) {
			scope.goToReactionsTab = function () {
				$timeout(function () {
					var tarjetElement = angular.element('#reactions-tab a');
					tarjetElement.trigger('click');
					angular
						.element('html, body')
						.animate({ scrollTop: $(tarjetElement).offset().top - 60 }, 'slow');
				});
			};

			scope.goToQuotesTab = function () {
				$timeout(function () {
					var tarjetElement = angular.element('#quotes-tab a');
					tarjetElement.trigger('click');
					angular
						.element('html, body')
						.animate({ scrollTop: $(tarjetElement).offset().top - 60 }, 'slow');
				});
			};
		}

		return {
			templateUrl: 'modules/core/views/top-interactions.client.view.html',
			scope: {
				onDeleteReactionFavorite: '=',
				onCreateReactionFavorite: '=',
				onCreateQuoteFavorite: '=',
				onDeleteQuoteFavorite: '=',
				currentUserId: '=',
				interactions: '=',
			},
			link: link,
			restrict: 'E',
		};
	}

	angular
		.module('core')
		.directive('topInteractions', ['$timeout', TopInteractions]);
})();

(function () {
	'use strict';

	function TopbarDirective(
		$rootScope,
		$timeout,
		$interval,
		$state,
		$stateParams,
		SeriesAPI,
		Authentication
	) {
		function link(scope, element, attrs) {
			scope.isSearching = false;
			scope.loadingSearch = false;
			scope.credentials = {};
			scope.register = {};
			scope.loginScope = {
				view: 'login',
			};
			scope.series = [];
			var loginModal = null;

			var setMenuOption = function (stateName) {
				scope.currentStateName = stateName;
			};

			$rootScope.$on('$stateChangeSuccess', function (event, toState) {
				scope.title = toState.appTitle || 'AnimeBeat';
				setMenuOption(toState.name);
			});

			$rootScope.$on('authentication:change', function (event, toState) {
				setUser();
			});

			var searchSeries = function (query) {
				scope.loadingSearch = true;

				SeriesAPI.query({
					filter: {
						where: {
							name: { regexp: '/' + query + '/i' },
						},
						order: 'name DESC',
						limit: 18,
					},
				})
					.$promise.then(function (series) {
						scope.series = series;
					})
					.catch(function () {
						Materialize.toast('No se pudo realizar búsqueda', 4000);
					})
					.finally(function () {
						scope.shownQuery = query;
						scope.loadingSearch = false;
					});
			};

			var setDefaultValuesOnSearchEnabled = function () {
				scope.series.length = 0;
				scope.query = '';

				$timeout(function () {
					angular.element('#topbar-search').focus();
				});

				angular.element('.search-results-container').scroll(function (event) {
					onScroll('.search-results-container');
				});
			};

			scope.toggleSearch = function () {
				scope.isSearching = !scope.isSearching;
				if (scope.isSearching) {
					setDefaultValuesOnSearchEnabled();
				} else {
					angular.element('body').removeClass('disable-scroll');
				}
			};

			var searchDebounce = _.debounce(searchSeries, 600);

			scope.onSearch = function (query) {
				if (query) {
					angular.element('body').addClass('disable-scroll');
					searchDebounce(query);
				} else {
					angular.element('body').removeClass('disable-scroll');
				}
			};

			scope.onCloseSearch = function () {
				scope.query = '';
				scope.toggleSearch();
			};

			var setUser = function () {
				scope.user = Authentication.user;
			};

			scope.title = $state.current.appTitle;

			scope.logout = function () {
				Authentication.logout();
			};

			// Hide Header on on scroll down

			var lastScrollTop = 0;
			var move = 0;
			var top = 0;
			var topbarHeight = angular.element('topbar nav').outerHeight() * -1;

			function onScroll(element) {
				var topDistance = $(element).scrollTop();

				var move = topDistance - lastScrollTop;
				if (topDistance > lastScrollTop) {
					// Scroll Down
					top = top - move;
					if (top < topbarHeight) top = topbarHeight;

					angular.element('topbar nav').css('top', top + 'px');
				} else {
					// Scroll Up
					top = top - move;
					if (top > 0) top = 0;

					angular.element('topbar nav').css('top', top + 'px');
				}

				lastScrollTop = topDistance;
			}

			scope.launchFullScreen = function () {
				var element = document.documentElement;
				if (element.requestFullScreen) {
					element.requestFullScreen();
				} else if (element.mozRequestFullScreen) {
					element.mozRequestFullScreen();
				} else if (element.webkitRequestFullScreen) {
					element.webkitRequestFullScreen();
				}
			};

			setUser();

			angular.element(window).scroll(function (event) {
				onScroll(window);
			});

			/* login */

			scope.showLogin = function () {
				scope.changeView('login');

				if (!loginModal) {
					loginModal = angular.element('#login-modal');
					loginModal.modal();
				}

				loginModal.modal('open');
			};

			scope.changeView = function (viewType) {
				scope.loginScope = {
					view: viewType,
				};
			};

			var getRandomLoginImage = function () {
				var baseImgUrl = 'modules/core/imgs/login';
				var randomImgNumber = Math.floor(Math.random() * 7) + 1;
				var fileType = '.png';
				return baseImgUrl + randomImgNumber + fileType;
			};

			var openLoginModalWithRegisterOption = function () {
				scope.showLogin();
				scope.changeView('register');
			};

			$rootScope.$on(
				'action:require:loged:user',
				openLoginModalWithRegisterOption
			);

			scope.login = function () {
				Authentication.login(scope.credentials);
			};

			scope.singIn = function () {
				Authentication.singIn(scope.register);
			};

			scope.loginImage = getRandomLoginImage();

			$rootScope.$on(
				'event:social-sign-in-success',
				function (event, userDetails) {
					var socialCredentials = {
						token: userDetails.token,
						provider: userDetails.provider,
					};

					Authentication.loginSocial(socialCredentials);
				}
			);

			/* login end */
		}

		return {
			templateUrl: 'modules/core/views/topbar.client.view.html',
			restrict: 'E',
			link: link,
		};
	}

	angular
		.module('core')
		.directive('topbar', [
			'$rootScope',
			'$timeout',
			'$interval',
			'$state',
			'$stateParams',
			'SeriesAPI',
			'Authentication',
			TopbarDirective,
		]);
})();

(function (module) {
	'use strict';

	var renderHtml = function ($sce) {
		return function (htmlCode) {
			return $sce.trustAsHtml(htmlCode);
		};
	};

	module.filter('renderHtml', ['$sce', renderHtml]);
})(angular.module('core'));

(function () {
	'use strict';

	function AppConfig($rootScope) {
		return {
			setTitle: function (title, isFull) {
				var DEFAULT_APP_TITLE = 'AnimeBeat - Anime Online Sub Español HD';

				if (title && isFull) {
					$rootScope.title = title;
				} else if (title) {
					$rootScope.title = title + ' - AnimeBeat';
				} else {
					$rootScope.title = DEFAULT_APP_TITLE;
				}
			},
		};
	}

	angular.module('core').factory('AppConfig', ['$rootScope', AppConfig]);
})();
(function () {
	'use strict';

	function CharactersAPI($resource, API_URL) {
		return $resource(
			API_URL + '/characters/:id',
			{},
			{
				update: { method: 'PUT' },
				count: {
					method: 'GET',
					url: API_URL + '/characters/count',
					isArray: false,
					responseType: 'json',
				},
			}
		);
	}

	angular
		.module('core')
		.factory('CharactersAPI', ['$resource', 'API_URL', CharactersAPI]);
})();
(function () {
	'use strict';

	function DownloadServersAPI($resource, API_URL) {
		return $resource(
			API_URL + '/downloadServers/:id',
			{},
			{
				update: { method: 'PUT' },
				count: {
					method: 'GET',
					url: API_URL + '/downloadServers/count',
					isArray: false,
					responseType: 'json',
				},
			}
		);
	}

	angular
		.module('core')
		.factory('DownloadServersAPI', [
			'$resource',
			'API_URL',
			DownloadServersAPI,
		]);
})();
(function () {
	'use strict';

	function DownloadsAPI($resource, API_URL) {
		return $resource(
			API_URL + '/downloads/:id',
			{},
			{
				update: { method: 'PUT' },
				count: {
					method: 'GET',
					url: API_URL + '/downloads/count',
					isArray: false,
					responseType: 'json',
				},
			}
		);
	}

	angular
		.module('core')
		.factory('DownloadsAPI', ['$resource', 'API_URL', DownloadsAPI]);
})();
(function () {
	'use strict';

	function EpisodesAPI($resource, API_URL) {
		return $resource(
			API_URL + '/episodes/:id',
			{},
			{
				update: { method: 'PUT' },
				count: {
					method: 'GET',
					url: API_URL + '/episodes/count',
					isArray: false,
					responseType: 'json',
				},
				play: {
					method: 'GET',
					url: API_URL + '/episodes/play/:id',
					isArray: false,
					responseType: 'json',
				},
			}
		);
	}

	angular
		.module('series')
		.factory('EpisodesAPI', ['$resource', 'API_URL', EpisodesAPI]);
})();
(function () {
	'use strict';

	function FansubsAPI($resource, API_URL) {
		return $resource(
			API_URL + '/fansubs/:id',
			{},
			{
				update: { method: 'PUT' },
				count: {
					method: 'GET',
					url: API_URL + '/fansubs/count',
					isArray: false,
					responseType: 'json',
				},
			}
		);
	}

	angular
		.module('fansubs')
		.factory('FansubsAPI', ['$resource', 'API_URL', FansubsAPI]);
})();
(function () {
	'use strict';

	function FileTypesAPI($resource, API_URL) {
		return $resource(
			API_URL + '/fileTypes/:id',
			{},
			{
				update: { method: 'PUT' },
				count: {
					method: 'GET',
					url: API_URL + '/fileTypes/count',
					isArray: false,
					responseType: 'json',
				},
			}
		);
	}

	angular
		.module('core')
		.factory('FileTypesAPI', ['$resource', 'API_URL', FileTypesAPI]);
})();
(function () {
	'use strict';

	function GenresAPI($resource, API_URL) {
		return $resource(
			API_URL + '/genres/:id',
			{},
			{
				update: { method: 'PUT' },
				count: {
					method: 'GET',
					url: API_URL + '/genres/count',
					isArray: false,
					responseType: 'json',
				},
			}
		);
	}

	angular
		.module('genres')
		.factory('GenresAPI', ['$resource', 'API_URL', GenresAPI]);
})();
(function () {
	'use strict';

	function PlayersAPI($resource, API_URL) {
		return $resource(
			API_URL + '/notifications/players/:id',
			{},
			{
				upsert: { method: 'PUT' },
			}
		);
	}

	angular
		.module('core')
		.factory('PlayersAPI', ['$resource', 'API_URL', PlayersAPI]);
})();

(function () {
	'use strict';

	function QualitiesAPI($resource, API_URL) {
		return $resource(
			API_URL + '/qualities/:id',
			{},
			{
				update: { method: 'PUT' },
				count: {
					method: 'GET',
					url: API_URL + '/qualities/count',
					isArray: false,
					responseType: 'json',
				},
			}
		);
	}

	angular
		.module('core')
		.factory('QualitiesAPI', ['$resource', 'API_URL', QualitiesAPI]);
})();
(function () {
	'use strict';

	function QuotesAPI($resource, NEW_API_URL) {
		return $resource(
			NEW_API_URL + '/quotes/:id',
			{},
			{
				update: { method: 'PUT' },
				count: {
					method: 'GET',
					url: NEW_API_URL + '/quotes/count',
					isArray: false,
					responseType: 'json',
				},
			}
		);
	}

	angular
		.module('core')
		.factory('QuotesAPI', ['$resource', 'NEW_API_URL', QuotesAPI]);
})();
(function () {
	'use strict';

	function ReactionsAPI($resource, NEW_API_URL) {
		return $resource(
			NEW_API_URL + '/reactions/:id',
			{},
			{
				update: { method: 'PUT' },
				count: {
					method: 'GET',
					url: NEW_API_URL + '/reactions/count',
					isArray: false,
					responseType: 'json',
				},
			}
		);
	}

	angular
		.module('core')
		.factory('ReactionsAPI', ['$resource', 'NEW_API_URL', ReactionsAPI]);
})();
(function () {
	'use strict';

	function SeriesNEWAPI($resource, NEW_API_URL) {
		return $resource(
			NEW_API_URL + '/series/:id',
			{},
			{
				update: { method: 'PUT' },
				topInteractions: {
					method: 'GET',
					url: NEW_API_URL + '/series/:id/topInteractions',
					isArray: false,
					responseType: 'json',
				},
			}
		);
	}

	angular
		.module('series')
		.factory('SeriesNEWAPI', ['$resource', 'NEW_API_URL', SeriesNEWAPI]);
})();
(function () {
	'use strict';

	function SeriesAPI($resource, API_URL) {
		return $resource(
			API_URL + '/series/:id',
			{},
			{
				update: { method: 'PUT' },
				count: {
					method: 'GET',
					url: API_URL + '/series/count',
					isArray: false,
					responseType: 'json',
				},
				changeStatus: {
					method: 'POST',
					url: API_URL + '/series/:id/changeStatus',
					isArray: false,
					responseType: 'json',
				},
				saveQuote: {
					method: 'POST',
					url: API_URL + '/series/:id/quotes',
					isArray: false,
					responseType: 'json',
				},
				saveGenre: {
					method: 'PUT',
					url: API_URL + '/series/:id/genres/rel/:genreId',
					isArray: false,
					responseType: 'json',
				},
				generateNewGroupId: {
					method: 'GET',
					url: API_URL + '/series/groupId',
					isArray: false,
					responseType: 'json',
				},
				favoriteBySeason: {
					method: 'GET',
					url: API_URL + '/series/favoriteBySeason',
					isArray: false,
					responseType: 'json',
				},
				characters: {
					method: 'GET',
					url: API_URL + '/series/:id/characters',
					isArray: true,
					responseType: 'json',
				},
			}
		);
	}

	angular
		.module('series')
		.factory('SeriesAPI', ['$resource', 'API_URL', SeriesAPI]);
})();
(function () {
	'use strict';

	function StudiosAPI($resource, API_URL) {
		return $resource(
			API_URL + '/studios/:id',
			{},
			{
				update: { method: 'PUT' },
				count: {
					method: 'GET',
					url: API_URL + '/studios/count',
					isArray: false,
					responseType: 'json',
				},
			}
		);
	}

	angular
		.module('genres')
		.factory('StudiosAPI', ['$resource', 'API_URL', StudiosAPI]);
})();
(function () {
	'use strict';

	function UsersNEWAPI($resource, NEW_API_URL) {
		return $resource(
			NEW_API_URL + '/users/:id',
			{},
			{
				update: { method: 'PUT' },
				createReactionFavorite: {
					method: 'POST',
					url: NEW_API_URL + '/users/reactions/:reactionId/favorite',
					isArray: false,
					responseType: 'json',
				},
				deleteReactionFavorite: {
					method: 'DELETE',
					url: NEW_API_URL + '/users/reactions/:reactionId/favorite',
					isArray: false,
					responseType: 'json',
				},
				createQuoteFavorite: {
					method: 'POST',
					url: NEW_API_URL + '/users/quotes/:quoteId/favorite',
					isArray: false,
					responseType: 'json',
				},
				deleteQuoteFavorite: {
					method: 'DELETE',
					url: NEW_API_URL + '/users/quotes/:quoteId/favorite',
					isArray: false,
					responseType: 'json',
				},
				createSerieRate: {
					method: 'POST',
					url: NEW_API_URL + '/users/series/:serieId/rate',
					isArray: false,
					responseType: 'json',
				},
				deleteSerieRate: {
					method: 'DELETE',
					url: NEW_API_URL + '/users/series/:serieId/rate',
					isArray: false,
					responseType: 'json',
				},
				updateUser: {
					method: 'PATCH',
					url: NEW_API_URL + '/users/me',
					isArray: false,
					responseType: 'json',
				},
				requestRecoveryPassword: {
					method: 'POST',
					url: NEW_API_URL + '/users/requestRecoveryPassword',
					isArray: false,
					responseType: 'json',
				},
				recoveryPassword: {
					method: 'POST',
					url: NEW_API_URL + '/users/recoveryPassword',
					isArray: false,
					responseType: 'json',
				},
			}
		);
	}

	angular
		.module('core')
		.factory('UsersNEWAPI', ['$resource', 'NEW_API_URL', UsersNEWAPI]);
})();

(function () {
	'use strict';

	function UsersAPI($resource, API_URL) {
		return $resource(
			API_URL + '/users/:id',
			{},
			{
				update: { method: 'PUT' },
				count: {
					method: 'GET',
					url: API_URL + '/users/count',
					isArray: false,
					responseType: 'json',
				},
				saveSerie: {
					method: 'POST',
					url: API_URL + '/users/series',
					isArray: false,
					responseType: 'json',
				},
				deleteSerie: {
					method: 'DELETE',
					url: API_URL + '/users/series/:userSerieId',
					isArray: false,
					responseType: 'json',
				},
				getSeriesList: {
					method: 'GET',
					url: API_URL + '/users/series',
					isArray: true,
					responseType: 'json',
				},
				getByUsername: {
					method: 'GET',
					url: API_URL + '/users/getByUsername/:username',
					isArray: false,
					responseType: 'json',
				},
				getSerieInfo: {
					method: 'GET',
					url: API_URL + '/users/series/:serieId',
					isArray: false,
					responseType: 'json',
				},
				saveFavoriteSerie: {
					method: 'POST',
					url: API_URL + '/users/series/favorites',
					isArray: false,
					responseType: 'json',
				},
				deleteFavoriteSerie: {
					method: 'DELETE',
					url: API_URL + '/users/series/favorites/:favoriteSerieId',
					isArray: false,
					responseType: 'json',
				},
			}
		);
	}

	angular
		.module('core')
		.factory('UsersAPI', ['$resource', 'API_URL', UsersAPI]);
})();
(function () {
	'use strict';

	function VideoServersAPI($resource, API_URL) {
		return $resource(
			API_URL + '/videoServers/:id',
			{},
			{
				update: { method: 'PUT' },
				count: {
					method: 'GET',
					url: API_URL + '/videoServers/count',
					isArray: false,
					responseType: 'json',
				},
			}
		);
	}

	angular
		.module('core')
		.factory('VideoServersAPI', ['$resource', 'API_URL', VideoServersAPI]);
})();
(function () {
	'use strict';

	function VideosAPI($resource, API_URL) {
		return $resource(
			API_URL + '/videos/:id',
			{},
			{
				update: { method: 'PUT' },
				count: {
					method: 'GET',
					url: API_URL + '/videos/count',
					isArray: false,
					responseType: 'json',
				},
			}
		);
	}

	angular
		.module('core')
		.factory('VideosAPI', ['$resource', 'API_URL', VideosAPI]);
})();

(function () {
	'use strict';

	function VisitsAPI($resource, API_URL) {
		return $resource(
			API_URL + '/visits/:id',
			{},
			{
				update: { method: 'PUT' },
				count: {
					method: 'GET',
					url: API_URL + '/visits/count',
					isArray: false,
					responseType: 'json',
				},
			}
		);
	}

	angular
		.module('core')
		.factory('VisitsAPI', ['$resource', 'API_URL', VisitsAPI]);
})();

(function () {
	'use strict';

	function DownloadServersConfig($stateProvider) {
		$stateProvider.state('downloadServers', {
			url: '/download-servers',
			parent: 'admin',
			templateUrl: 'modules/core/views/general-catalog-main.client.view.html',
			controller: 'DownloadServersCtrl',
			resolve: {
				DownloadServersAPI: 'DownloadServersAPI',
				$q: '$q',
				downloadServers: function (DownloadServersAPI, $q) {
					return $q.all({
						total: DownloadServersAPI.count().$promise,
						items: DownloadServersAPI.query({
							filter: {
								limit: 20,
								skip: 0,
							},
						}).$promise,
					});
				},
			},
		});
	}

	angular
		.module('downloadServers')
		.config(['$stateProvider', DownloadServersConfig]);
})();

(function () {
	'use strict';

	function DownloadServersCtrl($scope, DownloadServersAPI, downloadServers) {
		var paginator = {
			page: 1,
			totalItems: downloadServers.total.count,
			pageSize: 20,
		};

		$scope.catalogOptions = {
			collection: downloadServers.items,
			ngResource: DownloadServersAPI,
			table: {
				headers: ['NOMBRE'],
				fieldNames: ['name'],
			},
			paginator: paginator,
			editionTpl: 'modules/core/views/general-edition-form.client.view.html',
		};
	}

	angular
		.module('downloadServers')
		.controller('DownloadServersCtrl', [
			'$scope',
			'DownloadServersAPI',
			'downloadServers',
			DownloadServersCtrl,
		]);
})();
(function () {
	'use strict';

	function FansubsConfig($stateProvider) {
		$stateProvider.state('fansubs', {
			url: '/fansubs',
			parent: 'admin',
			templateUrl: 'modules/core/views/general-catalog-main.client.view.html',
			controller: 'FansubsCtrl',
			resolve: {
				FansubsAPI: 'FansubsAPI',
				$q: '$q',
				fansubs: function (FansubsAPI, $q) {
					return $q.all({
						total: FansubsAPI.count().$promise,
						items: FansubsAPI.query({
							filter: {
								limit: 20,
								skip: 0,
							},
						}).$promise,
					});
				},
			},
		});
	}

	angular.module('fansubs').config(['$stateProvider', FansubsConfig]);
})();

(function () {
	'use strict';

	function FansubsCtrl($scope, FansubsAPI, fansubs) {
		var paginator = {
			page: 1,
			totalItems: fansubs.total.count,
			pageSize: 20,
		};

		$scope.catalogOptions = {
			collection: fansubs.items,
			ngResource: FansubsAPI,
			table: {
				headers: ['NOMBRE'],
				fieldNames: ['name'],
			},
			paginator: paginator,
			editionTpl: 'modules/core/views/general-edition-form.client.view.html',
		};
	}

	angular
		.module('fansubs')
		.controller('FansubsCtrl', [
			'$scope',
			'FansubsAPI',
			'fansubs',
			FansubsCtrl,
		]);
})();
(function () {
	'use strict';

	function FileTypesConfig($stateProvider) {
		$stateProvider.state('fileTypes', {
			url: '/file-types',
			parent: 'admin',
			templateUrl: 'modules/core/views/general-catalog-main.client.view.html',
			controller: 'FileTypesCtrl',
			resolve: {
				FileTypesAPI: 'FileTypesAPI',
				$q: '$q',
				fileTypes: function (FileTypesAPI, $q) {
					return $q.all({
						total: FileTypesAPI.count().$promise,
						items: FileTypesAPI.query({
							filter: {
								limit: 20,
								skip: 0,
							},
						}).$promise,
					});
				},
			},
		});
	}

	angular.module('fileTypes').config(['$stateProvider', FileTypesConfig]);
})();

(function () {
	'use strict';

	function FileTypesCtrl($scope, FileTypesAPI, fileTypes) {
		var paginator = {
			page: 1,
			totalItems: fileTypes.total.count,
			pageSize: 20,
		};

		$scope.catalogOptions = {
			collection: fileTypes.items,
			ngResource: FileTypesAPI,
			table: {
				headers: ['NOMBRE'],
				fieldNames: ['name'],
			},
			paginator: paginator,
			editionTpl: 'modules/core/views/general-edition-form.client.view.html',
		};
	}

	angular
		.module('fileTypes')
		.controller('FileTypesCtrl', [
			'$scope',
			'FileTypesAPI',
			'fileTypes',
			FileTypesCtrl,
		]);
})();
(function () {
	'use strict';

	function GenresConfig($stateProvider) {
		$stateProvider.state('genres', {
			url: '/genres',
			parent: 'admin',
			templateUrl: 'modules/core/views/general-catalog-main.client.view.html',
			controller: 'GenresCtrl',
			resolve: {
				GenresAPI: 'GenresAPI',
				$q: '$q',
				genres: function (GenresAPI, $q) {
					return $q.all({
						total: GenresAPI.count().$promise,
						items: GenresAPI.query({
							filter: {
								limit: 20,
								skip: 0,
							},
						}).$promise,
					});
				},
			},
		});
	}

	angular.module('genres').config(['$stateProvider', GenresConfig]);
})();

(function () {
	'use strict';

	function GenresCtrl($scope, GenresAPI, genres) {
		var paginator = {
			page: 1,
			totalItems: genres.total.count,
			pageSize: 20,
		};

		$scope.catalogOptions = {
			collection: genres.items,
			ngResource: GenresAPI,
			table: {
				headers: ['NOMBRE'],
				fieldNames: ['name'],
			},
			paginator: paginator,
			editionTpl: 'modules/core/views/general-edition-form.client.view.html',
		};
	}

	angular
		.module('genres')
		.controller('GenresCtrl', ['$scope', 'GenresAPI', 'genres', GenresCtrl]);
})();
(function () {
	'use strict';

	function HomeConfig($stateProvider) {
		$stateProvider.state('start', {
			url: '/inicio',
			parent: 'home',
			templateUrl: 'modules/home/views/home.client.view.html',
			controller: 'HomeCtrl',
		});
	}

	angular.module('home').config(['$stateProvider', HomeConfig]);
})();

(function () {
	'use strict';

	function HomeCtrl(
		$scope,
		AppConfig,
		EpisodesAPI,
		SeriesAPI,
		$q,
		$timeout,
		VisitsAPI
	) {
		AppConfig.setTitle();
		var _this = this;
		$scope.isContentLoaded = false;
		this.episodes = [];
		$scope.episodeDays = [];
		$scope.series = [];
		$scope.carouselSeries = [];
		$scope.loadingEpisodes = false;
		$scope.loadingSeries = false;

		$scope.owlOptions = {
			items: 1,
		};

		this.episodesFilter = {
			filter: {
				include: {
					relation: 'serie',
					scope: {
						fields: ['name'],
					},
				},
				limit: 48,
				skip: 0,
				order: 'createdAt DESC',
			},
		};

		this.seriesFilter = {
			filter: {
				fields: ['id', 'name', 'poster', 'type', 'createdAt'],
				limit: 18,
				skip: 0,
				order: 'id DESC',
			},
		};

		this.setEpisodeDays = function (episodeDays) {
			$scope.episodeDays.length = 0;
			episodeDays.forEach(function (episodeDay) {
				$scope.episodeDays.push(episodeDay);
			});
		};

		this.setSerieNameAsNameForEpisodes = function (episodes) {
			return episodes.map(function (episode) {
				if (episode.serie && episode.serie.name) {
					episode.name = episode.serie.name;
				}
				return episode;
			});
		};

		this.capitalize = function (stringValue) {
			return stringValue.replace(/\w\S*/g, function (txt) {
				return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			});
		};

		this.groupEpisodesByDay = function (episodes) {
			var episodesGroups = _.groupBy(episodes, function (episodes) {
				return moment(episodes.createdAt).startOf('day').format();
			});

			var episodeDays = _.map(episodesGroups, function (episodesGroup, day) {
				return {
					day: day,
					episodes: episodesGroup,
				};
			});

			episodeDays.forEach(function (groupDay) {
				groupDay.daysAgo = moment().diff(moment(groupDay.day), 'days');

				var otro = moment(groupDay.day).format('dddd D');
				var year = moment(groupDay.day).format('MMMM');
				groupDay.humanDate =
					_this.capitalize(otro) + ' de ' + _this.capitalize(year);
			});

			_this.setEpisodeDays(episodeDays);
		};

		$scope.fetchEpisodes = function () {
			if ($scope.loadingEpisodes) return;
			$scope.loadingEpisodes = true;

			var episodesPromise = EpisodesAPI.query(_this.episodesFilter).$promise;

			episodesPromise
				.then(function (episodes) {
					episodes = _this.setSerieNameAsNameForEpisodes(episodes);

					_this.episodesFilter.filter.skip += 20;

					if (_this.episodes.length) {
						episodes.forEach(function (episode) {
							_this.episodes.push(episode);
						});
					} else {
						_this.episodes = episodes;
					}

					_this.groupEpisodesByDay(_this.episodes);
				})
				.catch(function (err) {
					Materialize.toast('No se pudieron obtener episodios', 4000);
				})
				.finally(function () {
					$scope.loadingEpisodes = false;
				});

			return episodesPromise;
		};

		this.setSeries = function (series) {
			series.forEach(function (serie) {
				$scope.series.push(serie);
			});
		};

		$scope.fetchSeries = function () {
			if ($scope.loadingSeries) return;
			$scope.loadingSeries = true;

			SeriesAPI.query(_this.seriesFilter)
				.$promise.then(function (series) {
					_this.setSeries(series);
					_this.seriesFilter.filter.skip += 18;
				})
				.catch(function (err) {
					Materialize.toast('No se pudieron obtener series', 4000);
				})
				.finally(function (series, series2) {
					$scope.loadingSeries = false;
				});
		};

		this.getRandomNumberBetweenZeroAndTen = function () {
			return Math.floor(Math.random() * 7);
		};

		this.fetchCarouselSerie = function () {
			var carouselSeriesFilter = {
				filter: {
					fields: ['id', 'name', 'japaneseName', 'backgroundImage'],
					skip: _this.getRandomNumberBetweenZeroAndTen(),
					limit: 1,
					order: 'id DESC',
				},
			};

			var seriesPromise = SeriesAPI.query(carouselSeriesFilter).$promise;
			seriesPromise
				.then(function (carouselSeries) {
					carouselSeries.forEach(function (carouselSerie) {
						$scope.carouselSeries.push(carouselSerie);
					});
				})
				.catch(function (err) {
					Materialize.toast('No se pudo obtener serie random', 4000);
				});

			return seriesPromise;
		};

		this.fetchEpisodesAndCarouselToShowContent = function () {
			$q.all([$scope.fetchEpisodes(), _this.fetchCarouselSerie()]).finally(
				function () {
					$scope.isContentLoaded = true;
					_this.selectDefaultTab();
				}
			);
		};

		this.selectDefaultTab = function () {
			$timeout(function () {
				angular.element('.ab-tabs li:first a').click();
			});
		};

		this.saveUserVisit = function () {
			VisitsAPI.save({
				type: 'home',
				serieId: '',
				episodeId: '',
				username: '',
			});
		};

		this.fetchEpisodesAndCarouselToShowContent();
		$scope.fetchSeries();
		this.saveUserVisit();
	}

	angular
		.module('genres')
		.controller('HomeCtrl', [
			'$scope',
			'AppConfig',
			'EpisodesAPI',
			'SeriesAPI',
			'$q',
			'$timeout',
			'VisitsAPI',
			HomeCtrl,
		]);
})();
(function () {
	'use strict';

	function PrivacityConfig($stateProvider) {
		$stateProvider
			.state('terms-of-service', {
				url: '/terminos-de-servicio',
				parent: 'home',
				templateUrl:
					'modules/privacity/views/terms-of-service.client.view.html',
			})
			.state('privacity', {
				url: '/politica-de-privacidad',
				parent: 'home',
				templateUrl: 'modules/privacity/views/privacity.client.view.html',
			});
	}

	angular.module('privacity').config(['$stateProvider', PrivacityConfig]);
})();

(function () {
	'use strict';

	function QualitiesConfig($stateProvider) {
		$stateProvider.state('qualities', {
			url: '/qualities',
			parent: 'admin',
			templateUrl: 'modules/core/views/general-catalog-main.client.view.html',
			controller: 'QualitiesCtrl',
			resolve: {
				QualitiesAPI: 'QualitiesAPI',
				$q: '$q',
				qualities: function (QualitiesAPI, $q) {
					return $q.all({
						total: QualitiesAPI.count().$promise,
						items: QualitiesAPI.query({
							filter: {
								limit: 20,
								skip: 0,
							},
						}).$promise,
					});
				},
			},
		});
	}

	angular.module('qualities').config(['$stateProvider', QualitiesConfig]);
})();

(function () {
	'use strict';

	function QualitiesCtrl($scope, QualitiesAPI, qualities) {
		var paginator = {
			page: 1,
			totalItems: qualities.total.count,
			pageSize: 20,
		};

		$scope.catalogOptions = {
			collection: qualities.items,
			ngResource: QualitiesAPI,
			table: {
				headers: ['NOMBRE'],
				fieldNames: ['name'],
			},
			paginator: paginator,
			editionTpl: 'modules/core/views/general-edition-form.client.view.html',
		};
	}

	angular
		.module('qualities')
		.controller('QualitiesCtrl', [
			'$scope',
			'QualitiesAPI',
			'qualities',
			QualitiesCtrl,
		]);
})();
(function () {
	'use strict';

	function QuotesConfig($stateProvider) {
		$stateProvider
			.state('adminQuotes', {
				url: '/quotes',
				parent: 'admin',
				templateUrl: 'modules/core/views/general-catalog-main.client.view.html',
				controller: 'QuotesCtrl',
				resolve: {
					QuotesAPI: 'QuotesAPI',
					$q: '$q',
					quotes: function (QuotesAPI, $q) {
						return $q.all({
							total: QuotesAPI.count().$promise,
							items: QuotesAPI.query({
								filter: {
									include: 'character',
									limit: 20,
									skip: 0,
								},
							}).$promise,
						});
					},
				},
			})
			.state('quotesEdit', {
				url: '/quotes/:quoteId',
				parent: 'admin',
				templateUrl: 'modules/quotes/views/quotes-edition.client.view.html',
				controller: 'QuotesEditionCtrl',
				resolve: {
					QuotesAPI: 'QuotesAPI',
					quote: function (QuotesAPI, $stateParams) {
						return QuotesAPI.get({
							id: $stateParams.quoteId,
						}).$promise;
					},
				},
			});
	}

	angular.module('quotes').config(['$stateProvider', QuotesConfig]);
})();

(function () {
	'use strict';

	function QuotesEditionCtrl($scope, QuotesAPI, quote, $state) {
		var _this = this;
		$scope.quote = quote;

		$scope.save = function () {
			QuotesAPI.update({ id: $scope.quote.id }, $scope.quote)
				.$promise.then(function () {
					Materialize.toast('Cita actualizada exitosamente', 4000);
					$state.go('adminQuotes');
				})
				.catch(function () {
					Materialize.toast('Error al actualizar cita', 4000);
				});
		};
	}

	angular
		.module('quotes')
		.controller('QuotesEditionCtrl', [
			'$scope',
			'QuotesAPI',
			'quote',
			'$state',
			QuotesEditionCtrl,
		]);
})();
(function () {
	'use strict';

	function QuotesCtrl($scope, QuotesAPI, quotes) {
		var paginator = {
			page: 1,
			totalItems: quotes.total.count,
			pageSize: 20,
		};

		$scope.catalogOptions = {
			collection: quotes.items,
			ngResource: QuotesAPI,
			paginator: paginator,
			editionState: 'notExistentCreate', // Note: No se pueden crear citas desde admin, solo desde serie.
			customItemsTpl: 'modules/quotes/views/quotes-table.client.view.html',
			extendFilter: {
				include: 'character',
			},
		};
	}

	angular
		.module('quotes')
		.controller('QuotesCtrl', ['$scope', 'QuotesAPI', 'quotes', QuotesCtrl]);
})();
(function () {
	'use strict';

	function SeasonAiringConfig($stateProvider) {
		$stateProvider.state('seasonAiring', {
			url: '/en-emision',
			parent: 'home',
			templateUrl: 'modules/seasonAiring/views/season-airing.client.view.html',
			controller: 'SeasonAiringCtrl',
		});
	}

	angular.module('home').config(['$stateProvider', SeasonAiringConfig]);
})();

(function () {
	'use strict';

	function SeasonAiringCtrl($scope, AppConfig, SeriesAPI, $q, VisitsAPI) {
		AppConfig.setTitle('Temporadas');
		var _this = this;
		$scope.isContentLoaded = false;
		$scope.loadingSeasonSeries = false;
		$scope.series = [];
		this.currentSelectedSeason = {};

		$scope.fetchSeasonSeries = function () {
			if ($scope.loadingSeasonSeries) return;
			$scope.loadingSeasonSeries = true;

			var seasonSeriesPromise = SeriesAPI.query({
				filter: {
					fields: ['id', 'name', 'poster', 'type'],
					where: {
						year: _this.currentSelectedSeason.year,
						season: _this.currentSelectedSeason.season,
					},
					order: 'id DESC',
				},
			})
				.$promise.then(function (seasonSeries) {
					$scope.seasonSeries = seasonSeries;
				})
				.catch(function (err) {
					Materialize.toast('No se pudieron obtener series de temporada', 4000);
				})
				.finally(function () {
					$scope.loadingSeasonSeries = false;
				});

			return seasonSeriesPromise;
		};

		this.getSeasonInfoByMonthIndex = function (monthIndex) {
			var seasonName = '';
			var displayName = '';

			if (monthIndex > 8) {
				seasonName = 'autumn';
				displayName = 'Otoño';
			} else if (monthIndex > 5) {
				seasonName = 'summer';
				displayName = 'Verano';
			} else if (monthIndex > 2) {
				seasonName = 'spring';
				displayName = 'Primavera';
			} else {
				seasonName = 'winter';
				displayName = 'Invierno';
			}

			return {
				seasonName: seasonName,
				displayName: displayName,
			};
		};

		this.setCurrentSeason = function () {
			var currentDate = new Date();
			var currentYear = currentDate.getFullYear();
			var currentMonth = currentDate.getMonth();
			var seasonInfo = _this.getSeasonInfoByMonthIndex(currentMonth);

			_this.currentSelectedSeason = {
				year: currentYear,
				monthIndex: currentMonth,
				season: seasonInfo.seasonName,
				name: seasonInfo.displayName,
			};
		};

		this.fetchFavoriteSerie = function () {
			var favoriteSeriePromise = SeriesAPI.favoriteBySeason({
				year: _this.currentSelectedSeason.year,
				season: _this.currentSelectedSeason.season,
			})
				.$promise.then(function (favoriteSerie) {
					$scope.favoriteSerie = favoriteSerie;
				})
				.catch(function (err) {
					Materialize.toast('No se pudo obtener serie favorita', 4000);
				});

			return favoriteSeriePromise;
		};

		this.saveUserVisit = function () {
			VisitsAPI.save({
				type: 'season-airing',
				serieId: '',
				episodeId: '',
				username: '',
			});
		};

		this.fetchEpisodesAndCarouselToShowContent = function () {
			$q.all([$scope.fetchSeasonSeries(), _this.fetchFavoriteSerie()]).finally(
				function () {
					$scope.isContentLoaded = true;
				}
			);
		};

		this.setCurrentSeason();
		this.fetchEpisodesAndCarouselToShowContent();
		this.saveUserVisit();
	}

	angular
		.module('genres')
		.controller('SeasonAiringCtrl', [
			'$scope',
			'AppConfig',
			'SeriesAPI',
			'$q',
			'VisitsAPI',
			SeasonAiringCtrl,
		]);
})();
(function () {
	'use strict';

	function SeasonsConfig($stateProvider) {
		$stateProvider.state('seasons', {
			url: '/temporadas',
			parent: 'home',
			templateUrl: 'modules/seasons/views/seasons.client.view.html',
			controller: 'SeasonsCtrl',
		});
	}

	angular.module('home').config(['$stateProvider', SeasonsConfig]);
})();

(function () {
	'use strict';

	function SeasonsCtrl($scope, AppConfig, SeriesAPI, $q, VisitsAPI) {
		AppConfig.setTitle('Temporadas');
		var _this = this;
		$scope.isContentLoaded = false;
		$scope.loadingSeasonSeries = false;
		$scope.seasons = [];
		this.currentSelectedSeason = {};

		this.setSeason = function (seasonSeries) {
			var season = {
				name: _this.currentSelectedSeason.name,
				year: _this.currentSelectedSeason.year,
				series: seasonSeries,
			};
			$scope.seasons.push(season);
		};

		$scope.fetchSeasonSeries = function () {
			if ($scope.loadingSeasonSeries) return;
			$scope.loadingSeasonSeries = true;

			var seasonSeriesPromise = SeriesAPI.query({
				filter: {
					fields: ['id', 'name', 'poster', 'type'],
					where: {
						year: _this.currentSelectedSeason.year,
						season: _this.currentSelectedSeason.season,
					},
					order: 'id DESC',
				},
			})
				.$promise.then(function (seasonSeries) {
					_this.setSeason(seasonSeries);
				})
				.catch(function (err) {
					Materialize.toast('No se pudieron obtener series de temporada', 4000);
				})
				.finally(function () {
					$scope.loadingSeasonSeries = false;
				});

			return seasonSeriesPromise;
		};

		this.setCurrentSeason = function () {
			var currentDate = new Date();
			var currentYear = currentDate.getFullYear();
			var currentMonth = currentDate.getMonth();
			var seasonInfo = _this.getSeasonInfoByMonthIndex(currentMonth);

			_this.currentSelectedSeason = {
				year: currentYear,
				monthIndex: currentMonth,
				season: seasonInfo.seasonName,
				name: seasonInfo.displayName,
			};
		};

		this.setPrevousSeason = function () {
			if (_this.currentSelectedSeason.season === 'winter') {
				_this.currentSelectedSeason.season = 'autumn';
				_this.currentSelectedSeason.name = 'Otoño';
				_this.currentSelectedSeason.year--;
			} else if (_this.currentSelectedSeason.season === 'spring') {
				_this.currentSelectedSeason.season = 'winter';
				_this.currentSelectedSeason.name = 'Invierno';
			} else if (_this.currentSelectedSeason.season === 'summer') {
				_this.currentSelectedSeason.season = 'spring';
				_this.currentSelectedSeason.name = 'Primavera';
			} else if (_this.currentSelectedSeason.season === 'autumn') {
				_this.currentSelectedSeason.season = 'summer';
				_this.currentSelectedSeason.name = 'Verano';
			}
		};

		$scope.fetchPreviousSeason = function () {
			_this.setPrevousSeason();
			$scope.fetchSeasonSeries();
		};

		this.getSeasonInfoByMonthIndex = function (monthIndex) {
			var seasonName = '';
			var displayName = '';

			if (monthIndex > 8) {
				seasonName = 'autumn';
				displayName = 'Otoño';
			} else if (monthIndex > 5) {
				seasonName = 'summer';
				displayName = 'Verano';
			} else if (monthIndex > 2) {
				seasonName = 'spring';
				displayName = 'Primavera';
			} else {
				seasonName = 'winter';
				displayName = 'Invierno';
			}

			return {
				seasonName: seasonName,
				displayName: displayName,
			};
		};

		this.fetchFavoriteSerie = function () {
			var favoriteSeriePromise = SeriesAPI.favoriteBySeason({
				year: _this.currentSelectedSeason.year,
				season: _this.currentSelectedSeason.season,
			})
				.$promise.then(function (favoriteSerie) {
					$scope.favoriteSerie = favoriteSerie;
				})
				.catch(function (err) {
					Materialize.toast('No se pudo obtener serie favorita', 4000);
				});

			return favoriteSeriePromise;
		};

		this.saveUserVisit = function () {
			VisitsAPI.save({
				type: 'seasons',
				serieId: '',
				episodeId: '',
				username: '',
			});
		};

		this.fetchEpisodesAndCarouselToShowContent = function () {
			$q.all([$scope.fetchSeasonSeries(), _this.fetchFavoriteSerie()]).finally(
				function () {
					$scope.isContentLoaded = true;
				}
			);
		};

		this.setCurrentSeason();
		this.setPrevousSeason();
		this.fetchEpisodesAndCarouselToShowContent();
		this.saveUserVisit();
	}

	angular
		.module('genres')
		.controller('SeasonsCtrl', [
			'$scope',
			'AppConfig',
			'SeriesAPI',
			'$q',
			'VisitsAPI',
			SeasonsCtrl,
		]);
})();
('use strict');

angular.module('series').config([
	'$stateProvider',
	function ($stateProvider) {
		$stateProvider
			.state('admin', {
				url: '/admin',
				parent: 'home',
				templateUrl: 'modules/core/views/topbar-admin.client.view.html',
				controller: 'TopbarAdminCtrl',
			})
			.state('serie', {
				url: '/series/:serieId',
				parent: 'home',
				templateUrl: 'modules/series/views/serie-main.client.view.html',
				controller: 'SerieCtrl',
			})
			.state('watchEpisode', {
				url: '/episodios/:episodeId/ver',
				parent: 'home',
				templateUrl: 'modules/series/views/watch-episode-main.client.view.html',
				controller: 'WatchEpisodeCtrl',
			})
			.state('adminSeries', {
				url: '/series',
				parent: 'admin',
				templateUrl: 'modules/core/views/general-catalog-main.client.view.html',
				controller: 'AnimesCtrl',
				resolve: {
					SeriesAPI: 'SeriesAPI',
					$q: '$q',
					series: function (SeriesAPI, $q) {
						return $q.all({
							total: SeriesAPI.count().$promise,
							items: SeriesAPI.query({
								filter: {
									include: 'studio',
									limit: 20,
									skip: 0,
									order: 'createdAt DESC',
								},
							}).$promise,
						});
					},
				},
			})
			.state('animesCreate', {
				url: '/series/crear',
				parent: 'admin',
				// menuOption: 'cellphones',
				// appTitle: 'Marcas',
				templateUrl: 'modules/series/views/animes-edition.client.view.html',
				controller: 'AnimesEditionCtrl',
				resolve: {
					GenresAPI: 'GenresAPI',
					StudiosAPI: 'StudiosAPI',
					serie: function () {
						return {
							episodes: [],
						};
					},
					genres: function (GenresAPI, $q) {
						return GenresAPI.query({}).$promise;
					},
					studios: function (StudiosAPI, $q) {
						return StudiosAPI.query({}).$promise;
					},
				},
			})
			.state('animesEdit', {
				url: '/series/:serieId',
				parent: 'admin',
				// menuOption: 'cellphones',
				// appTitle: 'Marcas',
				templateUrl: 'modules/series/views/animes-edition.client.view.html',
				controller: 'AnimesEditionCtrl',
				resolve: {
					SeriesAPI: 'SeriesAPI',
					GenresAPI: 'GenresAPI',
					StudiosAPI: 'StudiosAPI',
					$q: '$q',
					serie: function (SeriesAPI, $stateParams) {
						return SeriesAPI.get({
							id: $stateParams.serieId,
						}).$promise;
					},
					genres: function (GenresAPI, $q) {
						return GenresAPI.query({}).$promise;
					},
					studios: function (StudiosAPI, $q) {
						return StudiosAPI.query({}).$promise;
					},
				},
			})
			.state('episodesEdition', {
				url: '/series/:serieId/episodios',
				parent: 'admin',
				// menuOption: 'cellphones',
				// appTitle: 'Marcas',
				templateUrl: 'modules/series/views/episodes-edition.client.view.html',
				controller: 'EpisodesEditionCtrl',
				resolve: {
					SeriesAPI: 'SeriesAPI',
					serie: function (SeriesAPI, $stateParams) {
						return SeriesAPI.get({
							id: $stateParams.serieId,
							filter: {
								fields: ['id', 'name'],
								include: {
									relation: 'episodes',
									scope: {
										order: 'number ASC',
										include: [
											{
												relation: 'downloads',
												scope: {
													include: [
														'quality',
														'fansub',
														'downloadServer',
														'fileType',
													],
												},
											},
											{
												relation: 'videos',
												scope: {
													include: ['videoServer'],
												},
											},
										],
									},
								},
							},
						}).$promise;
					},
					fansubs: function (FansubsAPI, $q) {
						return FansubsAPI.query({}).$promise;
					},
					qualities: function (QualitiesAPI, $q) {
						return QualitiesAPI.query({}).$promise;
					},
					downloadServers: function (DownloadServersAPI, $q) {
						return DownloadServersAPI.query({}).$promise;
					},
					videoServers: function (VideoServersAPI, $q) {
						return VideoServersAPI.query({}).$promise;
					},
					fileTypes: function (FileTypesAPI, $q) {
						return FileTypesAPI.query({}).$promise;
					},
				},
			})
			.state('charactersEdition', {
				url: '/series/:serieId/personajes',
				parent: 'admin',
				// menuOption: 'cellphones',
				// appTitle: 'Marcas',
				templateUrl: 'modules/series/views/characters-edition.client.view.html',
				controller: 'CharactersEditionCtrl',
				resolve: {
					SeriesAPI: 'SeriesAPI',
					serie: function (SeriesAPI, $stateParams) {
						return SeriesAPI.get({
							id: $stateParams.serieId,
							filter: {
								fields: ['id', 'name'],
								include: 'characters',
							},
						}).$promise;
					},
				},
			});
	},
]);
(function () {
	'use strict';

	function AnimesEditionCtrl(
		$scope,
		SeriesAPI,
		serie,
		genres,
		studios,
		$state
	) {
		var _this = this;

		/* Initial configuration */

		this.fixValuesToCompare = function () {
			if (serie.year) serie.year = serie.year.toString();
			if (serie.chaptersNumber)
				serie.chaptersNumber = serie.chaptersNumber.toString();
		};

		this.fixValuesToCompare(serie);

		this.getOriginals = function (serie) {
			var originalSerieTemp = angular.copy(serie);
			this.originalSerie = _.omit(originalSerieTemp, ['episodes']);
		};

		this.getOriginals(serie);

		this.setDefaultValues = function (serie) {
			serie.type = 'serie';

			var currentDate = new Date();
			serie.year = currentDate.getFullYear().toString();
			var currentMonth = currentDate.getMonth();

			if (currentMonth > 8) serie.season = 'autumn';
			else if (currentMonth > 5) serie.season = 'summer';
			else if (currentMonth > 2) serie.season = 'spring';
			else serie.season = 'winter';

			serie.status = 'ongoing';
		};

		if (!serie.id) {
			this.setDefaultValues(serie);
		}

		$scope.studios = studios;

		$scope.options = {
			years: [
				'2000',
				'2001',
				'2002',
				'2003',
				'2004',
				'2005',
				'2006',
				'2007',
				'2008',
				'2009',
				'2010',
				'2011',
				'2012',
				'2013',
				'2014',
				'2015',
				'2016',
				'2017',
				'2018',
				'2019',
				'2020',
			],
		};

		$scope.serie = serie;

		/* Initial configuration end */

		/* Save/update serie */

		$scope.save = function () {
			if (!$scope.serie.id) {
				_this.saveSerie();
			} else {
				if (angular.equals(_this.originalSerie, $scope.serie)) {
					Materialize.toast('Serie no requiere actualizarse', 4000);
					_this.beforeSaveSerie();
				} else {
					_this.updateSerie();
				}
			}
		};

		this.saveSerie = function () {
			SeriesAPI.save($scope.serie)
				.$promise.then(function (serie) {
					$scope.serie = serie;
					Materialize.toast('Serie creada exitosamente', 4000);
					$state.go('episodesEdition', { serieId: serie.id });
				})
				.catch(function () {
					Materialize.toast('Error al guardar serie', 4000);
				});
		};

		this.updateSerie = function () {
			SeriesAPI.update({ id: $scope.serie.id }, $scope.serie)
				.$promise.then(function (updatedSerie) {
					Materialize.toast('Serie actualizada exitosamente', 4000);
					_this.beforeSaveSerie();
				})
				.catch(function () {
					Materialize.toast('Error al actualizar serie', 4000);
				});
		};

		this.beforeSaveSerie = function () {
			$state.go('adminSeries');
		};

		/* Save/update serie end */

		/* Genres behavior */

		this.setGenresBehavior = function () {
			$scope.searchInputTranslations = {
				reset: 'Limpiar',
				search: 'Buscar...',
				nothingSelected: '',
			};
			$scope.genres = genres;
			$scope.selectedGenres = [];
			$scope.genres.forEach(function (genre) {
				genre.isChecked = false;
			});

			if ($scope.serie.genres) {
				$scope.serie.genres.forEach(function (genreName) {
					var idx = _.findIndex(genres, function (genre) {
						return genre.name === genreName;
					});
					if (idx !== -1) genres[idx].isChecked = true;
				});
			}

			$scope.onGenreChange = function () {
				if (_.isArray($scope.serie.genres)) $scope.serie.genres.lenght = 0;
				else $scope.serie.genres = [];

				$scope.serie.genres = $scope.selectedGenres.map(function (genre) {
					return genre.name;
				});
			};
		};

		this.setGenresBehavior();

		/* Genres behavior end */

		/* Group selector behavior */

		$scope.groupSelectorOptions = {};
		$scope.triggerSearchOnChange = false;

		$scope.onGroupChange = function () {
			$scope.groupSelectorOptions.groupId = angular.copy($scope.serie.groupId);
			if ($scope.groupSelectorOptions.groupId) {
				$scope.triggerSearchOnChange = !$scope.triggerSearchOnChange;
			}

			if (!_this.groupSelectorModal) {
				_this.groupSelectorModal = angular.element('#group-selector-modal');
				_this.groupSelectorModal.modal();
			}

			_this.groupSelectorModal.modal('open');
		};

		$scope.onGroupIdSelected = function (groupId) {
			$scope.serie.groupId = groupId;
			_this.groupSelectorModal.modal('close');
		};

		/* Group selector behavior end */
	}

	angular
		.module('series')
		.controller('AnimesEditionCtrl', [
			'$scope',
			'SeriesAPI',
			'serie',
			'genres',
			'studios',
			'$state',
			AnimesEditionCtrl,
		]);
})();
(function () {
	'use strict';

	function AnimesCtrl($scope, SeriesAPI, series) {
		var paginator = {
			page: 1,
			totalItems: series.total.count,
			pageSize: 20,
		};

		$scope.catalogOptions = {
			collection: series.items,
			ngResource: SeriesAPI,
			paginator: paginator,
			editionState: 'animesCreate',
			customItemsTpl: 'modules/series/views/animes-table.client.view.html',
			extendFilter: {
				include: 'studio',
				order: 'createdAt DESC',
			},
		};
	}

	angular
		.module('series')
		.controller('AnimesCtrl', ['$scope', 'SeriesAPI', 'series', AnimesCtrl]);
})();

(function () {
	'use strict';

	function CharactersEditionCtrl($scope, CharactersAPI, serie) {
		/* Configuración inicial */

		var _this = this;
		this.characterEditionModal = null;

		this.getOriginals = function (serie) {
			$scope.characters = angular.copy(serie.characters);
			$scope.serieName = serie.name;
			$scope.serieId = serie.id;
		};

		this.getOriginals(serie);

		/* Configuración inicial fin */

		/* Cambios en episodios */

		$scope.onAddOrUpdateCharacter = function (character) {
			if (character) {
				$scope.selectedCharacter = angular.copy(character);
			} else {
				$scope.selectedCharacter = {
					name: '',
					image: '',
					serieId: $scope.serieId,
				};
			}

			if (!_this.characterEditionModal) {
				_this.characterEditionModal = angular.element(
					'#character-edition-modal'
				);
				_this.characterEditionModal.modal();
			}
			_this.characterEditionModal.modal('open');
		};

		$scope.onDeleteCharacter = function (character, index) {
			_this.characterIdToDelete = character.id;
			_this.characterIndexToDelete = index;

			if (!_this.characterDeletionModal) {
				_this.characterDeletionModal = angular.element(
					'#character-deletion-modal'
				);
				_this.characterDeletionModal.modal();
			}

			_this.characterDeletionModal.modal('open');
		};

		$scope.deleteCharacter = function () {
			_this
				.deleteCharacter(_this.characterIdToDelete)
				.then(function () {
					$scope.characters.splice(_this.characterIndexToDelete, 1);
					_this.characterDeletionModal.modal('close');
					Materialize.toast('Personaje eliminado exitosamente', 4000);
				})
				.catch(function (err) {
					Materialize.toast('Error al eliminar personaje', 4000);
				});
		};

		/* sub: api calls */

		this.createCharacter = function (character) {
			return CharactersAPI.save(character).$promise;
		};

		this.deleteCharacter = function (characterId) {
			return CharactersAPI.delete({
				id: characterId,
			}).$promise;
		};

		this.updateCharacter = function (character) {
			return CharactersAPI.update(
				{
					id: character.id,
				},
				character
			).$promise;
		};

		/* sub: api calls end */

		this.caseCreateCharacter = function () {
			_this
				.createCharacter($scope.selectedCharacter)
				.then(function (savedCharacter) {
					$scope.characters.push(savedCharacter);
					_this.characterEditionModal.modal('close');
					Materialize.toast('Personaje guardado con éxito', 4000);
				})
				.catch(function () {
					Materialize.toast('Error al guardar personaje', 4000);
				});
		};

		this.caseUpdateCharacter = function () {
			_this
				.updateCharacter($scope.selectedCharacter)
				.then(function (updatedCharacter) {
					var characterIndex = _.findIndex($scope.characters, {
						id: updatedCharacter.id,
					});
					$scope.characters[characterIndex] = updatedCharacter;
					_this.characterEditionModal.modal('close');
					Materialize.toast('Personaje actualizado exitosamente', 4000);
				})
				.catch(function (err) {
					Materialize.toast('Error al actualizar personaje', 4000);
				});
		};

		$scope.onSaveCharacter = function () {
			if ($scope.selectedCharacter.id) {
				_this.caseUpdateCharacter();
			} else {
				_this.caseCreateCharacter();
			}
		};
	}

	angular
		.module('series')
		.controller('CharactersEditionCtrl', [
			'$scope',
			'CharactersAPI',
			'serie',
			CharactersEditionCtrl,
		]);
})();
(function () {
	'use strict';

	function EpisodesEditionCtrl(
		$scope,
		$rootScope,
		$q,
		SeriesAPI,
		EpisodesAPI,
		DownloadsAPI,
		VideosAPI,
		serie,
		fansubs,
		qualities,
		downloadServers,
		videoServers,
		fileTypes,
		$state
	) {
		/* Configuración inicial */

		var _this = this;
		this.episodeEditionModal = null;
		$scope.episodesQualities = [];
		$scope.showQualities = false;
		$scope.fansubs = fansubs;
		$scope.qualities = qualities;
		$scope.downloadServers = downloadServers;
		$scope.videoServers = videoServers;
		$scope.fileTypes = fileTypes;

		$scope.toggleQualities = function () {
			$scope.showQualities = !$scope.showQualities;
		};

		this.transformEpisodesNumberIntoStringToCompare = function (serie) {
			serie.episodes.forEach(function (episode) {
				episode.number = episode.number + '';
			});
		};

		this.transformEpisodesNumberIntoStringToCompare(serie);

		this.getOriginals = function (serie) {
			$scope.episodes = angular.copy(serie.episodes);
			$scope.serieName = serie.name;
			$scope.serieId = serie.id;
		};

		this.getOriginals(serie);

		this.getEpisodesQualities = function (episodes) {
			episodes.forEach(function (episode) {
				episode.downloads.forEach(function (download) {
					var episodeQuality = {
						qualityId: download.qualityId,
						qualityName: download.quality.name,
						fansubId: download.fansubId,
						fansubName: download.fansub.name,
						fileTypeId: download.fileTypeId,
						fileTypeName: download.fileType.name,
						mbs: download.mbs,
					};

					if (!_.findWhere($scope.episodesQualities, episodeQuality)) {
						$scope.episodesQualities.push(episodeQuality);
					}
				});
			});
		};

		this.getEpisodesQualities(serie.episodes);

		/* Configuración inicial fin */

		/* Cambios en episodios */

		this.episodeAttributes = ['id', 'name', 'number', 'image', 'serieId'];

		$scope.onAddOrUpdateEpisode = function (episode) {
			if (episode) {
				$scope.selectedEpisode = angular.copy(episode);
				_this.originalEpisode = _.pick(episode, _this.episodeAttributes);
				_this.originalDownloads = angular.copy(episode.downloads);
				_this.originalVideos = angular.copy(episode.videos);
			} else {
				$scope.selectedEpisode = {
					name: '',
					number: _.isEmpty($scope.episodes)
						? 1
						: parseInt(parseInt(_.last($scope.episodes).number) + 1),
					image: '',
					serieId: $scope.serieId,
					downloads: [],
					videos: [],
				};
			}

			if (!_this.episodeEditionModal) {
				_this.episodeEditionModal = angular.element('#episode-edition-modal');
				_this.episodeEditionModal.modal();
			}
			_this.episodeEditionModal.modal('open');
		};

		$scope.onDeleteEpisode = function (episode, index) {
			_this.episodeIdToDelete = episode.id;
			_this.episodeIndexToDelete = index;

			if (!_this.episodeDeletionModal) {
				_this.episodeDeletionModal = angular.element('#episode-deletion-modal');
				_this.episodeDeletionModal.modal();
			}

			_this.episodeDeletionModal.modal('open');
		};

		$scope.deleteEpisode = function () {
			_this
				.deleteEpisode(_this.episodeIdToDelete)
				.then(function () {
					$scope.episodes.splice(_this.episodeIndexToDelete, 1);
					_this.episodeDeletionModal.modal('close');
					Materialize.toast('Episodio eliminado exitosamente', 4000);
				})
				.catch(function (err) {
					Materialize.toast('Error al eliminar episodio', 4000);
				});
		};

		/* sub: api calls */

		this.createEpisode = function (episode) {
			return EpisodesAPI.save(episode).$promise;
		};

		this.deleteEpisode = function (episodeId) {
			return EpisodesAPI.delete({
				id: episodeId,
			}).$promise;
		};

		this.updateEpisode = function (episode) {
			return EpisodesAPI.update(
				{
					id: episode.id,
				},
				episode
			).$promise;
		};

		this.createDownload = function (download) {
			return DownloadsAPI.save(download).$promise;
		};

		this.updateDownload = function (download) {
			return DownloadsAPI.update(
				{
					id: download.id,
				},
				download
			).$promise;
		};

		this.deleteDownload = function (downloadId) {
			return DownloadsAPI.delete({
				id: downloadId,
			}).$promise;
		};

		this.createVideo = function (video) {
			return VideosAPI.save(video).$promise;
		};

		this.updateVideo = function (video) {
			return VideosAPI.update(
				{
					id: video.id,
				},
				video
			).$promise;
		};

		this.deleteVideo = function (videoId) {
			return VideosAPI.delete({
				id: videoId,
			}).$promise;
		};

		/* sub: api calls end */

		this.caseCreateEpisode = function () {
			var episode = _.pick($scope.selectedEpisode, _this.episodeAttributes);
			var downloads = $scope.selectedEpisode.downloads;
			var videos = $scope.selectedEpisode.videos;

			_this
				.createEpisode(episode)
				.then(function (savedEpisode) {
					if (downloads.length || videos.length) {
						var promises = [];
						var videoPromises = [];

						downloads.forEach(function (download) {
							download.episodeId = savedEpisode.id;
							promises.push(_this.createDownload(download));
						});

						videos.forEach(function (video) {
							video.episodeId = savedEpisode.id;
							videoPromises.push(_this.createVideo(video));
						});

						$q.all([$q.all(promises), $q.all(videoPromises)])
							.then(function (response) {
								var savedDownloads = response[0];
								var savedVideos = response[1];
								savedEpisode.downloads = savedDownloads;
								savedEpisode.videos = savedVideos;
								$scope.episodes.push(savedEpisode);
								_this.episodeEditionModal.modal('close');
								Materialize.toast('Episodio guardado con éxito', 4000);
							})
							.catch(function (err) {
								Materialize.toast(
									'Se guardó episodio, pero falló al guardar descargas/videos, intente nuevamente',
									8000
								);
								$state.reload();
							});
					} else {
						$scope.episodes.push(savedEpisode);
						_this.episodeEditionModal.modal('close');
						Materialize.toast('Episodio guardado con éxito', 4000);
					}
				})
				.catch(function () {
					Materialize.toast('Error al guardar episodio', 4000);
				});
		};

		this.delupsertDownloads = function (downloads, originalDownloads) {
			var defered = $q.defer();
			var promise = defered.promise;

			var promises = [];
			var promisesOfDeleteds = [];

			downloads.forEach(function (download) {
				if (_.has(download, 'id')) {
					promises.push(_this.updateDownload(download));
				} else {
					promises.push(_this.createDownload(download));
				}
			});

			var episodesToDelete = _.filter(
				originalDownloads,
				function (originalDownload) {
					return !_.findWhere(downloads, { id: originalDownload.id });
				}
			);

			episodesToDelete.forEach(function (download) {
				promisesOfDeleteds.push(_this.deleteDownload(download.id));
			});

			$q.all(promisesOfDeleteds)
				.then(function () {
					$q.all(promises).then(defered.resolve).catch(defered.reject);
				})
				.catch(defered.reject);

			return promise;
		};

		this.delupsertVideos = function (videos, originalVideos) {
			var defered = $q.defer();
			var promise = defered.promise;

			var promises = [];
			var promisesOfDeleteds = [];

			videos.forEach(function (video) {
				if (_.has(video, 'id')) {
					promises.push(_this.updateVideo(video));
				} else {
					promises.push(_this.createVideo(video));
				}
			});

			var videosToDelete = _.filter(originalVideos, function (originalVideo) {
				return !_.findWhere(videos, { id: originalVideo.id });
			});

			videosToDelete.forEach(function (video) {
				promisesOfDeleteds.push(_this.deleteVideo(video.id));
			});

			$q.all(promisesOfDeleteds)
				.then(function () {
					$q.all(promises).then(defered.resolve).catch(defered.reject);
				})
				.catch(defered.reject);

			return promise;
		};

		this.validateDownloadsChangesOfEpisode = function (
			episode,
			downloads,
			videos
		) {
			var originalDownloads = _this.originalDownloads;
			var originalVideos = _this.originalVideos;

			downloads = downloads.map(function (download) {
				download.episodeId = episode.id;
				return download;
			});

			videos = videos.map(function (video) {
				video.episodeId = episode.id;
				return video;
			});

			$q.all([
				_this.delupsertDownloads(downloads, originalDownloads),
				_this.delupsertVideos(videos, originalVideos),
			])
				.then(function (response) {
					var upsertedDownloads = response[0];
					var upsertedVideos = response[1];
					Materialize.toast('Episodio actualizado exitosamente', 4000);

					episode.downloads = upsertedDownloads;
					episode.videos = upsertedVideos;
					var episodeIndex = _.findIndex($scope.episodes, { id: episode.id });
					$scope.episodes[episodeIndex] = episode;
					_this.episodeEditionModal.modal('close');
				})
				.catch(function (err) {
					Materialize.toast(
						'Se actualizó episodio, pero falló al actualizar descargas/videos, intente nuevamente',
						8000
					);
					$state.reload();
				});
		};

		this.caseUpdateEpisode = function () {
			var episode = _.pick($scope.selectedEpisode, _this.episodeAttributes);

			if (_.isEqual(episode, _this.originalEpisode)) {
				_this.validateDownloadsChangesOfEpisode(
					$scope.selectedEpisode,
					$scope.selectedEpisode.downloads,
					$scope.selectedEpisode.videos
				);
			} else {
				_this
					.updateEpisode(episode)
					.then(function (updatedEpisode) {
						_this.validateDownloadsChangesOfEpisode(
							updatedEpisode,
							$scope.selectedEpisode.downloads,
							$scope.selectedEpisode.videos
						);
					})
					.catch(function (err) {
						Materialize.toast('Error al actualizar episodio', 4000);
					});
			}
		};

		$scope.onSaveEpisode = function () {
			if ($scope.selectedEpisode.id) {
				_this.caseUpdateEpisode();
			} else {
				_this.caseCreateEpisode();
			}
		};

		$scope.addDownload = function () {
			$scope.selectedEpisode.downloads.push({});
		};
		$scope.removeDownload = function (index) {
			$scope.selectedEpisode.downloads.splice(index, 1);
		};

		/*TODO:
      -Agregar loading en modal cuando haga peticiones
      -Hacer funciones puras (que no trabajen conel scope, sino solo con lo que se le mande)
    */

		$scope.addVideo = function (videosOfEpisode) {
			$scope.selectedEpisode.videos.push({});
		};

		$scope.removeVideo = function (index) {
			$scope.selectedEpisode.videos.splice(index, 1);
		};
	}

	angular
		.module('series')
		.controller('EpisodesEditionCtrl', [
			'$scope',
			'$rootScope',
			'$q',
			'SeriesAPI',
			'EpisodesAPI',
			'DownloadsAPI',
			'VideosAPI',
			'serie',
			'fansubs',
			'qualities',
			'downloadServers',
			'videoServers',
			'fileTypes',
			'$state',
			EpisodesEditionCtrl,
		]);
})();
(function () {
	'use strict';

	function SerieCtrl(
		$scope,
		$state,
		$rootScope,
		AppConfig,
		UsersAPI,
		SeriesAPI,
		$stateParams,
		$timeout,
		Authentication,
		CharactersAPI,
		QuotesAPI,
		ReactionsAPI,
		SeriesNEWAPI,
		UsersNEWAPI,
		VisitsAPI
	) {
		var _this = this;
		$scope.newQuote = {};
		$scope.userReaction = {};
		$scope.userSerieRate = null;
		$scope.currentUserId = null;
		$scope.isContentLoaded = false;
		$scope.hideMainContent = false;

		$scope.reactionsLoaded = false;

		$scope.relatedSeries = [];
		$scope.owlOptions = {
			items: 4,
			responsive: {
				0: {
					items: 1,
				},
				300: {
					items: 2,
				},
				600: {
					items: 3,
				},
				1000: {
					items: 4,
				},
			},
		};
		$scope.statuses = [
			{
				name: 'Viendo',
				identifier: 'watching',
			},
			{
				name: 'Terminada',
				identifier: 'completed',
			},
			{
				name: 'En espera',
				identifier: 'onHold',
			},
			{
				name: 'Por ver',
				identifier: 'planToWatch',
			},
			{
				name: 'Abandonada',
				identifier: 'drop',
			},
		];

		// rate serie

		$scope.showRateModal = function () {
			if (!_this.isUserLogged()) {
				$rootScope.$emit('action:require:loged:user');
				return;
			}

			if (!_this.userRateModal) {
				_this.userRateModal = angular.element('#serie-rate-modal');
				_this.userRateModal.modal();
			}

			_this.userRateModal.modal('open');
		};

		$scope.onChangeSerieRate = function (rateType) {
			if (_this.updatingSerieRate) return;
			_this.updatingSerieRate = true;

			UsersNEWAPI.createSerieRate(
				{
					serieId: $scope.serie.id,
				},
				{
					rate: rateType,
				}
			)
				.$promise.then(function (rate) {
					$scope.userSerieRate = rate;
					_this.userRateModal.modal('close');
					Materialize.toast('Serie calificada', 4000);
				})
				.catch(function (err) {
					Materialize.toast('Error al actualizar calificación', 4000);
				})
				.finally(function () {
					_this.updatingSerieRate = false;
				});
		};

		$scope.onDeleteSerieRate = function () {
			if (_this.updatingSerieRate) return;
			_this.updatingSerieRate = true;

			UsersNEWAPI.deleteSerieRate({
				serieId: $scope.serie.id,
			})
				.$promise.then(function (rate) {
					$scope.userSerieRate = null;
					_this.userRateModal.modal('close');
					Materialize.toast('Calificación eliminada', 4000);
				})
				.catch(function (err) {
					Materialize.toast('Error al eliminar calificación', 4000);
				})
				.finally(function () {
					_this.updatingSerieRate = false;
				});
		};

		// rate serie end

		// top-interactions seccion

		$scope.onCreateReactionFavorite = function (reactionId) {
			if (!_this.isUserLogged()) {
				$rootScope.$emit('action:require:loged:user');
				return;
			}

			var reactionFavorite = {};
			var createReactionFavoritePromise = UsersNEWAPI.createReactionFavorite(
				{
					reactionId: reactionId,
				},
				{}
			).$promise;

			return createReactionFavoritePromise;
		};

		$scope.onDeleteReactionFavorite = function (reactionId) {
			var reactionFavorite = {};
			var deleteReactionFavoritePromise = UsersNEWAPI.deleteReactionFavorite(
				{
					reactionId: reactionId,
				},
				{}
			).$promise;

			return deleteReactionFavoritePromise;
		};

		$scope.onCreateQuoteFavorite = function (quoteId) {
			if (!_this.isUserLogged()) {
				$rootScope.$emit('action:require:loged:user');
				return;
			}

			var reactionFavorite = {};
			var createQuoteFavoritePromise = UsersNEWAPI.createQuoteFavorite(
				{
					quoteId: quoteId,
				},
				{}
			).$promise;

			return createQuoteFavoritePromise;
		};

		$scope.onDeleteQuoteFavorite = function (quoteId) {
			var reactionFavorite = {};
			var deleteQuoteFavoritePromise = UsersNEWAPI.deleteQuoteFavorite(
				{
					quoteId: quoteId,
				},
				{}
			).$promise;

			return deleteQuoteFavoritePromise;
		};

		// top-interactions seccion end

		$scope.toggleContent = function () {
			$scope.hideMainContent = !$scope.hideMainContent;
		};

		$scope.fetchCharacters = function () {
			if (_this.charactersLoaded) return;
			_this.charactersLoaded = true;

			CharactersAPI.query({
				filter: {
					where: {
						serieId: $scope.serie.id,
					},
				},
			})
				.$promise.then(function (characters) {
					$scope.characters = characters;
				})
				.catch(function () {
					Materialize.toast('No se pudieron obtener personajes', 3000);
				});
		};

		$scope.fetchQuotes = function () {
			if (_this.QuotesLoaded) return;
			_this.QuotesLoaded = true;

			QuotesAPI.query({
				filter: {
					where: {
						serieId: $scope.serie.id,
					},
					include: ['character', 'favorites'],
				},
			})
				.$promise.then(function (quotes) {
					$scope.quotes = quotes;
				})
				.catch(function () {
					Materialize.toast('No se pudieron obtener citas', 3000);
				});
		};

		$scope.fetchReactions = function () {
			if (_this.reactionsLoaded) return;
			_this.reactionsLoaded = true;

			ReactionsAPI.query({
				filter: {
					where: {
						serieId: $scope.serie.id,
					},
					include: 'favorites',
				},
			})
				.$promise.then(_this.onFetchReactionsSuccess)
				.catch(function () {
					Materialize.toast('No se pudieron obtener reacciones', 3000);
				});
		};

		this.onFetchReactionsSuccess = function (reactions) {
			$scope.reactions = reactions;
			if (!_this.isUserLogged()) {
				$scope.reactionsLoaded = true;
				return;
			}
			var userId = Authentication.user.id;
			var userReaction = _.findWhere($scope.reactions, { userId: userId });
			if (userReaction) $scope.userReaction = angular.copy(userReaction);
			$scope.reactionsLoaded = true;
		};

		$scope.onNewQuote = function () {
			if (!_this.isUserLogged()) {
				$rootScope.$emit('action:require:loged:user');
				return;
			}

			if (!$scope.characters) {
				$scope.fetchCharacters();
			}

			if (!_this.episodeDeletionModal) {
				_this.newQuoteModal = angular.element('#serie-new-quote-modal');
				_this.newQuoteModal.modal();
			}

			_this.newQuoteModal.modal('open');
		};

		$scope.onUserReaction = function () {
			if (!_this.isUserLogged()) {
				$rootScope.$emit('action:require:loged:user');
				return;
			}

			if (!_this.userReactionModal) {
				_this.userReactionModal = angular.element('#serie-reaction-modal');
				_this.userReactionModal.modal();
			}

			_this.userReactionModal.modal('open');
		};

		$scope.onSaveReaction = function () {
			if (_this.updatingReaction) return;
			_this.updatingReaction = true;

			// Note: Create case
			if (!$scope.userReaction.id) {
				$scope.userReaction.serieId = $scope.serie.id;

				ReactionsAPI.save($scope.userReaction)
					.$promise.then(function (userReaction) {
						$scope.userReaction = angular.copy(userReaction);
						$scope.reactions.unshift(userReaction);
						_this.userReactionModal.modal('close');
						Materialize.toast('Reacción creada', 4000);
					})
					.catch(function (err) {
						Materialize.toast('Error al crear reacción', 4000);
					})
					.finally(function () {
						_this.updatingReaction = false;
					});
			}
			// Note: Update case
			else {
				ReactionsAPI.update({ id: $scope.userReaction.id }, $scope.userReaction)
					.$promise.then(function (updateReaction) {
						var reactionIndex = _.findIndex($scope.reactions, {
							id: updateReaction.id,
						});
						$scope.reactions[reactionIndex] = updateReaction;
						_this.userReactionModal.modal('close');
						Materialize.toast('Reacción actualizada', 4000);
					})
					.catch(function (err) {
						Materialize.toast('Error al actualizar reacción', 4000);
					})
					.finally(function () {
						_this.updatingReaction = false;
					});
			}
		};

		$scope.onDeleteUserReaction = function () {
			if (!_this.deleteReactionModal) {
				_this.deleteReactionModal = angular.element(
					'#serie-delete-reaction-modal'
				);
				_this.deleteReactionModal.modal();
			}

			_this.deleteReactionModal.modal('open');
		};

		$scope.deleteReaction = function () {
			if (_this.deletingReaction) return;
			_this.deletingReaction = true;

			ReactionsAPI.delete({
				id: $scope.userReaction.id,
			})
				.$promise.then(function (updateReaction) {
					var reactionIndex = _.findIndex($scope.reactions, {
						id: $scope.userReaction.id,
					});
					$scope.reactions.splice(reactionIndex, 1);
					$scope.userReaction = {};
					_this.deleteReactionModal.modal('close');
					Materialize.toast('Reacción eliminada', 4000);
				})
				.catch(function (err) {
					Materialize.toast('Error al eliminar reacción', 4000);
				})
				.finally(function () {
					_this.deletingReaction = false;
				});
		};

		$scope.onCharacterChange = function (characterId) {
			var character = _.findWhere($scope.characters, { id: characterId });
			$scope.newQuote.character = character;
		};

		$scope.onSaveQuote = function () {
			if (_this.savingQuote) return;
			_this.savingQuote = true;

			$scope.newQuote.serieId = $scope.serie.id;

			QuotesAPI.save($scope.newQuote)
				.$promise.then(function (newQuote) {
					$scope.quotes.unshift(newQuote);
					_this.newQuoteModal.modal('close');
					Materialize.toast('Cita creada', 4000);
				})
				.catch(function (err) {
					Materialize.toast('Error al crear cita', 4000);
				})
				.finally(function () {
					_this.savingQuote = false;
				});
		};

		$scope.onStatusChange = function (status) {
			if (!_this.isUserLogged()) {
				$rootScope.$emit('action:require:loged:user');
				return;
			}

			if ($scope.updatingStatus) return;
			$scope.updatingStatus = true;

			var serieStatus = {};

			if (_this.serieStatus) {
				serieStatus = _this.serieStatus;
				serieStatus.status = status;
			} else {
				serieStatus = {
					serieId: $scope.serie.id,
					status: status,
				};
			}

			if (!serieStatus.status) {
				$scope.updatingStatus = false;
				return;
			}

			if (serieStatus.status === 'delete') {
				return _this.deleteStatusOfSerie(serieStatus);
			}

			if (serieStatus.status) {
				return _this.updateStatusOfSerie(serieStatus);
			}
		};

		this.updateStatusOfSerie = function (serieStatus) {
			UsersAPI.saveSerie(serieStatus)
				.$promise.then(function (serieStatus) {
					_this.serieStatus = serieStatus;
					$scope.serieStatus = _.findWhere($scope.statuses, {
						identifier: serieStatus.status,
					}).name;
					Materialize.toast('Estado actualizado', 4000);
				})
				.catch(function (err) {
					_this.onUpdateStatusError();
					Materialize.toast('Error al actualizar estado', 4000);
				})
				.finally(function () {
					$scope.updatingStatus = false;
				});
		};

		this.deleteStatusOfSerie = function (serieStatus) {
			UsersAPI.deleteSerie(
				{
					userSerieId: serieStatus.id,
				},
				{}
			)
				.$promise.then(function () {
					_this.serieStatus = null;
					$scope.serieStatus = '';
					Materialize.toast('Estado eliminado', 4000);
				})
				.catch(function (err) {
					_this.onUpdateStatusError();
					Materialize.toast('Error al eliminar estado', 4000);
				})
				.finally(function () {
					$scope.updatingStatus = false;
				});
		};

		this.onUpdateStatusError = function () {
			$scope.serieStatus = _this.serieStatus.status;
		};

		this.saveFavoriteSerie = function () {
			UsersAPI.saveFavoriteSerie({
				serieId: $stateParams.serieId,
			})
				.$promise.then(function (serieFavorite) {
					$scope.serieFavorite = serieFavorite;
					Materialize.toast('Agregado a favoritos', 4000);
				})
				.catch(function (err) {
					Materialize.toast('Error al guardar en favoritos', 4000);
				})
				.finally(function () {
					_this.updatingFavorite = false;
				});
		};

		this.deleteFavoriteSerie = function () {
			UsersAPI.deleteFavoriteSerie({
				favoriteSerieId: $scope.serieFavorite.id,
			})
				.$promise.then(function (serieFavorite) {
					$scope.serieFavorite = null;
					Materialize.toast('Eliminado de favoritos', 4000);
				})
				.catch(function (err) {
					Materialize.toast('Error al eliminar de favoritos', 4000);
				})
				.finally(function () {
					_this.updatingFavorite = false;
				});
		};

		$scope.changeFavoriteStatus = function () {
			if (!_this.isUserLogged()) {
				$rootScope.$emit('action:require:loged:user');
				return;
			}

			if (_this.updatingFavorite) return;
			_this.updatingFavorite = true;

			if (!$scope.serieFavorite) {
				_this.saveFavoriteSerie();
			} else {
				_this.deleteFavoriteSerie();
			}
		};

		// TODO: Descomentar cuando se vaya a utilizar
		/*
    $scope.saveQuote = function() {
      SeriesAPI.saveQuote({
        id: $stateParams.serieId
      }, {
        quote: 'Milk',
        character: 'Mob'
      }).$promise
      .then(function(response) {
        console.log('Cita creada:',response)
      })
      .catch(function(err) {
        Materialize.toast('Error al crear cita', 4000);
      })
    }
    */

		this.fetchRelatedSeriesByGenres = function (genres) {
			SeriesAPI.query({
				filter: {
					fields: ['id', 'name', 'poster', 'type'],
					limit: 10,
					where: {
						genres: { inq: genres },
					},
				},
			}).$promise.then(function (relatedSeries) {
				relatedSeries.forEach(function (relatedSerie) {
					$scope.relatedSeries.push(relatedSerie);
				});
			});
		};

		this.getSerieInfoForUser = function () {
			UsersAPI.getSerieInfo({
				serieId: $stateParams.serieId,
			})
				.$promise.then(function (serieInfo) {
					_this.serieStatus = serieInfo.status;
					_this.serieFavorite = serieInfo.favorite;
					_this.serieRate = serieInfo.rate;

					if (_this.serieStatus) {
						$scope.serieStatus = _.findWhere($scope.statuses, {
							identifier: _this.serieStatus.status,
						}).name;
					}
					if (_this.serieFavorite) {
						$scope.serieFavorite = _this.serieFavorite;
					}
					if (_this.serieRate) {
						$scope.userSerieRate = _this.serieRate;
					}
				})
				.catch(function (err) {
					Materialize.toast('Error al obtener tu info de serie', 2000);
				});
		};

		this.fetchSerieById = function () {
			SeriesAPI.get({
				id: $stateParams.serieId,
				filter: {
					include: ['episodes', 'studio', 'quotes'],
				},
			})
				.$promise.then(function (serie) {
					serie.episodes = serie.episodes.map(function (episode) {
						delete episode.createdAt;
						return episode;
					});

					$scope.serie = serie;
					AppConfig.setTitle(serie.name);
					_this.fetchRelatedSeriesByGenres(serie.genres);
					_this.fixParallaxPicture();
					$scope.isContentLoaded = true;
					_this.selectDefaultTab();
					_this.calculateStars();
				})
				.catch(function () {
					Materialize.toast(
						'No se pudo obtener serie, intente nuevamente',
						4000
					);
				});
		};

		this.fixParallaxPicture = function () {
			$timeout(function () {
				$timeout(function () {
					angular.element('html,body').scrollTop(1);
					angular.element('html,body').scrollTop(0);
				});
			});
		};

		this.isUserLogged = function () {
			return !!Authentication.user;
		};

		this.setDefaultUserInfo = function () {
			$scope.serieStatus = null;
			$scope.serieFavorite = null;
			$scope.currentUserId = null;
		};

		this.setUserInfo = function () {
			if (_this.isUserLogged()) {
				$scope.currentUserId = Authentication.user.id;
				_this.getSerieInfoForUser();
			} else {
				_this.setDefaultUserInfo();
			}
		};

		this.selectDefaultTab = function () {
			$timeout(function () {
				angular.element('.ab-tabs li:first a').click();
			});
		};

		this.calculateStars = function () {
			$scope.starsPercentage = { width: '0px' };
			if ($scope.serie.rate) {
				var starsPercentage = $scope.serie.rate / 100;
				var fullStarsWith = 132;
				var withPxStars = fullStarsWith * starsPercentage;
				$scope.starsPercentage = { width: withPxStars + 'px' };
			}
		};

		this.saveUserVisit = function () {
			VisitsAPI.save({
				type: 'serie',
				serieId: $stateParams.serieId,
				episodeId: '',
				username: '',
			});
		};

		this.fetchSerieTopInteractions = function () {
			SeriesNEWAPI.topInteractions({
				id: $stateParams.serieId,
			})
				.$promise.then(function (topInteractions) {
					$scope.topInteractions = topInteractions;
					$scope.topInteractions.reactions.forEach(function (reaction, index) {
						reaction.position = index % 2 === 0 ? 'left' : 'right';
					});
				})
				.catch(function () {
					// Boom
				});
		};

		this.fetchSerieById();
		this.setUserInfo();
		this.saveUserVisit();
		this.fetchSerieTopInteractions();

		$rootScope.$on('authentication:change', function () {
			_this.setUserInfo();
		});
	}

	angular
		.module('series')
		.controller('SerieCtrl', [
			'$scope',
			'$state',
			'$rootScope',
			'AppConfig',
			'UsersAPI',
			'SeriesAPI',
			'$stateParams',
			'$timeout',
			'Authentication',
			'CharactersAPI',
			'QuotesAPI',
			'ReactionsAPI',
			'SeriesNEWAPI',
			'UsersNEWAPI',
			'VisitsAPI',
			SerieCtrl,
		]);
})();

(function () {
	'use strict';

	function TopbarAdminCtrl($scope, AppConfig, Authentication) {
		var _this = this;
		AppConfig.setTitle();
		$scope.Authentication = Authentication;
	}

	angular
		.module('series')
		.controller('TopbarAdminCtrl', [
			'$scope',
			'AppConfig',
			'Authentication',
			TopbarAdminCtrl,
		]);
})();
(function () {
	'use strict';

	function WatchEpisodeCtrl(
		$scope,
		AppConfig,
		$timeout,
		$window,
		EpisodesAPI,
		$stateParams,
		VisitsAPI
	) {
		var _this = this;
		$scope.isContentLoaded = false;
		$scope.selectedVideoId = '';

		// NOTES:
		// sources: cada source es el mismo video en distinto formato/calidad.
		// mediaToggle: se puede cambiar para asi cambiar el contenido a mostrar.
		// Version 1.0
		// this.setVideoInDefaultPlayer = function(video) {
		//   $scope.mediaToggle = {
		//     sources: [ video ],
		//     poster: $scope.episode.image
		//   };
		// };

		this.setVideoInDefaultPlayer = function (newVideo) {
			var openloadUrl = '';
			// if (angular.element('.cinema-frame')[0].offsetWidth > 900) {
			//   openloadUrl = 'https://youtube.googleapis.com/embed/?status=ok&allow_embed=0&ps=docs&partnerid=30&docid=' + newVideo.url + '&showinfo=0&autoplay=0&nohtml5=1';
			// }
			// else {
			openloadUrl =
				'https://drive.google.com/file/d/' + newVideo.url + '/preview';
			// }
			var openloadIframe =
				'<iframe src="' +
				openloadUrl +
				'" scrolling="no" frameborder="0" width="100%" height="100%" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe>';
			angular.element('#video-iframe-container').html(openloadIframe);
		};

		this.setOpenloadVideoPlayer = function (newVideo) {
			var openloadUrl = 'https://openload.co/embed/' + newVideo.url + '/';
			var openloadIframe =
				'<iframe src="' +
				openloadUrl +
				'" scrolling="no" frameborder="0" width="100%" height="100%" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe>';
			angular.element('#video-iframe-container').html(openloadIframe);
		};

		this.setMp4uploadVideoPlayer = function (newVideo) {
			var mp4uploadUrl =
				'https://www.mp4upload.com/embed-' + newVideo.url + '.html';
			var mp4uploadIframe =
				'<iframe src="' +
				mp4uploadUrl +
				'" frameborder=0 marginwidth=0 marginheight=0 scrolling=NO width=100% height=100% allowfullscreen></iframe>';
			angular.element('#video-iframe-container').html(mp4uploadIframe);
		};

		this.setOutVideoPlayer = function (newVideo) {
			var outUrl = newVideo.url;
			var outIframe =
				'<iframe src="' +
				outUrl +
				'" frameborder=0 marginwidth=0 marginheight=0 scrolling=NO width=100% height=100% allowfullscreen></iframe>';
			angular.element('#video-iframe-container').html(outIframe);
		};

		$scope.onVideoChange = function (selectedVideoId) {
			var newVideo = _.findWhere($scope.episode.videos, {
				id: selectedVideoId,
			});
			$scope.selectedVideo = newVideo;

			$timeout(function () {
				if ($scope.selectedVideo.videoServerName === 'MoeStream') {
					_this.setVideoInDefaultPlayer(newVideo);
				} else if ($scope.selectedVideo.videoServerName === 'Openload') {
					_this.setOpenloadVideoPlayer(newVideo);
				} else if ($scope.selectedVideo.videoServerName === 'Mp4upload') {
					_this.setMp4uploadVideoPlayer(newVideo);
				} else if (
					[
						'animeyt-videoAmazon',
						'animeyt-videoMp4Upload',
						'animeyt-videoYoutube',
						'animeyt-videoYT',
						'animeyt-videoMega',
						'animeyt-videoMinha',
						'animeyt-videoNaruto',
						'animeyt-videoGoogleDrive',
						'animeyt-videoDailymotion',
						'animeyt-videoOose',
					].indexOf($scope.selectedVideo.videoServerName) !== -1
				) {
					_this.setOutVideoPlayer(newVideo);
				}
			});

			_this.updateVideoPlayerSize();
		};

		this.setDefaultVideo = function (episode) {
			if (episode.videos.length) {
				var selectedVideoId = _.head(episode.videos).id;
				$scope.selectedVideoId = selectedVideoId;

				$scope.onVideoChange(selectedVideoId);
			}
		};

		this.fetchPlayEpisodeById = function () {
			EpisodesAPI.play({
				id: $stateParams.episodeId,
			})
				.$promise.then(function (episode) {
					$scope.episode = episode;
					_this.setDefaultVideo(episode);
					AppConfig.setTitle(
						episode.serie.name + ' - Episodio ' + episode.number
					);
					$scope.isContentLoaded = true;
				})
				.catch(function () {
					Materialize.toast(
						'No se pudo obtener episodio, intente de nuevo más tarde',
						4000
					);
				});
		};

		this.updateVideoPlayerSize = function () {
			$timeout(function () {
				var cinema = angular.element('.cinema-frame');
				var cinemaHeight = cinema.outerHeight();
				var cinemaWidth = cinemaHeight * 1.7777777778;

				var videoContainer = angular.element('.cinema-frame-inner');

				if (videoContainer) {
					var videoContainerStyle = {
						height: cinemaHeight + 'px',
						width: cinemaWidth + 'px',
					};

					videoContainer.css(videoContainerStyle);
				}
			});
		};

		this.setVideoSizeResizer = function () {
			var watchAttribute = function () {
				return $window.innerWidth;
			};

			$scope.$watch(watchAttribute, _this.updateVideoPlayerSize, true);

			var explorerWindows = angular.element($window);

			explorerWindows.bind('resize', function () {
				$scope.$apply();
			});
		};

		this.saveUserVisit = function () {
			VisitsAPI.save({
				type: 'episode',
				serieId: '',
				episodeId: $stateParams.episodeId,
				username: '',
			});
		};

		this.fetchPlayEpisodeById();
		this.setVideoSizeResizer();
		this.saveUserVisit();
	}

	angular
		.module('series')
		.controller('WatchEpisodeCtrl', [
			'$scope',
			'AppConfig',
			'$timeout',
			'$window',
			'EpisodesAPI',
			'$stateParams',
			'VisitsAPI',
			WatchEpisodeCtrl,
		]);
})();

(function () {
	'use strict';

	function StudiosConfig($stateProvider) {
		$stateProvider.state('studios', {
			url: '/studios',
			parent: 'admin',
			templateUrl: 'modules/core/views/general-catalog-main.client.view.html',
			controller: 'StudiosCtrl',
			resolve: {
				StudiosAPI: 'StudiosAPI',
				$q: '$q',
				studios: function (StudiosAPI, $q) {
					return $q.all({
						total: StudiosAPI.count().$promise,
						items: StudiosAPI.query({
							filter: {
								limit: 20,
								skip: 0,
							},
						}).$promise,
					});
				},
			},
		});
	}

	angular.module('studios').config(['$stateProvider', StudiosConfig]);
})();

(function () {
	'use strict';

	function StudiosCtrl($scope, StudiosAPI, studios) {
		var paginator = {
			page: 1,
			totalItems: studios.total.count,
			pageSize: 20,
		};

		$scope.catalogOptions = {
			collection: studios.items,
			ngResource: StudiosAPI,
			table: {
				headers: ['NOMBRE'],
				fieldNames: ['name'],
			},
			paginator: paginator,
			editionTpl: 'modules/core/views/general-edition-form.client.view.html',
		};
	}

	angular
		.module('studios')
		.controller('StudiosCtrl', [
			'$scope',
			'StudiosAPI',
			'studios',
			StudiosCtrl,
		]);
})();
('use strict');

angular.module('test').config([
	'$stateProvider',
	function ($stateProvider) {
		$stateProvider.state('test', {
			url: '/test',
			parent: 'home',
			templateUrl: 'modules/test/views/test-main.client.view.html',
			controller: 'TestCtrl',
		});
	},
]);
(function () {
	'use strict';

	function TestCtrl($scope, $http) {
		var _this = this;
		/* medium editor test */
		$scope.mediumEditorOptions = {
			toolbar: {
				buttons: [
					'bold',
					'italic',
					'underline',
					'header1',
					'header2',
					'quote',
					'orderedlist',
					'unorderedlist',
					'image',
				],
			},
		};
		$scope.text = 'This text gets is shown via .$render()';
		$scope.insertAddons = {
			images: {
				fileUploadOptions: {
					url: 'new-upload.php',
				},
			},
		};

		/* owlcarousel test */
		$scope.owlOptions = {
			// items: 5,
			nav: true,
			// dots: true,
			responsive: {
				0: {
					items: 1,
					nav: true,
				},
				300: {
					items: 2,
					nav: true,
				},
				600: {
					items: 3,
					nav: false,
				},
				1000: {
					items: 5,
					nav: true,
					loop: false,
				},
			},
		};
		$scope.series = [
			{
				name: 'Date A Live Movie: Mayuri Judgment',
				synopsis:
					"Abril 10. Hoy es el primer dia de escuela despues de las vacaciones de primavera. Despues de ser despertado por su linda hermana, Itsuka Shidou creica que este seria de otro dia normal. April 10th. Today was the first school day morning after the end of Spring vacation. After being woken up by his cute little sister, Itsuka Shidou believed that it would be the start of another normal day. En cuanto a la prediccion de conocer a una chica que se llamaba a si misma un espiritu..... Junto con un gran impacto, el paisaje urbano desaparecio sin dejar rastro. En una esquina de la calle que ahora fue convertida en un crater una chica estaba ahi. '-Tu, has venido a matarme tambien?' Ella es el desastre que puede destruir la humanidad, un monstruo de origen desconocido, y siendo rechazada por el mundo. Hay solo 2 vias para detener a esta chica: Aniquilacion, o la Conversacion. Su pequeña hermana Kotori, vestida en un uniforme militar, le dice esto a Shidou: 'Desde que estamos en esto, ve y ten una cita con ella, y haz que el Espiritu se enamore de ti!Qu.....Queeeeee¡?",
				chaptersNumber: 1,
				minutes: 120,
				year: 2015,
				season: 'spring',
				poster: 'http://oi64.tinypic.com/15daxci.jpg',
				backgroundImage: 'sd',
				trailer: 'tra',
				japaneseName: '劇場版 デート ア ライブ 万由里ジャッジメント',
				studioId: '5743d2fae93b9c1a4c693028',
				status: 'finished',
				type: 'movie',
				genres: ['Acción', 'Romance', 'Ecchi', 'Mecha', 'Fantasía', 'Shojo'],
				groupId: '1',
				id: '56df9acbb4a5c01a0d224065',
			},
			{
				name: 'No Game, No Life',
				synopsis:
					'No Game, No Life se centra en Sora y Shiro, unos hermanos cuya reputación de NEETs hikikomoris y gamers han hecho que comiencen a extenderse leyendas urbanas suyas por todo internet. Estos dos gamers consideran que el mundo real no es más que “un juego de mierda”. Un día, un chico llamado “Dios” les invoca en un mundo alternativo. En este mundo, Dios ha prohibido la guerra y declarado que todo se decide en base a los juegos, incluso las fronteras de los países. La humanidad vive ahora en una ciudad por culpa del resto de razas. Se convertirán Sora y Shiro, hermano y hermana, en los salvadores de este mundo alternativo.',
				chaptersNumber: 12,
				minutes: 24,
				year: 2016,
				season: 'spring',
				poster: 'http://oi63.tinypic.com/2qusmfm.jpg',
				backgroundImage:
					'http://hanabee.tv/assets/program-images/3nogifekeyimageid.jpg',
				trailer: 'tra',
				japaneseName: 'ノーゲーム・ノーライフ',
				studioId: '5743d2fae93b9c1a4c693028',
				status: 'finished',
				type: 'serie',
				genres: ['Acción', 'Romance', 'Ecchi'],
				groupId: '1',
				id: '56df9e4cb4a5c01a0d224066',
			},
			{
				name: 'Big Order',
				synopsis:
					'La historia está protagonizada por un estudiante de instituto llamado Eiji Hoshimiya que guarda un secreto: Cuando era más joven deseaba la destrucción del mundo. Las hadas dan a ciertas personas poderes especiales llamados Orders. Lo que los Orders pueden hacer con sus poderes depende de sus deseos. Diez años después de la Gran Destrucción, Eiji lucha para adecuarse a su inmenso poder.',
				chaptersNumber: 10,
				minutes: 24,
				year: 2016,
				season: 'winter',
				poster: 'https://googledrive.com/host/0B9MDBn2mAYUqSS1aUXo5ajVxbHc',
				backgroundImage:
					'https://googledrive.com/host/0B9MDBn2mAYUqVU5OX09IbTZlRjg',
				trailer: 'sd',
				japaneseName: 'ビッグオーダー',
				studioId: '5743d2fae93b9c1a4c693028',
				status: 'finished',
				type: 'serie',
				genres: ['Acción', 'Fantasía', 'Shounen'],
				id: '56dfb157b4a5c01a0d224068',
			},
			{
				name: 'JK Meshi!',
				synopsis:
					'Three high school girls have mastered the art of cooking simple, B-class dishes called JK meshi. The three girls — Reina, Ryouka, and Ruriko — are all classmates in their second year of high school. They often get distracted when studying for tests, and when they do, they cook JK meshi.\n(Source: ANN)',
				chaptersNumber: 12,
				year: 2014,
				season: 'autumn',
				poster: 'http://fs5.directupload.net/images/160309/qhjtu9u6.jpg',
				backgroundImage:
					'http://cs628029.vk.me/v628029220/1b3a1/KbpDlXPCdS0.jpg',
				japaneseName: 'JKめし！',
				status: 'finished',
				type: 'serie',
				genres: [],
				id: '56dfb603b4a5c01a0d22406a',
			},
			{
				name: 'Koyomimonogatari',
				synopsis:
					'Tras los acontecimientos de Koimonogatari, volvemos al nada común día a día de Koyomi Araragi, que seguirá involucrado en experiencias sobrenaturales teniendo esta vez una la tragedia que se prevee. Mientras tanto, en la isla, la nueva generación de pilotos la defiende con uñas y dientes del asedio de los Festum y comienzan a sufrir las consecuencias de usar unos Fafner tan poderosos: todos están mutando de alguna manera. ¿Perderán su humanidad a este paso o lograrán encontrar la esperanza que todos anhelan?',
				chaptersNumber: 14,
				year: 2014,
				season: 'summer',
				poster: 'http://fs5.directupload.net/images/160309/wvobu5i6.jpg',
				backgroundImage: 'http://i.imgur.com/na0lKZF.jpg',
				trailer: 'tr',
				japaneseName: '暦物語',
				studioId: '5743d2fae93b9c1a4c693028',
				status: 'ongoing',
				type: 'serie',
				genres: ['Acción', 'Romance'],
				id: '56dfb66cb4a5c01a0d22406b',
			},
			{
				name: 'Luck & Logic',
				synopsis:
					"In L.C. 922, people faced a sudden crisis.\nIn Tetra Heaven, the land of legend, a hundred years of war had come to a close. The gods who lost the war searched for a new place to live, and found it in Septpia, the human world, which they proceeded to attack. The Logicalists attached to ALCA, a special police agency whose duty it was to protect cities from assaults by foreigners (angels), were compelled to act in defense of cities, whether they wished to or not.\nAnd depending on their ability, Logicalists could initiate trance with goddesses from the other world, and stand a fighting chance on the battlefield.\nA civilian named Yoshichika Tsurugi, who lacked 'Logic' and lived happily with his family, was caught up in an attack, and took shelter along with many people. He meets a beautiful goddess named Athena. In her hands, she had the 'Logic' that Yoshichika lacked. Now both Yoshichika and Athena head to their destiny.",
				chaptersNumber: 13,
				year: 2014,
				season: 'spring',
				poster: 'http://fs5.directupload.net/images/160309/rdncr8hn.jpg',
				backgroundImage:
					'http://vignette2.wikia.nocookie.net/luckandlogic/images/8/81/Luck_%26_Logic.png/revision/latest?cb=20151124082728',
				japaneseName: 'ラクエンロジック',
				status: 'finished',
				type: 'serie',
				genres: [],
				id: '56dfb6a9b4a5c01a0d22406c',
			},
			{
				name: 'Dagashi Kashi',
				synopsis:
					'El padre de Shikada Kokonotsu posee una tienda de dulces en una zona rural, y su plan es que sea su hijo quien se encargue del negocio familiar algún día. Sin embargo, lo que Kokonotsu quiere realmente es ser autor de manga.',
				chaptersNumber: 15,
				year: 2014,
				season: 'spring',
				poster: 'http://fs5.directupload.net/images/160309/3ky9mwsx.jpg',
				backgroundImage:
					'http://orig04.deviantart.net/2313/f/2016/014/d/2/hotaru_shidare_wallpaper_2_by_sanoboss-d9nya62.jpg',
				japaneseName: 'だがしかし',
				status: 'ongoing',
				type: 'serie',
				genres: [],
				id: '56dfb6edb4a5c01a0d22406d',
			},
			{
				name: 'Nombre para testear app animeBeat',
				synopsis: 'test',
				chaptersNumber: 12,
				year: 2014,
				season: 'autumn',
				poster: 'http://oi64.tinypic.com/15daxci.jpg',
				backgroundImage:
					'http://orig04.deviantart.net/2313/f/2016/014/d/2/hotaru_shidare_wallpaper_2_by_sanoboss-d9nya62.jpg',
				japaneseName: 'tesjap',
				status: 'ongoing',
				type: 'ova',
				genres: [],
				id: '56e24891760d7a2a11321925',
			},
			{
				name: 'name',
				synopsis: 'sdmasd',
				chaptersNumber: 19,
				year: 2014,
				season: 'summer',
				poster: 'http://fs5.directupload.net/images/160309/wvobu5i6.jpg',
				backgroundImage: 'imag',
				trailer: 'traierl',
				japaneseName: 'dmasdm',
				studioId: '5743d2fae93b9c1a4c693028',
				status: 'ongoing',
				type: 'serie',
				genres: ['Romance', 'Ecchi', 'Mecha', 'Fantasía'],
				groupId: '1',
				id: '5754ba731631dc7c0266054c',
			},
			{
				name: 'tes',
				synopsis: 'tes',
				chaptersNumber: 123,
				year: 2016,
				season: 'spring',
				poster: 'http://fs5.directupload.net/images/160309/3ky9mwsx.jpg',
				backgroundImage: 'tes',
				japaneseName: 'tess',
				studioId: '5743d302e93b9c1a4c693029',
				status: 'ongoing',
				type: 'serie',
				genres: ['Romance', 'Ecchi'],
				id: '5760d7d15f128c4461491c80',
			},
		];
		$scope.series2 = [
			{ name: 'ona' },
			{ name: 'opa' },
			{ name: 'uni' },
			{ name: 'tear' },
			{ name: 'qw' },
			{ name: 'hotaru_shidare_wallpaper_2_by_sanoboss-d9nya62' },
			{ name: 'asd' },
			{ name: 'fqw' },
			{ name: 'asdqw2' },
			{ name: '32' },
			{ name: 't1' },
			{ name: 'sd' },
		];
	}

	angular.module('test').controller('TestCtrl', ['$scope', '$http', TestCtrl]);
})();
('use strict');

function UsersConfig($httpProvider) {
	$httpProvider.interceptors.push('RequestsInterceptor');
}

angular.module('users').config(['$httpProvider', UsersConfig]);

('use strict');

// Setting up route
angular.module('users').config([
	'$stateProvider',
	function ($stateProvider) {
		$stateProvider
			.state('user', {
				url: '/usuarios/:username',
				parent: 'home',
				templateUrl: 'modules/users/views/user.client.view.html',
				controller: 'UserCtrl',
			})
			.state('user-edition', {
				url: '/usuarios/:username/edicion',
				parent: 'home',
				templateUrl: 'modules/users/views/user-edition.client.view.html',
				controller: 'UserEditionCtrl',
			})
			.state('recovery-password', {
				url: '/recuperar-contrasena?step&folio',
				parent: 'home',
				templateUrl: 'modules/users/views/recovery-password.client.view.html',
				controller: 'RecoveryPasswordCtrl',
			})
			.state('users', {
				url: '/users',
				parent: 'admin',
				templateUrl: 'modules/core/views/general-catalog-main.client.view.html',
				controller: 'UsersCtrl',
				resolve: {
					UsersAPI: 'UsersAPI',
					$q: '$q',
					users: function (UsersAPI, $q) {
						return $q.all({
							total: UsersAPI.count().$promise,
							items: UsersAPI.query({
								filter: {
									include: 'role',
									limit: 20,
									skip: 0,
								},
							}).$promise,
						});
					},
				},
			});
	},
]);

(function () {
	'use strict';

	function RecoveryPasswordCtrl(
		$scope,
		$state,
		$stateParams,
		AppConfig,
		UsersNEWAPI
	) {
		$scope.recoveryCredentials = {};
		$scope.step = $stateParams.step || null;
		$scope.recoveryCredentials.folio = $stateParams.folio || null;

		$scope.requestRecoveryPassword = function () {
			if ($scope.loadingRecovery) return;
			$scope.loadingRecovery = true;
			UsersNEWAPI.requestRecoveryPassword($scope.recoveryCredentials)
				.$promise.then(function (user) {
					Materialize.toast('Te hemos enviado un email de recuperación', 4000);
					$scope.step = 'email';
				})
				.catch(function (err) {
					Materialize.toast('Error al solicitar restauracion', 4000);
				})
				.finally(function () {
					$scope.loadingRecovery = false;
				});
		};

		$scope.recoveryPassword = function () {
			if ($scope.loadingRecovery) return;
			$scope.loadingRecovery = true;
			UsersNEWAPI.recoveryPassword($scope.recoveryCredentials)
				.$promise.then(function (user) {
					Materialize.toast('Haz actualizado tu contraseña', 4000);
					$state.go('start');
				})
				.catch(function (err) {
					Materialize.toast('Error al actualizar contraseña', 4000);
				})
				.finally(function () {
					$scope.loadingRecovery = false;
				});
		};

		AppConfig.setTitle('Recuperar contraseña');
	}

	angular
		.module('users')
		.controller('RecoveryPasswordCtrl', [
			'$scope',
			'$state',
			'$stateParams',
			'AppConfig',
			'UsersNEWAPI',
			RecoveryPasswordCtrl,
		]);
})();

(function () {
	'use strict';

	function UserEditionCtrl(
		$scope,
		AppConfig,
		$timeout,
		$stateParams,
		UsersAPI,
		UsersNEWAPI,
		Authentication,
		$state
	) {
		var _this = this;
		$scope.isContentLoaded = false;
		$scope.user = {};

		$scope.updateUser = function () {
			UsersNEWAPI.updateUser($scope.user)
				.$promise.then(function (user) {
					Materialize.toast('Perfil actualizado', 4000);
					$state.go('user', { username: $stateParams.username });
				})
				.catch(function (err) {
					Materialize.toast('Error al actualizar usuario', 4000);
				});
		};

		this.fetchUser = function () {
			UsersAPI.getByUsername(
				{
					username: $stateParams.username,
				},
				{}
			)
				.$promise.then(function (user) {
					$scope.user = user;
					AppConfig.setTitle(user.username);
					$scope.isContentLoaded = true;
				})
				.catch(function (err) {
					Materialize.toast('Error al obtener usuario', 4000);
				});
		};

		this.fetchUser();
	}

	angular
		.module('users')
		.controller('UserEditionCtrl', [
			'$scope',
			'AppConfig',
			'$timeout',
			'$stateParams',
			'UsersAPI',
			'UsersNEWAPI',
			'Authentication',
			'$state',
			UserEditionCtrl,
		]);
})();

(function () {
	'use strict';

	function UserCtrl(
		$scope,
		AppConfig,
		$timeout,
		$stateParams,
		UsersAPI,
		Authentication,
		QuotesAPI,
		ReactionsAPI,
		VisitsAPI
	) {
		var _this = this;
		$scope.isContentLoaded = false;
		$scope.notFoundSeriesStatus = false;
		$scope.currentTabName = 'series';
		$scope.showEditBtn =
			Authentication &&
			Authentication.user &&
			Authentication.user.username === $stateParams.username;

		$scope.changeSelectedTab = function (tabName) {
			$scope.currentTabName = tabName;

			if (tabName === 'series') {
				$scope.showSeriesByStatus();
			} else if (tabName === 'quotes') {
				_this.fetchQuotes();
			} else if (tabName === 'reactions') {
				_this.fetchReactions();
			}
		};

		this.fetchQuotes = function () {
			if ($scope.loadingQuotes || _this.quotesLoaded) return;
			$scope.loadingQuotes = true;

			QuotesAPI.query({
				filter: {
					where: {
						userId: $scope.user.id,
					},
					include: ['character'],
				},
			})
				.$promise.then(function (quotes) {
					$scope.quotes = quotes;
					_this.quotesLoaded = true;
				})
				.catch(function () {
					Materialize.toast('No se pudieron obtener citas', 3000);
				})
				.finally(function () {
					$scope.loadingQuotes = false;
				});
		};

		this.fetchReactions = function () {
			if ($scope.loadingReactions || _this.reactionsLoaded) return;
			$scope.loadingReactions = true;

			ReactionsAPI.query({
				filter: {
					where: {
						userId: $scope.user.id,
					},
				},
			})
				.$promise.then(function (reactions) {
					$scope.reactions = reactions;
					_this.reactionsLoaded = true;
				})
				.catch(function () {
					Materialize.toast('No se pudieron obtener reacciones', 3000);
				})
				.finally(function () {
					$scope.loadingReactions = false;
				});
		};

		this.fetchUser = function () {
			UsersAPI.getByUsername(
				{
					username: $stateParams.username,
				},
				{}
			)
				.$promise.then(function (user) {
					$scope.user = user;
					AppConfig.setTitle(user.username);
					$scope.showSeriesByStatus();
					_this.selectDefaultTab();
					$scope.isContentLoaded = true;
				})
				.catch(function (err) {
					Materialize.toast('Error al obtener usuario', 4000);
				});
		};

		$scope.showSeriesByStatus = function (status) {
			$scope.notFoundSeriesStatus = true;

			$scope.user.series.forEach(function (serie) {
				if (!status) {
					serie.show = true;
					$scope.notFoundSeriesStatus = false;
					return;
				}

				if (serie.status === status) {
					serie.show = true;
					$scope.notFoundSeriesStatus = false;
				} else {
					serie.show = false;
				}
			});
		};

		this.selectDefaultTab = function () {
			$timeout(function () {
				angular.element('.ab-tabs li:first a').click();
			});
		};

		this.saveUserVisit = function () {
			VisitsAPI.save({
				type: 'profile',
				serieId: '',
				episodeId: '',
				username: $stateParams.username,
			});
		};

		this.fetchUser();
		this.saveUserVisit();
	}

	angular
		.module('users')
		.controller('UserCtrl', [
			'$scope',
			'AppConfig',
			'$timeout',
			'$stateParams',
			'UsersAPI',
			'Authentication',
			'QuotesAPI',
			'ReactionsAPI',
			'VisitsAPI',
			UserCtrl,
		]);
})();

//TODO: Agregar nuevo diseño, edicion de usuarios y adaptar a directiva catalog si es posible (para busqueda, paginado y edicion).
(function () {
	'use strict';

	function UsersCtrl($scope, UsersAPI, users) {
		var paginator = {
			page: 1,
			totalItems: users.total.count,
			pageSize: 20,
		};

		var searcher = {
			searchBy: ['username', 'email'],
		};

		$scope.catalogOptions = {
			collection: users.items,
			ngResource: UsersAPI,
			table: {
				headers: ['USERNAME', 'EMAIL', 'ROL'],
				fieldNames: [
					'username',
					'email',
					{ property: 'role', subproperty: 'name' },
				],
			},
			searcher: searcher,
			extendFilter: {
				include: 'role',
			},
			paginator: paginator,
			editionTpl: 'modules/core/views/general-edition-form.client.view.html',
		};
	}

	angular
		.module('users')
		.controller('UsersCtrl', ['$scope', 'UsersAPI', 'users', UsersCtrl]);
})();
(function () {
	'use strict';

	function AuthenticationService(
		$rootScope,
		$http,
		$location,
		localStorageService,
		socialLoginService,
		API_URL,
		NEW_API_URL
	) {
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

		this.login = function (credentials) {
			if (_this.loadingLogin) return;
			_this.loadingLogin = true;

			$http
				.post(API_URL + '/users/login?include=user', credentials)
				.success(onLoginSuccess)
				.error(function (err) {
					//TODO: Sin importar el error; el mismo mensaje
					Materialize.toast('Usuario o contraseña incorrectos', 4000);
				})
				.finally(function () {
					_this.loadingLogin = false;
				});
		};

		this.singIn = function (account) {
			if (_this.loadingSingIn) return;
			_this.loadingSingIn = true;

			$http
				.post(API_URL + '/users', account)
				.success(function (response) {
					//TODO: Manejo de errores; validacion de: username, email, password
					_this.login(account);
				})
				.error(function (response) {
					Materialize.toast(
						'No se pudo crear cuenta, intente nuevamente',
						4000
					);
				})
				.finally(function () {
					_this.loadingSingIn = false;
				});
		};

		this.logout = function () {
			if (!_this.accessToken) return;

			socialLoginService.logout();
			var logoutURL =
				API_URL + '/users/logout?access_token=' + _this.accessToken;

			$http.post(logoutURL).finally(function (response) {
				unsetAuthenticationData();
				//$location.path('/inicio');
			});
		};

		this.loginSocial = function (socialCredentials) {
			if (_this.loadingLogin) return;
			_this.loadingLogin = true;

			$http
				.post(NEW_API_URL + '/users/auth/social', socialCredentials)
				.success(onLoginSuccess)
				.error(function (err) {
					//TODO: Sin importar el error; el mismo mensaje
					Materialize.toast('No se logró logear', 4000);
				})
				.finally(function () {
					_this.loadingLogin = false;
				});
		};
	}

	angular
		.module('users')
		.service('Authentication', [
			'$rootScope',
			'$http',
			'$location',
			'localStorageService',
			'socialLoginService',
			'API_URL',
			'NEW_API_URL',
			AuthenticationService,
		]);
})();

(function () {
	'use strict';

	function RequestsInterceptor($q, $location, localStorage) {
		var UNAUTHORIZED_CODE = 401;
		var FORBIDDEN_CODE = 403;
		var accessToken;

		this.request = function (config) {
			accessToken = localStorage.get('access_token');

			if (accessToken) config.headers.Authorization = accessToken;

			return config;
		};

		this.responseError = function (rejection) {
			switch (rejection.status) {
				case UNAUTHORIZED_CODE:
					localStorage.remove('user', 'access_token');
					$location.path('/login');
					break;
				case FORBIDDEN_CODE:
					// $location.path('/error-403');
					// TODO
					break;
			}

			return $q.reject(rejection);
		};
	}

	angular
		.module('users')
		.service('RequestsInterceptor', [
			'$q',
			'$location',
			'localStorageService',
			RequestsInterceptor,
		]);
})();
(function () {
	'use strict';

	function VideoServersConfig($stateProvider) {
		$stateProvider.state('videoServers', {
			url: '/video-servers',
			parent: 'admin',
			templateUrl: 'modules/core/views/general-catalog-main.client.view.html',
			controller: 'VideoServersCtrl',
			resolve: {
				VideoServersAPI: 'VideoServersAPI',
				$q: '$q',
				videoServers: function (VideoServersAPI, $q) {
					return $q.all({
						total: VideoServersAPI.count().$promise,
						items: VideoServersAPI.query({
							filter: {
								limit: 20,
								skip: 0,
							},
						}).$promise,
					});
				},
			},
		});
	}

	angular.module('videoServers').config(['$stateProvider', VideoServersConfig]);
})();

(function () {
	'use strict';

	function VideoServersCtrl($scope, VideoServersAPI, videoServers) {
		var paginator = {
			page: 1,
			totalItems: videoServers.total.count,
			pageSize: 20,
		};

		$scope.catalogOptions = {
			collection: videoServers.items,
			ngResource: VideoServersAPI,
			table: {
				headers: ['NOMBRE'],
				fieldNames: ['name'],
			},
			paginator: paginator,
			editionTpl: 'modules/core/views/general-edition-form.client.view.html',
		};
	}

	angular
		.module('videoServers')
		.controller('VideoServersCtrl', [
			'$scope',
			'VideoServersAPI',
			'videoServers',
			VideoServersCtrl,
		]);
})();
(function () {
	'use strict';

	function VisitsConfig($stateProvider) {
		$stateProvider.state('visits', {
			url: '/visits',
			parent: 'admin',
			templateUrl: 'modules/core/views/general-catalog-main.client.view.html',
			controller: 'VisitsCtrl',
			resolve: {
				VisitsAPI: 'VisitsAPI',
				$q: '$q',
				visits: function (VisitsAPI, $q) {
					return $q.all({
						total: VisitsAPI.count().$promise,
						items: VisitsAPI.query({
							filter: {
								limit: 20,
								skip: 0,
							},
						}).$promise,
					});
				},
			},
		});
	}

	angular.module('visits').config(['$stateProvider', VisitsConfig]);
})();

(function () {
	'use strict';

	function VisitsCtrl($scope, VisitsAPI, visits) {
		var paginator = {
			page: 1,
			totalItems: visits.total.count,
			pageSize: 20,
		};

		$scope.catalogOptions = {
			collection: visits.items,
			ngResource: VisitsAPI,
			table: {
				headers: ['TIPO', 'FECHA'],
				fieldNames: ['type', 'date'],
			},
			paginator: paginator,
			editionTpl: 'modules/core/views/general-edition-form.client.view.html',
		};
	}

	angular
		.module('visits')
		.controller('VisitsCtrl', ['$scope', 'VisitsAPI', 'visits', VisitsCtrl]);
})();
