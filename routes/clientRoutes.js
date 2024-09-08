const express = require('express');
const path = require('path');
const router = express.Router();
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

router.get('/login', (req, res)=>{
    res.sendFile(path.join(__dirname, '../client/login.html'));
});

router.get('/register', (req, res)=>{
    res.sendFile(path.join(__dirname, '../client/register.html'));
});

router.get('/contacts', (req, res)=>{
    res.sendFile(path.join(__dirname, '../client/contacts.html'));
});

router.get('/reset-password/:id/:token', async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;

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