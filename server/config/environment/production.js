'use strict';
/*eslint no-process-env:0*/

let secret = require('../secret');

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip: process.env.OPENSHIFT_NODEJS_IP
    || process.env.ip
    || undefined,

  // Server port
  port: process.env.OPENSHIFT_NODEJS_PORT
    || process.env.PORT
    || 8080,

  // MongoDB connection options
  mongo: {
    uri: process.env.MONGODB_URI
      || process.env.MONGOHQ_URL
      || process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME
      || 'mongodb://localhost/robotica'
  },
  
  google: {
    clientID: process.env.GOOGLE_ID || secret.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET || secret.GOOGLE_SECRET,
    callbackURL: `https://robotica.abc.gob.ar/auth/google/callback`
  }
};
