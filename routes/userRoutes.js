const express = require('express');
const { registerUser, loginUser, currentUser, resetPass} = require('../controllers/userController');
const validation = require('../middleware/validationTokenHandler');
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current",validation, currentUser);

router.post("/forgot-password", resetPass);

module.exports = router;