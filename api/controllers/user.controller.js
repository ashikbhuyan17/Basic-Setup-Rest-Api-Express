const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User.Model');



const registerController = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        // Store hash in your password DB.
        if (err) {
            res.json({
                error: err
            })
        }
        // res.json({
        //     hash,
        //     original: req.body.password
        // })
        const user = new User({
            email: req.body.email,
            password: hash
        })
        user.save()
            .then(result => {
                res.status(201).json({
                    message: 'user created successfully',
                    user: result
                })
            })
    });
}


const loginController = (req, res, next) => {
    let email = req.body.email
    let password = req.body.password
    User.findOne({ email })  //  __id : id 
        .then(user => {
            if (user) {  //user er bitor jody kichu takhe tbe ...
                bcrypt.compare(password, user.password, (err, result) => {
                    // result == true
                    if (err) {
                        res.json({
                            message: 'Error Occured'
                        })
                    }
                    if (result) {
                        let token = jwt.sign({ email: user.email, _id: user._id }, 'SECRET', { expiresIn: '240h' })
                        res.json({
                            message: 'Login Successful',
                            tokenType: 'Bearer',
                            token
                        })
                    } else {
                        res.json({
                            message: ' password Does not match'
                        })
                    }
                })

            } else {
                res.json({
                    message: 'User not found'
                })
            }
        })

}


const getAllUser = (req, res, next) => {
    User.find()
        .then(user => {
            res.json({
                user: user
            })
        })
}

module.exports = {
    registerController,
    loginController, getAllUser
}