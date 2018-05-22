/**
 * PropuestaDesafio model events
 */

'use strict';

import {EventEmitter} from 'events';
var PropuestaDesafioEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PropuestaDesafio.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(PropuestaDesafio) {
  for(var e in events) {
    let event = events[e];
    PropuestaDesafio.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    PropuestaDesafioEvents.emit(`${event}:${doc._id}`, doc);
    PropuestaDesafioEvents.emit(event, doc);
  };
}

export {registerEvents};
export default PropuestaDesafioEvents;
