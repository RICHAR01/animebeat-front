(function() {
  'use strict';

  function DisqusDirective($location) {
    function link(scope, element, attrs) {
      
      var htmlText = 
        '<div id="disqus_thread"></div>' +
        '  <script>' +
        '    var disqus_config = function () {' +
        '      this.page.url = "' + $location.absUrl() + '";' +
        '      this.page.identifier = "' + scope.identifier + '";' + 
        '      this.page.title = "' + scope.title + '";' + 
        '    };' +
        '  </script>';

      element.html(htmlText);

      var resetDisqus = function() {
        window.DISQUS.reset({
          reload: true,
          config : function() {
            this.page.url        = $location.absUrl();
            this.page.identifier = scope.identifier;
            this.page.title      = scope.title;
          }
        });
      };

      var setDisqus = function() {
        var d = document, s = d.createElement('script');
      
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
        title: '='
      }
    };
  }

  angular.module('core').directive('disqus', [
    '$location',
    DisqusDirective
  ]);
})();