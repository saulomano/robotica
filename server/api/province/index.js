'use strict';

import {Router} from 'express';
import * as controller from './province.controller';
import * as auth from '../../auth/auth.service';
import querymen from 'querymen';

var router = new Router();

//Get all province
//Get a single district from province

// router.get('/', querymen.middleware(), controller.index);
// router.put('/:id', auth.hasRole('admin'), controller.update);
// router.get('/province/:name', auth.isAuthenticated(), controller.getByType);
router.get('/province/:name', auth.isAuthenticated(), controller.show);
// router.get('/:id', auth.isAuthenticated(), controller.show);
// router.post('/', auth.hasRole('admin'), controller.create);

module.exports = router;
