/**
 * Category model events
 */

'use strict';

import {EventEmitter} from 'events';
var SchoolsEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SchoolsEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(School) {
  for(var e in events) {
    let event = events[e];
    School.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    SchoolsEvents.emit(`${event}:${doc._id}`, doc);
    SchoolsEvents.emit(event, doc);
  };
}

export {registerEvents};
export default SchoolsEvents;
