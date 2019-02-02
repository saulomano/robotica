/**
 * Resource model events
 */

'use strict';

import {EventEmitter} from 'events';
var NoticiaEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
NoticiaEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Noticia) {
  for(var e in events) {
    let event = events[e];
    Noticia.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    NoticiaEvents.emit(`${event}:${doc._id}`, doc);
    NoticiaEvents.emit(event, doc);
  };
}

export {registerEvents};
export default NoticiaEvents;
