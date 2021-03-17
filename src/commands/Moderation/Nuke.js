const { Client, Message, MessageEmbed, MessageCollector } = require("discord.js")

module.exports = {
    name: 'nuke',
    description: 'Nukes the current channel and makes a clone of it.',
    category: 'moderation',
    usage: 'nuke',
    clientPermissions: ['MANAGE_CHANNELS'],
    userPermissions: ['MANAGE_CHANNELS'],
    cooldowns: 30,
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        let embed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`Are you sure you want to delete **${message.channel.name}**? \`yes/no\``)
        .setColor('YELLOW')

        const filter = (msg) => msg.author.id === message.author.id;

        message.channel.send(embed);
        const collector = new MessageCollector(message.channel, filter);
        collector.on('collect', (msg) => {
            if(msg.content === 'yes') {
                embed.setDescription('Deleting Channel..')
                embed.setColor('GREEN')
                msg.channel.send(embed);
                setTimeout(async() => {
                    await msg.channel.delete();
                    msg.channel.clone();
                    collector.stop();
                }, 5000)
            } else if(msg.content === 'no') {
                embed.setDescription('Command has been cancelled.')
                embed.setColor('RED')
                msg.channel.send(embed);
                collector.stop();
            } else {
                embed.setDescription('Invalid response, please try again.')
                embed.setColor('RED')
                msg.channel.send(embed);
            }
        });
    }
}