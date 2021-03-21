const { MessageEmbed } = require('discord.js');
const ConfigModel = require('../../models/ConfigModel');

module.exports = {
    name: 'test',
    description: 'For testing commands, move along',
    category: 'dev',
    usage: 'test ',
    ownerOnly: true,
    cooldowns: 5,
    run: async (client, message, args) => {
        const Config = await ConfigModel.findOne({ guildId: message.guild.id });
        console.log(Config);
    },
};
