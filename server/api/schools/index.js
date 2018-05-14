'use strict';

import {Router} from 'express';
import * as controller from './schools.controller';
import * as auth from '../../auth/auth.service';
import querymen from 'querymen';

var router = new Router();

// Get all schools/distritcs
router.get('/:name', querymen.middleware(), controller.getAvailableDistricts);

// Get single school/district using the district name as param
router.get('/district/:name', querymen.middleware(), controller.show);

module.exports = router;
