const express = require('express');
const zod = require('zod');
const { User } = require('../Model/userSchema'); // Ensure this path is correct
const jwt = require('jsonwebtoken');
const router = express.Router();

const { JWT_SECRET } = require('../config');

// Define Zod schema for validating signup body
const signupBody = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6),
    firstName: zod.string(),
    lastName: zod.string(),
});

router.post('/signup', async (req, res) => {
    // Validate incoming request body using Zod
    const success = signupBody.safeParse(req.body);
    if (!success.success) {
        return res.status(411).json({
            message: "Incorrect inputs or missing fields",
        });
    }

    const { username, password, firstName, lastName } = req.body;

    // Check if the username (email) already exists
    const existingUser = await User.findOne({
        username: username, // Looking for user with this email
    });

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken",
        });
    }

    // Create a new user
    const user = await User.create({
        username,
        password,
        firstName,
        lastName,
    });

    // Create a JWT token with the user ID
    const userId = user._id;
    const token = jwt.sign(
        { userId },
        JWT_SECRET,
        { expiresIn: '1h' } // Optional: Set token expiration time
    );

    // Respond with a success message and the token
    res.status(201).json({
        msg: "User created successfully",
        token: token,
    });
});

module.exports = router;
