const Users = require('../models/userModel.js');
const jwt = require('jsonwebtoken');

exports.generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.SECRET_KEY, {
        expiresIn: '4h',
    });
};

exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await Users.findOne({ username });

        if (user && await user.matchPassword(password)) {
            if (user.status !== 'active') {
                return res.status(404).send('User has been deactivated by admin...');
            }
            res.status(200).send({
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                token: exports.generateToken(user._id, user.role),
            });
        } else {
            return res.status(400).send({ message: 'Invalid Credentials..' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send({ message: 'Internal Server Error', error: error.message });
    }
};

exports.registerUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const userExist = await Users.findOne({ username });
        if (userExist) {
            return res.status(200).send('User already exists');
        }
        const emailExist = await Users.findOne({ email });
        if (emailExist) {
            return res.status(200).send('Email already registered');
        }
        const user = new Users({
            username: username,
            email: email,
            password: password,
            role: role,
        });
        await user.save();
        res.status(200).send({ message: 'User registered successfully...', user });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const user = await Users.findById(req.user.id);
        if (user) {
            res.status(200).send({
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                status: user.status,
            });
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await Users.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await Users.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.deleteUserById = async (req, res) => {
    try {
        const user = await Users.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send({ message: 'User deleted successfully', user });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.deactivateUser = async (req, res) => {
    try {
        const user = await Users.findByIdAndUpdate(req.params.id, { status: 'inactive' }, { new: true });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.send({ message: "User Deactivated", user });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.activateUser = async (req, res) => {
    try {
        const user = await Users.findByIdAndUpdate(req.params.id, { status: 'active' }, { new: true });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.send({ message: "User Activated", user });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Logout user
exports.logoutUser = (req, res) => {
    res.json({ message: 'User logged out successfully' });
};
