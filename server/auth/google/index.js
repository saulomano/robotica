'use strict';

import express from 'express';
import passport from 'passport';
import {setTokenCookie, isAuthenticated} from '../auth.service';

var router = express.Router();

router
  .get('/', passport.authenticate('google', {
    failureRedirect: '/signup',
    scope: [
      'profile',
      'email'
    ],
    session: false
  }))
  .get('/success', isAuthenticated(), (req, res) => {
    let user = req.user || {};
    res.end(`<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title></title>
    </head>
    <body>
      <script>
        window.userRole = '${user.role}';
        window.close();
      </script>
    </body>
    </html>`);
  })
  .get('/callback', passport.authenticate('google', {
    failureRedirect: '/signup',
    session: false
  }), setTokenCookie, (req, res) => {
    //console.log(req);
    res.redirect('/auth/google/success');
  });

export default router;
