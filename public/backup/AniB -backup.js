
    $scope.extensions = ['MP4', 'MKV', 'XVID'];
    $scope.spaces = [100,200,300,350];
    $scope.fansubs = ['KKF', 'RBF', 'WZF', 'JDF'];

    $scope.downloads = {
      'MP4-250-WZF': [
        [{server: 'mega', url: 'mega-url-1'}, {server: 'mega', url: 'mega-url-1'}],
        [{server: 'mega', url: 'mega-url'}],
        [{server: 'mega', url: 'mega-url'}]
      ]/*,
      'MKV-350-KKF': [
        [{server: 'mega', url: 'mega-url'}],
        [{server: 'mega', url: 'mega-url'}],
        [{server: 'mega', url: 'mega-url'}]
      ]*/
    };

    $scope.addQuality = function () {
      console.log($scope.quality)
      var qualityName = $scope.quality.extension + '-' +
                        $scope.quality.space + '-' +
                        $scope.quality.fansub;

      if(!_this.hasQuality(qualityName)){
        $scope.downloads[qualityName] = [[{server: '', url: ''}]];
      }
      else
        Materialize.toast('Calidad existente, seleccione una distinta.', 4000);
    };

    $scope.addServer = function (episode) {
      console.log(episode);
      episode.push({});
    };

    $scope.addEpisode = function(quality) {
      quality.push([{}]);
    };


    $scope.openQualityEdition = function(currentQuality) {
      $scope.currentQuality = currentQuality;
      var newQuality = $scope.currentQuality.split('-');
      $scope.newQuality = {
        extension: newQuality[0],
        space: newQuality[1],
        fansub: newQuality[2]
      };

      _this.qualityEditionModal = angular.element('#animes-quality-edition');
      _this.qualityEditionModal.openModal();
    };

    $scope.changeQuality = function() {
      var newQuality = $scope.newQuality.extension + '-' +
                       $scope.newQuality.space + '-' +
                       $scope.newQuality.fansub;

      if(!_this.hasQuality(newQuality)){
        $scope.downloads[newQuality] = $scope.downloads[$scope.currentQuality];
        _.omit($scope.downloads, $scope.currentQuality) 
        _this.qualityEditionModal.closeModal();
        Materialize.toast('Calidad actualizada', 4000);
      }
      else
        Materialize.toast('Calidad existente, seleccione una distinta.', 4000);

    };

    this.hasQuality = function(qualityName) {
      return _.has($scope.downloads, qualityName);
    };