const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Sends the latency',
    category: 'general',
    usage: 'ping',
    cooldowns: 3,
    run: async (client, message, args) => {
        const msg = await message.channel.send('Pinging...');
        const pingEmbed = new MessageEmbed()
        .setAuthor(client.user.tag, client.user.displayAvatarURL())
        .setDescription(`🏓︱Round: \`${(msg.editedTimestamp || msg.createdTimestamp) - (message.editedTimestamp || message.createdTimestamp)}ms\` - ❤︱HeartBeat: \`${client.ws.ping}ms\``)
        .setColor('RANDOM')
        return msg.edit(pingEmbed);
    }
}