'use strict';

// Use local.env.js for environment variables that will be set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

let secret = require('./secret');

module.exports = {
  DOMAIN: 'http://localhost:9000',
  SESSION_SECRET: secret.SESSION_SECRET,

  GOOGLE_ID: secret.GOOGLE_ID,
  GOOGLE_SECRET: secret.GOOGLE_ID,

  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
