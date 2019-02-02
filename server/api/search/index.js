'use strict';

import {Router} from 'express';
import * as controller from './search.controller';
import * as auth from '../../auth/auth.service';
import querymen from 'querymen';

var router = new Router();

router.get('/', querymen.middleware(), querymen.middleware(), controller.index);


module.exports = router;