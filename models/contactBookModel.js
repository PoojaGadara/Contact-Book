const mongoose = require('mongoose')
const validator = require('validator')

const contactSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true,'Please Enter Your Name']
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
    address: {
        city: {
            type: String,
        },
        street: {
            type: String,
        },
        region: {
            type: String,
        },
        postcode: {
            type: String,
        },
        country: {
            type: String,
        }
    }
});

module.exports = mongoose.model('contact',contactSchema)