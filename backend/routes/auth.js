const { SendOtp, createUser, loginUser } = require('../controllers/auth');

const router = require('express').Router();

router.post("/signup",  createUser);
router.post("/SendOtp",  SendOtp);
router.post("/login", loginUser);


module.exports = router;