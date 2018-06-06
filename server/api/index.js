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
router.use('/publisheddesafios', require('./publisheddesafios'));
router.use('/noticias', require('./noticias'));
router.use('/publishednoticia', require('./publishednoticia'));
router.use('/orientacionPedagogica', require('./orientacionPedagogica'));
router.use('/publishedOrientacionPedagogica', require('./publishedOrientacionPedagogica'));
router.use('/publishedkits', require('./publishedkits'));
router.use('/kit', require('./kit'));


router.use(writer());

module.exports = router;