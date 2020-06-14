const User = require('../models/User')
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.authenticateUser = async (req, res) => {

    // Check errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    // Destructure email & password
    const {email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        // Check user is registered
        if (!user) {
            return res.status(400).json({msg: 'The user doesn´t exist'})
        }

        // Check password
        const correctPassword = await bcryptjs.compare(password, user.password);
        if (!correctPassword) {
            return res.status(400).json({msg: 'Incorrect password'})
        }
        
        // Create and sign JWT
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600 // 1 hour
        }, (error, token) => {
            if(error) throw error;

            // Confirmation message
            res.json({ token: token });
            });


    } catch (error) {
        console.log(error);
    }
}