const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    dob: { type: Date, required: true }
});

module.exports = mongoose.model('User', UserSchema);