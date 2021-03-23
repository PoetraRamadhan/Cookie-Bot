const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userId: String,
    bio: String,
});

module.exports = mongoose.model('user', UserSchema);
