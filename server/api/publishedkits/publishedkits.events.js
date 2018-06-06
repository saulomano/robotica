/**
 * Published model events
 */

'use strict';

import {EventEmitter} from 'events';
var PublishedKitsEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PublishedKitsEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(PublishedKits) {
  for(var e in events) {
    let event = events[e];
    PublishedKits.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    PublishedKitsEvents.emit(`${event}:${doc._id}`, doc);
    PublishedKitsEvents.emit(event, doc);
  };
}

export {registerEvents};
export default PublishedKitsEvents;
