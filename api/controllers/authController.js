const User = require('../models/user');
const jwt = require('jsonwebtoken')
const {verify} = require("jsonwebtoken");
const userRegistration = async (req, res) => {
    try {
        const {username, password} = req.body;
        const newUser = await User.create({username, password});
        if (newUser) {
            res.json({
                "message": `User ${username} created successfully!`,
            })
        }
    } catch (e) {
        const error = new Error(e)
        res.status(400).json({
            "Error": "An error occurred " + e.message
        })
    }
}

const userLogin = async (req, res) => {
    const {username, password} = req.body;
    try {
        const existingUser = await User.userExists(username);
        if (existingUser) {
            const isMatch = await existingUser.comparePassword(password);
            if (isMatch) {
                jwt.sign({username, id:existingUser._id},'peteristhebestcoderalive',{expiresIn: '1h'}, (err, token)=>{
                    if (err) throw err;
                   return  res.cookie('token', token).json({
                       "message":"Login successful",
                       id:existingUser._id,
                       username
                   })
                })
            } else {
                res.status(400).json({
                    "Error": "Invalid username and/or password"
                })
            }
        } else {
            res.status(400).json({
                "Error": "Invalid username and/or password"
            })
        }

    } catch (e) {
        const error = new Error(e)
        res.status(400).json({
            "Error": "An error occurred " + e.message
        })

    }
}

const userIsLoggedIn = (req, res) => {
    const {token} = req.cookies;
    if (!token) {
        throw new Error('Unauthorised! Access denied')
    } else {
        try {
            verify(token, 'peteristhebestcoderalive', (err, decoded) => {
                if (err) {
                    throw err;
                } else {
                    return res.status(200).json(decoded)
                }
            });

        } catch (e) {
            res.status(400).json({
                "message": "An error occurred " + e.message
            })
        }
    }

}
const logout = (req, res) => {
    res.clearCookie('token').json({
        "message": "You have been logged out successfully!"
    })
}
module.exports = {
    userRegistration,
    userLogin,
    userIsLoggedIn,
    logout
}