const mongoose = require('mongoose')
const valid = require('validator')
const Schema = mongoose.Schema

const userSchema = new Schema({  //create schema
    email: {
        type: String,
        trim: true,
        validate: {
            validator: (v) => {
                return valid.isEmail(v)
            },
            message: `{VALUE} is not an email`
        },

    },
    password: String
})

const User = mongoose.model('User', userSchema)  //create model 
// User = model name && userSchema = Schema
module.exports = User