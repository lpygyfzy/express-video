const express = require('express');
const router = express.Router();
//引入user
router.use('/user',require('./user'))

module.exports = router;
