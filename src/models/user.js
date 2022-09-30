const mongoose = require('mongoose'), Schema = mongoose.Schema;
//user schema
let userSchema = new Schema({
    first_name: {
        type: String,
        required: [true,'First name is required']
    },
    last_name: {
        type: String,
        required: [true,'Last name is required']
    },
    username: {
        type: String,
        required: [true,'Username is required']
    },
    email: {
        type: String,
        unique: [true,'Email already taken'],
        lowercase: true,
        trim: true,
        required: [true,'Email is required'],
    },
    phone_number: {
        type: String,
        required: [true, 'Phone number is required'],
    },
    role: {
        type: String,
        enum: ['admin', 'manager', 'user'],
        required: [true, 'Please specify a user role']
    },
    password: {
        type: String,
        required: [true, 'Password is a required field'],
        minLength: 8,
    },
    created_at: {
        type: Date,
        default: new Date
    }
});
module.exports =mongoose.model('User', userSchema)
