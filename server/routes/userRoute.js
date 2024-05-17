
const router = require('express').Router();
const userCtr = require('../controllers/userController');
router.post('/register', userCtr.register);
router.post('/refreshtoken', userCtr.refreshtoken);
router.post('/login'  , userCtr.login);
module.exports = router;
