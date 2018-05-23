/**
 * Published model events
 */

'use strict';

import {EventEmitter} from 'events';
var PublishedEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PublishedEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Published) {
  for(var e in events) {
    let event = events[e];
    Published.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    PublishedEvents.emit(`${event}:${doc._id}`, doc);
    PublishedEvents.emit(event, doc);
  };
}

export {registerEvents};
export default PublishedEvents;
