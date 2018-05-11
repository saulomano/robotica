'use strict';
import angular from 'angular';
import SocialComponent from '../social.component';

export default class canalytComponent extends SocialComponent {
  /*@ngInject*/
  constructor($element, ngMeta) {
    super({$element});

    this.ngMeta =  ngMeta;

   

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
	
}
