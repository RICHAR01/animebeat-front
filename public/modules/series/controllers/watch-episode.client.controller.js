(function() {
  'use strict';

  function WatchEpisodeCtrl($scope, AppConfig, $timeout, $window, EpisodesAPI, $stateParams, VisitsAPI) {
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

    this.setVideoInDefaultPlayer = function(newVideo) {
      var openloadUrl = '';
      // if (angular.element('.cinema-frame')[0].offsetWidth > 900) {
      //   openloadUrl = 'https://youtube.googleapis.com/embed/?status=ok&allow_embed=0&ps=docs&partnerid=30&docid=' + newVideo.url + '&showinfo=0&autoplay=0&nohtml5=1';
      // }
      // else {
        openloadUrl = 'https://drive.google.com/file/d/' + newVideo.url + '/preview';
      // }
      var openloadIframe = '<iframe src="'+ openloadUrl +'" scrolling="no" frameborder="0" width="100%" height="100%" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe>';
      angular.element('#video-iframe-container').html(openloadIframe);
    };

    this.setOpenloadVideoPlayer = function(newVideo) {
      var openloadUrl = 'https://openload.co/embed/' + newVideo.url + '/';
      var openloadIframe = '<iframe src="'+ openloadUrl +'" scrolling="no" frameborder="0" width="100%" height="100%" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe>';
      angular.element('#video-iframe-container').html(openloadIframe);
    };

    this.setMp4uploadVideoPlayer = function(newVideo) {
      var mp4uploadUrl = 'https://www.mp4upload.com/embed-' + newVideo.url + '.html';
      var mp4uploadIframe = '<iframe src="' + mp4uploadUrl + '" frameborder=0 marginwidth=0 marginheight=0 scrolling=NO width=100% height=100% allowfullscreen></iframe>';
      angular.element('#video-iframe-container').html(mp4uploadIframe);
    };

		this.setOutVideoPlayer = function(newVideo) {
			var outUrl = newVideo.url;
      var outIframe = '<iframe src="' + outUrl + '" frameborder=0 marginwidth=0 marginheight=0 scrolling=NO width=100% height=100% allowfullscreen></iframe>';
			angular.element('#video-iframe-container').html(outIframe);
		};

    $scope.onVideoChange = function(selectedVideoId) {
      var newVideo = _.findWhere($scope.episode.videos, { id: selectedVideoId });
			$scope.selectedVideo = newVideo;

      $timeout(function() {

        if ($scope.selectedVideo.videoServerName === 'MoeStream') {
          _this.setVideoInDefaultPlayer(newVideo);
        }
        else if ($scope.selectedVideo.videoServerName === 'Openload') {
          _this.setOpenloadVideoPlayer(newVideo);
        }
				else if ($scope.selectedVideo.videoServerName === 'Mp4upload') {
          _this.setMp4uploadVideoPlayer(newVideo);
        }
				else if (['animeyt-videoAmazon', 'animeyt-videoMp4Upload', 'animeyt-videoYoutube',
									'animeyt-videoYT', 'animeyt-videoMega', 'animeyt-videoMinha',
									'animeyt-videoNaruto', 'animeyt-videoGoogleDrive', 'animeyt-videoDailymotion',
									'animeyt-videoOose'].indexOf($scope.selectedVideo.videoServerName) !== -1) {
					_this.setOutVideoPlayer(newVideo);
				}

      });

      _this.updateVideoPlayerSize();

    };

    this.setDefaultVideo = function(episode) {
      if (episode.videos.length) {
        var selectedVideoId = _.head(episode.videos).id;
        $scope.selectedVideoId = selectedVideoId;

        $scope.onVideoChange(selectedVideoId);
      }
    };

    this.fetchPlayEpisodeById = function() {
      EpisodesAPI.play({
        id: $stateParams.episodeId
      }).$promise
      .then(function(episode) {
        $scope.episode = episode;
        _this.setDefaultVideo(episode);
        AppConfig.setTitle(episode.serie.name + ' - Episodio ' + episode.number);
        $scope.isContentLoaded = true;
      })
      .catch(function() {
        Materialize.toast('No se pudo obtener episodio, intente de nuevo más tarde', 4000);
      });
    };

    this.updateVideoPlayerSize = function () {
      $timeout(function() {

        var cinema = angular.element('.cinema-frame');
        var cinemaHeight = cinema.outerHeight();
        var cinemaWidth = cinemaHeight * 1.7777777778;

        var videoContainer = angular.element('.cinema-frame-inner');

        if (videoContainer) {
          var videoContainerStyle = {
            height: cinemaHeight + 'px',
            width: cinemaWidth + 'px'
          };

          videoContainer.css(videoContainerStyle);
        }

      });
    };

    this.setVideoSizeResizer = function() {
      var watchAttribute = function () {
        return $window.innerWidth;
      };

      $scope.$watch(watchAttribute, _this.updateVideoPlayerSize, true);

      var explorerWindows = angular.element($window);

      explorerWindows.bind('resize', function(){
        $scope.$apply();
      });
    };

    this.saveUserVisit = function () {
      VisitsAPI.save({
        type: 'episode',
        serieId: '',
        episodeId: $stateParams.episodeId,
        username: ''
      });
    };

    this.fetchPlayEpisodeById();
    this.setVideoSizeResizer();
    this.saveUserVisit();

  }

  angular.module('series').controller('WatchEpisodeCtrl', [
    '$scope',
    'AppConfig',
    '$timeout',
    '$window',
    'EpisodesAPI',
    '$stateParams',
    'VisitsAPI',
    WatchEpisodeCtrl
  ]);
})();
