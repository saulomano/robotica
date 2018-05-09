'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://35.231.205.37:27017/robotica-dev'
  },

  // Seed database on startup
  seedDB: false

};
