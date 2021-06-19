const mongoose = require('mongoose');
const Shcema = mongoose.Schema;

const userShcema = new Shcema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    tel: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    married: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    town: {
        type: String,
        required: true
    },
}, { timestamps: true });

const User = mongoose.model('User', userShcema);
module.exports = User;