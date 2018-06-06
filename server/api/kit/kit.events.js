/**
 * Resource model events
 */

'use strict';

import {EventEmitter} from 'events';
var KitEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
KitEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Kit) {
  for(var e in events) {
    let event = events[e];
Kit.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    KitEvents.emit(`${event}:${doc._id}`, doc);
    KitEvents.emit(event, doc);
  };
}

export {registerEvents};
export default KitEvents;
