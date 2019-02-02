'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================

let secret = require('../secret');
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://35.226.12.143:27017/robotica-desarrollo'
  },

  google: {
    clientID: process.env.GOOGLE_ID || secret.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET || secret.GOOGLE_SECRET,
    callbackURL: `http://localhost:3000/auth/google/callback`
  },

  // Seed database on startupgulp
  seedDB: false

};
