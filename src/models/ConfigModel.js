const mongoose = require('mongoose');

const ConfigSchema = new mongoose.Schema({
    guildId: String,
    prefix: String,
    welcomeChannelId: String,
    goodbyeChannelId: String,
    muteRoleId: String,
});

module.exports = mongoose.model('config_server', ConfigSchema);
