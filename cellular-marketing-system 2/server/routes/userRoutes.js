
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Login route without password or secret code check for testing
router.post('/login', async (req, res) => {
    const { email } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found, creating new user for testing:", email);
            // If user doesn't exist, create one for testing purposes
            const newUser = new User({ name: 'Test User', email, password: 'password' });
            await newUser.save();
        }

        // Directly return success message without checking password or secret code
        console.log("User logged in successfully for testing:", email);
        res.json({ msg: 'User logged in successfully (test mode)' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
