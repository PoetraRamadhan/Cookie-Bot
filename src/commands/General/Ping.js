const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Sends the latency',
    category: 'general',
    usage: 'ping',
    cooldowns: 3,
    run: async (client, message, args) => {
        const msg = await message.channel.send('Pinging...');
        const pingEmbed = new MessageEmbed({
            author: {
                name: client.user.tag,
                iconURL: client.user.displayAvatarURL(),
            },
            description: `🏓︱Round: \`${
                (msg.editedTimestamp || msg.createdTimestamp) -
                (message.editedTimestamp || message.createdTimestamp)
            }ms\` - ❤︱HeartBeat: \`${client.ws.ping}ms\``,
            color: 'RANDOM',
        });
        return msg.edit(pingEmbed);
    },
};
