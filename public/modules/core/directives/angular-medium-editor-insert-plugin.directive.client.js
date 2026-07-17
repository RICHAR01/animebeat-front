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

(function(){
  'use strict';

  function MediumInsert($timeout) {
    
    function link(scope, elem, attr, ngModel) {

      $timeout(function() {
        var editor = $('medium-editor').length ? $('medium-editor') : $('[medium-editor]');

        editor.mediumInsert({
          editor: ngModel.editor,
          addons: scope.insertAddons
        })
      });

    }

    return {
      restrict: 'EA',
      require: '^ngModel',
      link: link,
      scope: {
        insertAddons: '='
      }
    };
    
  }

  angular.module('core').directive('mediumInsert', [
    '$timeout',
    MediumInsert
  ]);
})();
