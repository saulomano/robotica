'use strict';

import writer from './writer';

var express = require('express');

var router = express.Router();

router.use('/users', require('./user'));
router.use('/categories', require('./category'));
router.use('/resources', require('./resource'));
router.use('/publisheds', require('./published'));
router.use('/desafios', require('./desafio'));
router.use('/schools', require('./schools'));
router.use('/propuestadesafio', require('./propuestadesafio'));
router.use('/publishedpropuesta', require('./publishedpropuesta'));
router.use('/tipoDesafio', require('./tipoDesafio'));
router.use(writer());

module.exports = router;