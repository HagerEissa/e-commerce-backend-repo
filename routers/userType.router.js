const express = require('express');

const router = express.Router();

const userTypeController = require('../controllers/userType.controller');
const auth = require('../utili/auth')
// router.post('/',auth.authMW,userTypeController.createUserType);
// router.get('/',auth.authMW,userTypeController.getUserType);

router.post('/',userTypeController.createUserType);
router.get('/',userTypeController.getUserType);


module.exports = router;