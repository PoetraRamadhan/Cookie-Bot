const { MessageEmbed } = require('discord.js');
const UserModel = require('../../models/UserModel');

module.exports = {
    name: 'test',
    description: 'For testing commands, move along',
    category: 'dev',
    usage: 'test ',
    ownerOnly: true,
    cooldowns: 5,
    run: async (client, message, args) => {
        const Config = await UserModel.findOne({ userId: message.author.id });
        console.log(Config);
    },
};
