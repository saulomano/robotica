'use strict';

import express from 'express';
import uploader from './uploader';
import * as auth from '../auth/auth.service';

var router = express.Router();

router.get('/file/:filename', require('./file.controller').default);
router.post('/upload', auth.isAuthenticated(), require('./uploader').default);

export default router;