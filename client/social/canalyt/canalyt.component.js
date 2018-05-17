'use strict';
import angular from 'angular';
import SocialComponent from '../social.component';

export default class canalytComponent extends SocialComponent {
  /*@ngInject*/
  constructor($element, ngMeta, $http ) {
    super({$element});
    this.$http = $http;
    this.ngMeta =  ngMeta;


/*part=id, snippet
channelId=ID OF THE CHANNEL
order=date
type=video*/

   

    this.videos = [
      { video: 'https://www.youtube.com/watch?v=E813VYySueM' },
      { video: 'https://www.youtube.com/watch?v=E813VYySueM' },
      { video: 'https://www.youtube.com/watch?v=E813VYySueM' },
      { video: 'https://www.youtube.com/watch?v=E813VYySueM' },
      { video: 'https://www.youtube.com/watch?v=E813VYySueM' },
      { video: 'https://www.youtube.com/watch?v=E813VYySueM' },
      { video: 'https://www.youtube.com/watch?v=E813VYySueM' },
    ];

  
    

    ngMeta.setTitle('Canal Youtube');
    ngMeta.setTag('description', 'Canal Youtube Exclusivo proyecto de Robotica');
	}
  

  $onInit(){
    obtenerVideosPlaylist(youtubeFactory);
  }
  
  obtenerVideosPlaylist(){

    let url = 'https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId=UC2CIS5qTIV1hTfh2dSfBaEQ&maxResults=50&key=AIzaSyDlQjTcmgzmZRMS747O_ubCZ9X7s7dr6TI';


    

  /*  youtubeFactory.getVideosFromChannelById({
      channelId: "UC2CIS5qTIV1hTfh2dSfBaEQ", // converter: http://johnnythetank.github.io/youtube-channel-name-converter/
     // q: "<SEARCH_STRING>", // (optional) search string
      //location: "<SEARCH_LOCATION>", // (optional) The parameter value is a string that specifies latitude/longitude coordinates e.g. '37.42307,-122.08427'.
      //locationRadius: "<LOCATION_RADIUS>", // (optional) valid values e.g. '1500m', '5km', '10000ft', and '0.75mi' | default: '5000m'
      order: "date", // (optional) valid values: 'date', 'rating', 'relevance', 'title', 'videoCount', 'viewCount' | default: 'date'
      maxResults: "50", // (optional) valid values: 0-50 | default: 5
      //publishedAfter: "<PUBLISHED_AFTER>", // (optional) RFC 3339 formatted date-time value (1970-01-01T00:00:00Z)
      //publishedBefore: "<PUBLISHED_AFTER>", // (optional) RFC 3339 formatted date-time value (1970-01-01T00:00:00Z)
      //regionCode: "<REGION_CODE>", // (optional) ISO 3166-1 alpha-2 country code
      //relevanceLanguage: "<RELEVANCE_LANGUAGE>", // (optional) ISO 639-1 two-letter language code
      //safeSearch: "<SAFE_SEARCH>", // (optional) valid values: 'moderate','none','strict' | defaut: 'moderate'
      
      videoEmbeddable: "true", // (optional) valid values: 'true', 'any' | default: 'true'
      videoLicense: "any", // (optional) valid values: 'any','creativeCommon','youtube'
      videoSyndicated: "true", // (optional) restrict a search to only videos that can be played outside youtube.com. valid values: 'any','true' | default: 'any'
      //fields: "<FIELDS>", // (optional) Selector specifying which fields to include in a partial response
      //nextPageToken: "<NEXT__PAGE_TOKEN>", // (optional) either `nextPageToken` or `prevPageToken`
      //prevPageToken: "<PREV__PAGE_TOKEN>", // (optional) either `nextPageToken` or `prevPageToken`
      part: "snippet", // (optional) default: 'id,snippet'
      key: "AIzaSyDlQjTcmgzmZRMS747O_ubCZ9X7s7dr6TI",
  }).then(function (_data) {
     alert(data);
  }).catch(function (_data) {
      //on error
      alert(_data);
  });*/
   
  }

 

}
