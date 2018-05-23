/**
 * Resource model events
 */

'use strict';

import {EventEmitter} from 'events';
var DesafioEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
DesafioEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Desafio) {
  for(var e in events) {
    let event = events[e];
    Desafio.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    DesafioEvents.emit(`${event}:${doc._id}`, doc);
    DesafioEvents.emit(event, doc);
  };
}

export {registerEvents};
export default DesafioEvents;
