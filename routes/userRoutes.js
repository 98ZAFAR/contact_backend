const express = require('express');
const { registerUser, loginUser, currentUser, resetPass} = require('../controllers/userController');
const validation = require('../middleware/validationTokenHandler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current",validation, currentUser);

router.post("/forgot-password", resetPass);

router.post("/reset-password/:id/:token", async (req, res) => {
    const { password } = req.body;
    const { id, token } = req.params;
    console.log(id, token);

    try {
        const user = await User.findOne({ _id: id });
        if (!user) {
            return res.status(400).json({ message: 'User Not Found!' });
        }

        const secret = process.env.ACCESS_TOKEN_SECRET;
        const verify = jwt.verify(token, secret); // Verify the token

        if (verify) {
            const newHashedPass = await bcrypt.hash(password, 10); // Await hash generation
            await user.updateOne({ password: newHashedPass }); // Await update

            return res.status(200).json({ message: 'Password updated successfully!' });
        } else {
            return res.status(400).json({ message: 'Token verification failed!' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
});

module.exports = router;