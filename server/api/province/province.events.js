/**
 * Category model events
 */

'use strict';

import {EventEmitter} from 'events';
var ProvinceEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ProvinceEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Province) {
  for(var e in events) {
    let event = events[e];
    Province.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    ProvinceEvents.emit(`${event}:${doc._id}`, doc);
    ProvinceEvents.emit(event, doc);
  };
}

export {registerEvents};
export default ProvinceEvents;
