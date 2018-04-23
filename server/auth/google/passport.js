import passport from 'passport';
import {Strategy as GoogleStrategy} from 'passport-google-oauth20';
var GooglePlusStrategy = require('passport-google-plus');
import fs from 'fs-extra';
import path from 'path';

export function setup(User, config) {
  passport.use(new GoogleStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    // check if the email is enabled
    let role = 'user';
    let fe = path.join(__dirname, '../available-emails.json');
    if (fs.existsSync(fe)) {
      let availables = fs.readJsonSync(fe);
      let gmail = profile.emails[0].value;
      if (availables.indexOf(gmail) > -1){
        role = 'curador';
      } else {
        return done(new Error("Usuario no habilitado"));
      }
    }

    User.findOne({'google.id': profile.id}).exec()
      .then(user => {
        if(user) {
          return done(null, user);
        }

        user = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          role: role,
          username: profile.emails[0].value.split('@')[0],
          provider: 'google',
          google: profile._json
        });
        user.save()
          .then(savedUser => done(null, savedUser))
          .catch(err => done(err));
      })
      .catch(err => done(err));
  }));
}
