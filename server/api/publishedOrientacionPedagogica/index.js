'use strict';

import {Router} from 'express';
import * as controller from './publishedOrientacionPedagogica.controller';
import * as auth from '../../auth/auth.service';
import querymen from 'querymen';

var router = new Router();

router.get('/', querymen.middleware(), querymen.middleware(), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.put('/:id', auth.hasRole('admin'), controller.update);
router.get('/:id/relations', querymen.middleware(), controller.relations);
router.get('/:id/download', controller.download);
router.get('/:id', controller.show);
router.post('/', auth.hasRole('admin'), controller.create);
router.get('/findArea/:area',  querymen.middleware(), querymen.middleware(), controller.findArea);


module.exports = router;