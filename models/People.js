const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PeopleSchema = new Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String, required: true },
    position: { type: String, required: true },
    age: { type: String, required: true },
    gender: { type: String, required: true },
    married: { type: String, required: true },
    country: { type: String, required: true },
    town: { type: String, required: true }
});

module.exports = mongoose.model('People', PeopleSchema);