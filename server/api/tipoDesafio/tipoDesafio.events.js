/**
 * Category model events
 */

'use strict';

import {EventEmitter} from 'events';
var TipoDesafioEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TipoDesafioEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(TipoDesafio) {
  for(var e in events) {
    let event = events[e];
    TipoDesafio.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    TipoDesafioEvents.emit(`${event}:${doc._id}`, doc);
    TipoDesafioEvents.emit(event, doc);
  };
}

export {registerEvents};
export default TipoDesafioEvents;
