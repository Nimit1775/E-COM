
const router = require('express').Router();
const userCtr = require('../controllers/userController');
router.post('/register', userCtr.register);
router.post('/refreshtoken', userCtr.refreshtoken);
module.exports = router;
