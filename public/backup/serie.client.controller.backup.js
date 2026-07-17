// (function() {
//   'use strict';

//   function SerieCtrl($scope, $window, UsersAPI, SeriesAPI, $stateParams, $state, $timeout, Authentication) {
//     var _this = this;
//     $scope.toShow = false;

//     this.currentUser = Authentication.user;

//     $scope.quotes = [
//       {
//         name: 'Ella es mas bella ahora que antes. Su simple presencia es tan... misteriosa.',
//         author: 'Hanekawa Tsubasa'
//       },
//       {
//         name: 'No es la pata de un mono, es el brazo de un demonio. Puede hacer que cualquier cosa se vuelva realidad. Pero, a cambio de eso toma tu alma. A cambio de tu alma, te concede tres deseos. ¿No es obvio? Ya que es un demonio.',
//         author: 'Oshino Meme'
//       },
//       {
//         name: 'Odiar a las personas es parte de la vida.',
//         author: 'Araragi Koyomi'
//       }
//     ];
    
//     $scope.statuses = [
//       {
//         name: 'Viendo',
//         identifier: 'watching'
//       },
//       {
//         name: 'Terminada',
//         identifier: 'completed'
//       },
//       {
//         name: 'En espera',
//         identifier: 'onHold'
//       },
//       {
//         name: 'La quiero ver',
//         identifier: 'planToWatch'
//       },
//       {
//         name: 'Abandonada',
//         identifier: 'drop'
//       }
//     ];

//     $scope.onStatusChange = function(status) {
//       if(!_this.isUserLogged()) {
//         serieStatus.status = '';
//         return Materialize.toast('Por favor inicia sesión', 4000)
//       }
//       if($scope.updatingStatus) return;
//       $scope.updatingStatus = true;
//       var serieStatus = {};
//       if(_this.serieStatus) {
//         serieStatus = _this.serieStatus;
//         serieStatus.status = status;
//       }
//       else {
//         serieStatus = {
//           serieId: $scope.serie.id,
//           status: status
//         };
//       }
//       if(!serieStatus.status) {
//         $scope.updatingStatus = false;
//         return;
//       }
//       if(serieStatus.status === 'delete')
//         return _this.deleteStatusOfSerie(serieStatus);
//       if(serieStatus.status)
//         return _this.updateStatusOfSerie(serieStatus);
//     };

//     this.updateStatusOfSerie = function(serieStatus) {
//       UsersAPI.saveSerie(serieStatus).$promise
//       .then(function(serieStatus) {
//         _this.serieStatus = serieStatus;
//         Materialize.toast('Estado actualizado', 4000);
//       })
//       .catch(function(err) {
//         _this.onUpdateStatusError();
//         Materialize.toast('Error al actualizar estado', 4000);
//       })
//       .finally(function() {
//         $scope.updatingStatus = false;
//       });
//     };

//     this.deleteStatusOfSerie = function(serieStatus) {
//       UsersAPI.deleteSerie({ 
//         userSerieId: serieStatus.id
//       }, {}).$promise
//       .then(function() {
//         _this.serieStatus = null;
//         $scope.serieStatus = '';
//         Materialize.toast('Estado eliminado', 4000);
//       })
//       .catch(function(err) {
//         _this.onUpdateStatusError();
//         Materialize.toast('Error al eliminar estado', 4000);
//       })
//       .finally(function() {
//         $scope.updatingStatus = false;
//       });
//     };

//     this.onUpdateStatusError = function() {
//       $scope.serieStatus = _this.serieStatus.status;
//     };

//     this.fetchRelatedSeriesByGenres = function(genres) {
//       SeriesAPI.query({
//         filter: {
//           fields: ['id', 'name', 'poster', 'type'],
//           limit: 4,
//           where: {
//             genres: { inq: genres }
//           }
//         }
//       }).$promise
//       .then(function(relatedSeries) {
//         $scope.relatedSeries = relatedSeries;
//       })
//       .catch(function() {
//         Materialize.toast('Error al recuperar series relacionadas', 4000);
//       });
//     };

//     this.fetchSerieById = function() {
//       var promise = SeriesAPI.get({
//         id: $stateParams.serieId,
//         filter: {
//           include: ['episodes', 'studio', 'quotes']
//         }
//       }).$promise;

//       promise
//       .then(function(serie) {
//         $scope.serie = serie;
//         _this.fetchRelatedSeriesByGenres(serie.genres);
//       })
//       .catch(function() {
//         Materialize.toast('Error al recuperar serie', 4000);
//       });

//       return promise;
//     };

//     this.getSerieInfoForUser = function() {
//       UsersAPI.getSerieInfo({
//         serieId: $stateParams.serieId
//       }).$promise
//       .then(function(serieInfo) {
//         _this.serieStatus = serieInfo.status;
//         _this.serieFavorite = serieInfo.favorite;
        
//         if(_this.serieStatus)
//           $scope.serieStatus = _this.serieStatus.status;
//         if(_this.serieFavorite)
//           $scope.serieFavorite = _this.serieFavorite;

//       })
//       .catch(function(err) {
//         Materialize.toast('Error al obtener tu info de serie', 2000);
//       });
//     }

//     this.isUserLogged = function() {
//       return !!_this.currentUser;
//     };

//     $timeout(function() {
//       _this.fetchSerieById();
//       angular.element('.parallax').parallax();
//     });

//     if(_this.isUserLogged())
//       this.getSerieInfoForUser();


//     angular.element('html,body').scrollTop(0);

//     $timeout(function() {
//       angular.element('html,body').scrollTop(1);
//       angular.element('html,body').scrollTop(0);
//     });
    

//     $scope.changeFavoriteStatus = function() {
//       // TODO: Validar una sola solicitud a la vez, y mover a funciones

//       if(!$scope.serieFavorite) {
//         UsersAPI.saveFavoriteSerie({
//           serieId: $stateParams.serieId
//         }).$promise
//         .then(function(serieFavorite) {
//           $scope.serieFavorite = serieFavorite;
//         })
//         .catch(function(err) {
//           Materialize.toast('Error al guardar en favoritos', 4000);
//         });
//       }
//       else {
//         UsersAPI.deleteFavoriteSerie({
//           favoriteSerieId: $scope.serieFavorite.id
//         }).$promise
//         .then(function(serieFavorite) {
//           $scope.serieFavorite = null;
//         })
//         .catch(function(err) {
//           Materialize.toast('Error al eliminar de favoritos', 4000);
//         });
//       }

//     };


//     $scope.saveQuote = function() {
//       SeriesAPI.saveQuote({
//         id: $stateParams.serieId
//       }, {
//         quote: 'Milk',
//         character: 'Mob'
//       }).$promise
//       .then(function(response) {
//         console.log('Cita creada:',response)
//       })
//       .catch(function(err) {
//         Materialize.toast('Error al crear cita', 4000);
//       })
//     }
   
//   }

//   angular.module('series').controller('SerieCtrl', [
//     '$scope',
//     '$window',
//     'UsersAPI',
//     'SeriesAPI',
//     '$stateParams',
//     '$state',
//     '$timeout',
//     'Authentication',
//     SerieCtrl
//   ]);
// })();