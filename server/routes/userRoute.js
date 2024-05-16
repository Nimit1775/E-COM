
const router = require('express').Router();
const userCtr = require('../controllers/userController');
router.post('/register', userCtr.register);
module.exports = router;
