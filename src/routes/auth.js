const express= require('express');
const router= express.Router();
const {signUp, signIn} = require("../controllers/AuthController");

router.post("/api/v1/auth/signup", signUp);
router.post("/api/v1/auth/login", signIn);

module.exports = router;
