'use strict';

import {Router} from 'express';
import * as controller from './tipoDesafio.controller';
import * as auth from '../../auth/auth.service';
import querymen from 'querymen';

var router = new Router();

router.get('/', querymen.middleware(), controller.index);
router.put('/:id', auth.hasRole('admin'), controller.update);
router.get('/type/:type', auth.isAuthenticated(), controller.getByType);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.hasRole('admin'), controller.create);

module.exports = router;