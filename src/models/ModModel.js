const mongoose = require('mongoose');

const ModSchema = new mongoose.Schema({
    guildId: String,
    userId: String,
    warns: Array,
});

module.exports = mongoose.model('moderation', ModSchema);