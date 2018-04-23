<% 
var capName = _.capitalize($this.name);
-%>
/**
 * <%- capName %> model events
 */

'use strict';

import {EventEmitter} from 'events';
var <%- capName %>Events = new EventEmitter();

// Set max event listeners (0 == unlimited)
<%- capName %>Events.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(<%- capName %>) {
  for(var e in events) {
    let event = events[e];
    <%- capName %>.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    <%- capName %>Events.emit(`${event}:${doc._id}`, doc);
    <%- capName %>Events.emit(event, doc);
  };
}

export {registerEvents};
export default <%- capName %>Events;
