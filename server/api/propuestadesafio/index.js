'use strict';

import {Router} from 'express';
import * as controller from './propuestadesafio.controller';
import * as auth from '../../auth/auth.service';
import querymen from 'querymen';

var router = new Router();

router.get('/', auth.isAuthenticated(), querymen.middleware(), controller.index);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.post('/:id/publish', auth.hasRole('admin'), controller.publish);
module.exports = router;