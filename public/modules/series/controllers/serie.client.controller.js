(function() {
  'use strict';

  function SerieCtrl($scope, $state,$rootScope, AppConfig, UsersAPI, SeriesAPI, $stateParams,
                     $timeout, Authentication, CharactersAPI, QuotesAPI, ReactionsAPI, SeriesNEWAPI,
										 UsersNEWAPI, VisitsAPI) {
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
          items: 1
        },
        300: {
          items: 2
        },
        600: {
          items: 3
        },
        1000: {
          items: 4
        }
      }
    };
    $scope.statuses = [
      {
        name: 'Viendo',
        identifier: 'watching'
      },
      {
        name: 'Terminada',
        identifier: 'completed'
      },
      {
        name: 'En espera',
        identifier: 'onHold'
      },
      {
        name: 'Por ver',
        identifier: 'planToWatch'
      },
      {
        name: 'Abandonada',
        identifier: 'drop'
      }
    ];

		// rate serie

		$scope.showRateModal = function() {
			if (!_this.isUserLogged()) {
        $rootScope.$emit('action:require:loged:user');
        return;
      }

      if (!_this.userRateModal) {
        _this.userRateModal = angular.element('#serie-rate-modal');
        _this.userRateModal.modal();
      }

      _this.userRateModal.modal('open');
		}

		$scope.onChangeSerieRate = function(rateType) {
			if (_this.updatingSerieRate) return;
      _this.updatingSerieRate = true;

			UsersNEWAPI.createSerieRate({
				serieId: $scope.serie.id
			},{
				rate: rateType
			}).$promise
			.then(function(rate) {
				$scope.userSerieRate = rate;
				_this.userRateModal.modal('close');
				Materialize.toast('Serie calificada', 4000);
			})
			.catch(function(err) {
				Materialize.toast('Error al actualizar calificación', 4000);
			})
			.finally(function() {
				_this.updatingSerieRate = false;
			});
		}

		$scope.onDeleteSerieRate = function() {
			if (_this.updatingSerieRate) return;
      _this.updatingSerieRate = true;

			UsersNEWAPI.deleteSerieRate({
				serieId: $scope.serie.id
			}).$promise
			.then(function(rate) {
				$scope.userSerieRate = null;
				_this.userRateModal.modal('close');
				Materialize.toast('Calificación eliminada', 4000);
			})
			.catch(function(err) {
				Materialize.toast('Error al eliminar calificación', 4000);
			})
			.finally(function() {
				_this.updatingSerieRate = false;
			});
		}

		// rate serie end


		// top-interactions seccion

    $scope.onCreateReactionFavorite = function(reactionId) {
			if (!_this.isUserLogged()) {
        $rootScope.$emit('action:require:loged:user');
        return;
      }

			var reactionFavorite = {};
			var createReactionFavoritePromise = UsersNEWAPI.createReactionFavorite({
				reactionId: reactionId
			}, {}).$promise;

			return createReactionFavoritePromise;
    };

		$scope.onDeleteReactionFavorite = function(reactionId) {
			var reactionFavorite = {};
			var deleteReactionFavoritePromise = UsersNEWAPI.deleteReactionFavorite({
				reactionId: reactionId
			}, {}).$promise;

			return deleteReactionFavoritePromise;
    };

		$scope.onCreateQuoteFavorite = function(quoteId) {
			if (!_this.isUserLogged()) {
        $rootScope.$emit('action:require:loged:user');
        return;
      }

			var reactionFavorite = {};
			var createQuoteFavoritePromise = UsersNEWAPI.createQuoteFavorite({
				quoteId: quoteId
			}, {}).$promise;

			return createQuoteFavoritePromise;
    };

		$scope.onDeleteQuoteFavorite = function(quoteId) {
			var reactionFavorite = {};
			var deleteQuoteFavoritePromise = UsersNEWAPI.deleteQuoteFavorite({
				quoteId: quoteId
			}, {}).$promise;

			return deleteQuoteFavoritePromise;
    };

		// top-interactions seccion end


    $scope.toggleContent = function() {
      $scope.hideMainContent = !$scope.hideMainContent;
    };

    $scope.fetchCharacters = function() {
      if (_this.charactersLoaded) return;
      _this.charactersLoaded = true;

      CharactersAPI.query({
        filter: {
          where: {
            serieId: $scope.serie.id
          }
        }
      }).$promise
      .then(function(characters) {
        $scope.characters = characters;
      })
      .catch(function() {
        Materialize.toast('No se pudieron obtener personajes', 3000);
      });
    }

    $scope.fetchQuotes = function() {
      if (_this.QuotesLoaded) return;
      _this.QuotesLoaded = true;

      QuotesAPI.query({
        filter: {
          where: {
            serieId: $scope.serie.id
          },
          include: ['character', 'favorites']
        }
      }).$promise
      .then(function(quotes) {
        $scope.quotes = quotes;
      })
      .catch(function() {
        Materialize.toast('No se pudieron obtener citas', 3000);
      });
    }

    $scope.fetchReactions = function() {
      if (_this.reactionsLoaded) return;
      _this.reactionsLoaded = true;

      ReactionsAPI.query({
        filter: {
          where: {
            serieId: $scope.serie.id
          },
          include: 'favorites'
        }
      }).$promise
      .then(_this.onFetchReactionsSuccess)
      .catch(function() {
        Materialize.toast('No se pudieron obtener reacciones', 3000);
      });
    }

    this.onFetchReactionsSuccess = function(reactions) {
      $scope.reactions = reactions;
      if (!_this.isUserLogged()) {
        $scope.reactionsLoaded = true;
        return;
      }
      var userId = Authentication.user.id;
      var userReaction = _.findWhere($scope.reactions, { userId: userId });
      if (userReaction) $scope.userReaction = angular.copy(userReaction);
      $scope.reactionsLoaded = true;
    }

    $scope.onNewQuote = function() {
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
    }

    $scope.onUserReaction = function() {
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

    $scope.onSaveReaction = function() {
      if (_this.updatingReaction) return;
      _this.updatingReaction = true;

      // Note: Create case
      if (!$scope.userReaction.id) {
        $scope.userReaction.serieId = $scope.serie.id;

        ReactionsAPI.save($scope.userReaction).$promise
        .then(function(userReaction) {
          $scope.userReaction = angular.copy(userReaction);
          $scope.reactions.unshift(userReaction);
          _this.userReactionModal.modal('close');
          Materialize.toast('Reacción creada', 4000);
        })
        .catch(function(err) {
          Materialize.toast('Error al crear reacción', 4000);
        })
        .finally(function() {
          _this.updatingReaction = false;
        });
      }
      // Note: Update case
      else {
        ReactionsAPI.update(
          { id: $scope.userReaction.id },
          $scope.userReaction
        ).$promise
        .then(function(updateReaction) {
          var reactionIndex = _.findIndex($scope.reactions, { id: updateReaction.id });
          $scope.reactions[reactionIndex] = updateReaction;
          _this.userReactionModal.modal('close');
          Materialize.toast('Reacción actualizada', 4000);
        })
        .catch(function(err) {
          Materialize.toast('Error al actualizar reacción', 4000);
        })
        .finally(function() {
          _this.updatingReaction = false;
        });
      }
    }

    $scope.onDeleteUserReaction = function() {
      if (!_this.deleteReactionModal) {
        _this.deleteReactionModal = angular.element('#serie-delete-reaction-modal');
        _this.deleteReactionModal.modal();
      }

      _this.deleteReactionModal.modal('open');
    };

    $scope.deleteReaction = function() {
      if (_this.deletingReaction) return;
      _this.deletingReaction = true;

      ReactionsAPI.delete({
        id: $scope.userReaction.id
      }).$promise
      .then(function(updateReaction) {
        var reactionIndex = _.findIndex($scope.reactions, { id: $scope.userReaction.id });
        $scope.reactions.splice(reactionIndex, 1);
        $scope.userReaction = {};
        _this.deleteReactionModal.modal('close');
        Materialize.toast('Reacción eliminada', 4000);
      })
      .catch(function(err) {
        Materialize.toast('Error al eliminar reacción', 4000);
      })
      .finally(function() {
        _this.deletingReaction = false;
      });
    }

    $scope.onCharacterChange = function(characterId) {
      var character = _.findWhere($scope.characters, { id: characterId });
      $scope.newQuote.character = character;
    }

    $scope.onSaveQuote = function() {
      if (_this.savingQuote) return;
      _this.savingQuote = true;

      $scope.newQuote.serieId = $scope.serie.id;

      QuotesAPI.save($scope.newQuote).$promise
      .then(function(newQuote) {
        $scope.quotes.unshift(newQuote);
        _this.newQuoteModal.modal('close');
        Materialize.toast('Cita creada', 4000);
      })
      .catch(function(err) {
        Materialize.toast('Error al crear cita', 4000);
      })
      .finally(function() {
        _this.savingQuote = false;
      });
    }

    $scope.onStatusChange = function(status) {
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
      }
      else {
        serieStatus = {
          serieId: $scope.serie.id,
          status: status
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

    this.updateStatusOfSerie = function(serieStatus) {
      UsersAPI.saveSerie(serieStatus).$promise
      .then(function(serieStatus) {
        _this.serieStatus = serieStatus;
        $scope.serieStatus = _.findWhere($scope.statuses, { identifier: serieStatus.status }).name;
        Materialize.toast('Estado actualizado', 4000);
      })
      .catch(function(err) {
        _this.onUpdateStatusError();
        Materialize.toast('Error al actualizar estado', 4000);
      })
      .finally(function() {
        $scope.updatingStatus = false;
      });
    };

    this.deleteStatusOfSerie = function(serieStatus) {
      UsersAPI.deleteSerie({
        userSerieId: serieStatus.id
      }, {}).$promise
      .then(function() {
        _this.serieStatus = null;
        $scope.serieStatus = '';
        Materialize.toast('Estado eliminado', 4000);
      })
      .catch(function(err) {
        _this.onUpdateStatusError();
        Materialize.toast('Error al eliminar estado', 4000);
      })
      .finally(function() {
        $scope.updatingStatus = false;
      });
    };

    this.onUpdateStatusError = function() {
      $scope.serieStatus = _this.serieStatus.status;
    };

    this.saveFavoriteSerie = function() {
      UsersAPI.saveFavoriteSerie({
        serieId: $stateParams.serieId
      }).$promise
      .then(function(serieFavorite) {
        $scope.serieFavorite = serieFavorite;
        Materialize.toast('Agregado a favoritos', 4000);
      })
      .catch(function(err) {
        Materialize.toast('Error al guardar en favoritos', 4000);
      })
      .finally(function() {
        _this.updatingFavorite = false;
      });
    };

    this.deleteFavoriteSerie = function() {
      UsersAPI.deleteFavoriteSerie({
        favoriteSerieId: $scope.serieFavorite.id
      }).$promise
      .then(function(serieFavorite) {
        $scope.serieFavorite = null;
        Materialize.toast('Eliminado de favoritos', 4000);
      })
      .catch(function(err) {
        Materialize.toast('Error al eliminar de favoritos', 4000);
      })
      .finally(function() {
        _this.updatingFavorite = false;
      });
    };

    $scope.changeFavoriteStatus = function() {
      if (!_this.isUserLogged()) {
        $rootScope.$emit('action:require:loged:user');
        return;
      }

      if (_this.updatingFavorite) return;
      _this.updatingFavorite = true;

      if (!$scope.serieFavorite) {
        _this.saveFavoriteSerie();
      }
      else {
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

    this.fetchRelatedSeriesByGenres = function(genres) {
      SeriesAPI.query({
        filter: {
          fields: ['id', 'name', 'poster', 'type'],
          limit: 10,
          where: {
            genres: { inq: genres }
          }
        }
      }).$promise
      .then(function(relatedSeries) {
        relatedSeries.forEach(function(relatedSerie) {
          $scope.relatedSeries.push(relatedSerie);
        });
      });
    };

    this.getSerieInfoForUser = function() {
      UsersAPI.getSerieInfo({
        serieId: $stateParams.serieId
      }).$promise
      .then(function(serieInfo) {
        _this.serieStatus = serieInfo.status;
        _this.serieFavorite = serieInfo.favorite;
				_this.serieRate = serieInfo.rate;

        if (_this.serieStatus) {
          $scope.serieStatus = _.findWhere($scope.statuses, { identifier: _this.serieStatus.status }).name;
        }
        if (_this.serieFavorite) {
          $scope.serieFavorite = _this.serieFavorite;
        }
				if (_this.serieRate) {
					$scope.userSerieRate = _this.serieRate;
				}
      })
      .catch(function(err) {
        Materialize.toast('Error al obtener tu info de serie', 2000);
      });
    };

    this.fetchSerieById = function() {
      SeriesAPI.get({
        id: $stateParams.serieId,
        filter: {
          include: ['episodes', 'studio', 'quotes']
        }
      }).$promise
      .then(function(serie) {
        serie.episodes = serie.episodes.map(function(episode) {
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
      .catch(function() {
        Materialize.toast('No se pudo obtener serie, intente nuevamente', 4000);
      });
    };

    this.fixParallaxPicture = function() {
      $timeout(function() {
        $timeout(function() {
          angular.element('html,body').scrollTop(1);
          angular.element('html,body').scrollTop(0);
        });
      });
    };

    this.isUserLogged = function() {
      return !!Authentication.user;
    };

    this.setDefaultUserInfo = function() {
      $scope.serieStatus = null;
      $scope.serieFavorite = null;
      $scope.currentUserId = null;
    };

    this.setUserInfo = function() {
      if (_this.isUserLogged()) {
        $scope.currentUserId = Authentication.user.id;
        _this.getSerieInfoForUser();
      }
      else {
        _this.setDefaultUserInfo();
      }
    };

    this.selectDefaultTab = function () {
      $timeout(function() {
        angular.element('.ab-tabs li:first a').click();
      });
    };

		this.calculateStars = function() {
			$scope.starsPercentage = { width: '0px' }
			if ($scope.serie.rate) {
				var starsPercentage = $scope.serie.rate / 100;
				var fullStarsWith = 132;
				var withPxStars = fullStarsWith * starsPercentage;
				$scope.starsPercentage = { width: withPxStars + 'px' };
			}
		}

    this.saveUserVisit = function () {
      VisitsAPI.save({
        type: 'serie',
        serieId: $stateParams.serieId,
        episodeId: '',
        username: ''
      });
    };

    this.fetchSerieTopInteractions = function() {
      SeriesNEWAPI.topInteractions({
        id: $stateParams.serieId
      }).$promise
      .then(function(topInteractions) {
        $scope.topInteractions = topInteractions;
				$scope.topInteractions.reactions.forEach(function(reaction, index) {
					reaction.position = index % 2 === 0 ? 'left' : 'right';
				});
      })
      .catch(function() {
        // Boom
      });

    }

    this.fetchSerieById();
    this.setUserInfo();
    this.saveUserVisit();
    this.fetchSerieTopInteractions();

    $rootScope.$on('authentication:change', function() {
      _this.setUserInfo();
    });

  }

  angular.module('series').controller('SerieCtrl', [
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
    SerieCtrl
  ]);
})();
