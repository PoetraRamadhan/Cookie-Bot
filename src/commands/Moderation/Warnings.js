const { MessageEmbed } = require('discord.js');
const ModModel = require('../../models/ModModel');

module.exports = {
    name: 'warnings',
    description: 'Sends you a list of warns from a member',
    category: 'moderation',
    usage: 'warnings <Member/ID>',
    cooldowns: 5,
    run: async (client, message, args) => {
        let warningsEmbed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

        const userWarns = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;
        console.log(userWarns.id)

        const User = await ModModel.findOne({ guildId: message.guild.id, userId: userWarns.id });
        if(!User) {
            warningsEmbed.setDescription('Looks like that user doesn\'t have any warnings yet.')
            warningsEmbed.setColor('RED')
            return message.channel.send(warningsEmbed)
        }

        warningsEmbed.setDescription(`${User.warns.map((warns, index) => `[${++index}] - Warned By: <@${warns.modId}>\nReason: \`${warns.reason}\``).join('\n')}`)
        warningsEmbed.setColor('GREEN')
        return message.channel.send(warningsEmbed);
    }
}