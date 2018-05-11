'use strict';

import {Router} from 'express';
import * as controller from './resource.controller';
import * as auth from '../../auth/auth.service';
import querymen from 'querymen';

var router = new Router();

router.get('/', auth.hasRole('curador', 'index'), querymen.middleware(), controller.index);
router.get('/user/desafios', auth.hasRole('user', 'getDesafiosByUser'), querymen.middleware(), controller.getDesafiosByUser);
router.delete('/:id', auth.hasRole('admin', 'destroy'), controller.destroy);
router.put('/:id', auth.hasRole('curador', 'update'), controller.update);
router.get('/:id', auth.hasRole('curador', 'show'), controller.show);
router.post('/:id/publish', auth.hasRole('curador', 'publish'), controller.publish);
router.post('/', auth.hasRole('curador', 'create'), controller.create);

module.exports = router;