'use strict';

import {Router} from 'express';
import * as controller from './desafio.controller';
import * as auth from '../../auth/auth.service';
import querymen from 'querymen';

var router = new Router();

router.get('/', auth.hasRole('user'), querymen.middleware(), controller.index);
router.delete('/:id', auth.hasRole('user'), controller.destroy);
router.put('/:id', auth.hasRole('user'), controller.update);
router.get('/:id', auth.hasRole('user'), controller.show);
router.post('/:id/publish', auth.hasRole('user'), controller.publish);
router.post('/', auth.hasRole('user'), controller.create);

module.exports = router;