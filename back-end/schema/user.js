const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    address: { type: String },
    hobbies: { type: [String] },
    highestEducation: { type: String }
});

module.exports = User = new mongoose.model('User', userSchema);
