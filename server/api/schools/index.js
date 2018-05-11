'use strict';

import {Router} from 'express';
import * as controller from './schools.controller';
import * as auth from '../../auth/auth.service';
import querymen from 'querymen';

var router = new Router();

//Get all schools
//Get a single schools from district

// router.get('/', querymen.middleware(), controller.index);
// router.put('/:id', auth.hasRole('admin'), controller.update);
// router.get('/province/:name', auth.isAuthenticated(), controller.getByType);
// router.get('/:name', querymen.middleware(), controller.show);
router.get('/:name', querymen.middleware(), controller.getAvailableDistricts);
// router.get('/:id', auth.isAuthenticated(), controller.show);
// router.post('/', auth.hasRole('admin'), controller.create);

module.exports = router;
