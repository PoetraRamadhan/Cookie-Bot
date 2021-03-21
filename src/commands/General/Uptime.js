const { MessageEmbed } = require('discord.js');
const ms = require('pretty-ms');

module.exports = {
    name: 'uptime',
    description: 'Shows how long have the bot been online',
    category: 'general',
    usage: 'uptime',
    cooldowns: 3,
    run: async (client, message, args) => {
        return message.channel.send(
            new MessageEmbed({
                author: {
                    name: client.user.tag,
                    iconURL: client.user.displayAvatarURL(),
                },
                description: `🟢︱Online: ${ms(client.uptime, {
                    verbose: true,
                    compact: true,
                })}`,
                color: 'RANDOM',
            })
        );
    },
};
