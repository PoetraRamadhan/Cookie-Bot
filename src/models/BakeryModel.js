const mongoose = require('mongoose');

const BakerySchema = new mongoose.Schema({
    userId: String,
    workers: Number,
    cookies: Number,
    coins: Number,
});

module.exports = mongoose.model('bakery', BakerySchema);
