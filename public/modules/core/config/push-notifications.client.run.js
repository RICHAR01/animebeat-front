(function(){
  'use strict';

  function PushNotificationsService($rootScope, localStorageService, PlayersAPI) {
    var _this = this;
    var playerId = localStorageService.get('playerId');
    var OneSignal = null;
    var notificationsOptions = {
      appId: "fcf6477d-b253-444f-8799-be8e59bc673f",
      autoRegister: true, /* Set to true to automatically prompt visitors */
      httpPermissionRequest: {
        enable: true,
        modalTitle: 'Gracias por suscribirte',
        modalMessage: "Ahora estás suscrito a notificaciones. Puedes des-suscribirte en cualquier momento.",
        modalButtonText: 'Cerrar'
      },
      notifyButton: {
        enable: true, /* Set to false to hide */
        // size: 'medium', /* One of 'small', 'medium', or 'large' */
        // theme: 'default', /* One of 'default' (red-white) or 'inverse" (white-red) */
        // position: 'bottom-right', /* Either 'bottom-left' or 'bottom-right' */
        // offset: {
        //     bottom: '0px',
        //     left: '0px', /* Only applied if bottom-left */
        //     right: '0px' /* Only applied if bottom-right */
        // },
        prenotify: true, /* Show an icon with 1 unread message for first-time site visitors */
        showCredit: false, /* Hide the OneSignal logo */
        text: {
            'tip.state.unsubscribed': 'Suscribirse a notificaciones',
            'tip.state.subscribed': "Estás suscrito a notificaciones",
            'tip.state.blocked': "Notificaciones están bloqueadas",
            'message.prenotify': 'Click para suscribirse a notificaciones',
            'message.action.subscribed': "¡Gracias por suscribirte!",
            'message.action.resubscribed': "Estás suscrito a notificaciones",
            'message.action.unsubscribed': "No recibirás notificaciones de nuevo",
            'dialog.main.title': 'Administración de Notificaciones',
            'dialog.main.button.subscribe': 'SUSCRIBIRSE',
            'dialog.main.button.unsubscribe': 'DES-SUSCRIBIRSE',
            'dialog.blocked.title': 'Desbloquear notificaciones',
            'dialog.blocked.message': "Sigue estas instrucciones para habilitar las notificaciones:"
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
          actionMessage: "Nos encantaría mostrarte notificaciones para las últimas noticias y actualizaciones.",
          /* Example notification title */
          exampleNotificationTitle: 'Notificación de ejemplo',
          /* Example notification message */
          exampleNotificationMessage: 'Nuevo episodio de tu serie favorita',
          /* Text below example notification, limited to 50 characters */
          exampleNotificationCaption: 'Te puedes des-suscribir en cualquier momento',
          /* Accept button text, limited to 15 characters */
          /* acceptButtonText limited to 15 characters */
          acceptButtonText: "PERMITIR",
          /* cancelButtonText limited to 15 characters */
          cancelButtonText: "NO GRACIAS"
        }
      },
      welcomeNotification: {
        title: 'AnimeBeat',
        message: '¡Gracias por suscribirte!'
        // url: '' /* Leave commented for the notification to not open a window on Chrome and Firefox (on Safari, it opens to your webpage) */
      }
    };

    var onPlayerSubscribed = function(newPlayerId) {
      localStorageService.set('playerId', newPlayerId);
      playerId = newPlayerId;
      PlayersAPI.upsert({
        playerId: newPlayerId
      });
    }

    var onPlayerUnsubscribed = function() {
      PlayersAPI.delete({
        id: playerId
      }).$promise;
      localStorageService.remove('playerId');
      playerId = null;
    }

    var updatePlayer = function() {
      PlayersAPI.upsert({
        playerId: playerId
      }).$promise;
    };

    $rootScope.$on('authentication:change', updatePlayer);

    var initPushNotifications = function() {
      OneSignal = window.OneSignal || [];
    
      OneSignal.push(function() {

        OneSignal.on('subscriptionChange', function(isSubscribed) {
          if (isSubscribed) {
            OneSignal.getUserId( function(userId) {
              onPlayerSubscribed(userId);
            });
          }
          else {
            onPlayerUnsubscribed();
          }
        });

        OneSignal.isPushNotificationsEnabled(function(isEnabled) {
          /* Trigger Custom Link Permission Message */
          // if (!isEnabled) {
          //   document.getElementById("subscribe-link").addEventListener('click', subscribe);
          //   document.getElementById("subscribe-link").style.display = '';
          // }
        });

      });

      OneSignal.push(["init", notificationsOptions]);
    }

    initPushNotifications();

  }

  angular.module('core').run([
    '$rootScope',
    'localStorageService',
    'PlayersAPI',
    PushNotificationsService
  ]);
})();
