(function() {
  'use strict';

  function CharactersEditionCtrl($scope, CharactersAPI, serie) {

    /* Configuración inicial */

    var _this = this;
    this.characterEditionModal = null;
    
    this.getOriginals = function(serie) {
      $scope.characters = angular.copy(serie.characters);
      $scope.serieName = serie.name;
      $scope.serieId = serie.id;
    };

    this.getOriginals(serie); 

    
    /* Configuración inicial fin */


    /* Cambios en episodios */
    
    $scope.onAddOrUpdateCharacter = function(character) {
      if (character) {
        $scope.selectedCharacter = angular.copy(character);
      }
      else {
        $scope.selectedCharacter = {
          name: '',
          image: '',
          serieId: $scope.serieId
        };
      }

      if (!_this.characterEditionModal) {
        _this.characterEditionModal = angular.element('#character-edition-modal');
        _this.characterEditionModal.modal();
      }
      _this.characterEditionModal.modal('open');
    };

    $scope.onDeleteCharacter = function(character, index) {
      _this.characterIdToDelete = character.id;
      _this.characterIndexToDelete = index;

      if (!_this.characterDeletionModal) {
        _this.characterDeletionModal = angular.element('#character-deletion-modal');
        _this.characterDeletionModal.modal();
      }

      _this.characterDeletionModal.modal('open');
    };

    $scope.deleteCharacter = function() {
      _this.deleteCharacter(_this.characterIdToDelete)
      .then(function() {
        $scope.characters.splice(_this.characterIndexToDelete, 1);
        _this.characterDeletionModal.modal('close');
        Materialize.toast('Personaje eliminado exitosamente', 4000);
      })
      .catch(function(err) {
        Materialize.toast('Error al eliminar personaje', 4000);
      });
    };

    /* sub: api calls */

    this.createCharacter = function(character) {
      return CharactersAPI.save(character).$promise;
    };

    this.deleteCharacter = function(characterId) {
      return CharactersAPI.delete({
        id: characterId
      }).$promise;
    };

    this.updateCharacter = function(character) {
      return CharactersAPI.update({
        id: character.id
      }, character).$promise;
    };

    /* sub: api calls end */

    this.caseCreateCharacter = function() {
      _this.createCharacter($scope.selectedCharacter)
      .then(function(savedCharacter) {
        $scope.characters.push(savedCharacter);
        _this.characterEditionModal.modal('close');
        Materialize.toast('Personaje guardado con éxito', 4000);
      })
      .catch(function(){
        Materialize.toast('Error al guardar personaje', 4000);
      });
    };

    this.caseUpdateCharacter = function () {
      _this.updateCharacter($scope.selectedCharacter)
      .then(function(updatedCharacter) {
        var characterIndex = _.findIndex($scope.characters, { id: updatedCharacter.id });
        $scope.characters[characterIndex] = updatedCharacter;
        _this.characterEditionModal.modal('close');
        Materialize.toast('Personaje actualizado exitosamente', 4000);
      })
      .catch(function(err) {
        Materialize.toast('Error al actualizar personaje', 4000);
      });
    };

    $scope.onSaveCharacter = function() {
      if($scope.selectedCharacter.id) {
        _this.caseUpdateCharacter();
      }
      else {
        _this.caseCreateCharacter();
      }
    };

  }

  angular.module('series').controller('CharactersEditionCtrl', [
    '$scope',
    'CharactersAPI',
    'serie',
    CharactersEditionCtrl
  ]);
})();