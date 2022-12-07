const mongoose = require('mongoose')
const validator = require('validator');

const userSchema = new mongoose.Schema({

    username:{
        type: String,
        required:[true,'Enter username'],
    },
    email:{
        type: String,
        validate:{
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email',
            isAsync: false
          },
        required:[true,'Enter Email'],
        unique :true
    },
    password:{
        type: String,
        required:[true,'Enter Password'],
        validate:{
            validator: validator.isStrongPassword,
            message: 'Password is not valid'
          },
        },
    token:{
        type:String,
    }
    
})

const userModel = mongoose.model('user' , userSchema)

module.exports=userModel;