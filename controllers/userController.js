const User = require('../models/User')
const bcryptjs = require('bcryptjs');

exports.createUser = async (req, res) => {

    // Destructure email & password
    const {email, password } = req.body;
    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({msg: 'The user already exists'})
        }

        // Create new user
        user =  new User(req.body);

        // Hash password
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);

        // Save user
        await user.save();

        // Confirmation message
        res.json({ msg:'User created correctly'});
    } catch (error) {
        console.log(error);
        res.status(400).send('There was am error');
    }
}