'use strict';
import angular from 'angular';
import SocialComponent from '../social.component';
import _ from 'lodash';
import $ from 'jquery';
export default class canalytComponent extends SocialComponent {
  /*@ngInject*/
  constructor($element,$scope, ngMeta, $http ) {
    super({$element});
    this.$http = $http;
    this.ngMeta =  ngMeta;
    this.$scope = $scope;

    this.videos = [];

    this.ngMeta.setTitle('Canal Youtube');
    this.ngMeta.setTag('description', 'Canal Youtube Exclusivo proyecto de Robotica');

    this.videos = this.obtenerVideosPlaylist();


      $scope.changeVideo = function(video) {

          document.getElementById('vid_frame').src='http://youtube.com/embed/'+video+'?autoplay=1&rel=0&showinfo=0&autohide=1';

          if (this.hash === "") {
              return;
          }

          var hash = this.hash;
          $('html, body').animate({
              scrollTop: 0
          }, 750);
      }

      $scope.changeVideoArrow = function(direction) {

          var scrollPos = $(".vid-list-container").scrollLeft();

          if (direction == 'right')
              scrollPos = scrollPos + 336;
          else
              scrollPos = scrollPos - 336;

          $(".vid-list-container").animate({//.stop().animate({
              scrollLeft: scrollPos
          }, 750);
      }
	}
  
  obtenerVideosPlaylist(){
    var videos=[];
    let url = 'https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId=UC2CIS5qTIV1hTfh2dSfBaEQ&maxResults=50&key=AIzaSyDlQjTcmgzmZRMS747O_ubCZ9X7s7dr6TI';

      this.$http({
        url: 'https://www.googleapis.com/youtube/v3/search',
        method: "GET",
        params: {  order:'date' ,
        part: 'snippet',
        channelId : 'UC2CIS5qTIV1hTfh2dSfBaEQ',
        maxResults:50,
        key :'AIzaSyDlQjTcmgzmZRMS747O_ubCZ9X7s7dr6TI' }
      }).then(function (response){   
      console.log(response)
      angular.forEach( response.data.items, function(item) {
        videos.push( { video: item.id.videoId , titulo: item.snippet.title , imagen: item.snippet.thumbnails.medium.url } ); 
      })}, function (error){
        console.log(error);
      });

      return videos;
    }



    
}
 