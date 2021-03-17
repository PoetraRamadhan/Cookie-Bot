const { MessageEmbed } = require('discord.js');
const ModModel = require('../../models/ModModel');

module.exports = {
    name: 'warn',
    description: 'Warns a member',
    category: 'moderation',
    usage: 'warn <Member/ID> [reason]',
    clientPermissions: ['MANAGE_MESSAGES'],
    userPermissions: ['MANAGE_MESSAGES'],
    cooldowns: 10,
    run: async (client, message, args) => {
        let warnEmbed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())

        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(target.id === message.author.id) {
            warnEmbed.setDescription('You cannot warn yourself.')
            warnEmbed.setColor('RED')
            return message.channel.send(warnEmbed);
        }

        const User = await ModModel.findOne({ guildId: message.guild.id, userId: target.user.id });

        let reason = args.slice(1).join(' ');
        if(!reason) reason = 'No reason'

        if(!User) {
            const newData = new ModModel({
                guildId: message.guild.id,
                userId: target.user.id,
                warns: [{ modId: message.author.id, reason: reason }]
            });
            await newData.save()
            .catch(err => console.log(client.chalk.red(err)));
            warnEmbed.setDescription(`Successfully warned **${target.user.username}** with the reason of \`${reason}\`.`)
            warnEmbed.setColor('GREEN')
            return message.channel.send(warnEmbed);
        } else {
            User.warns.unshift({
                modId: message.author.id,
                reason: reason
            });
            await User.save()
            .catch(err => console.log(client.chalk.red(err)));
            warnEmbed.setDescription(`Successfully warned **${target.user.username}** with the reason of \`${reason}\`.`)
            warnEmbed.setColor('GREEN')
            return message.channel.send(warnEmbed);
        }
    }
}