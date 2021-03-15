const { Client, Message, MessageEmbed } = require("discord.js")

module.exports = {
    name: 'ban',
    description: 'Ban a member from the server',
    category: 'moderation',
    usage: 'Ban <Member/ID> [reason]',
    clientPermissions: ['BAN_MEMBERS'],
    userPermissions: ['BAN_MEMBERS'],
    cooldowns: 5,
    run: async (client, message, args) => {
        let banEmbed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

        const target = message.mentions.members.first() ||message.guild.members.cache.get(args[0]);

        if(!target) {
            banEmbed.setDescription('Please specify a member to ban.')
            banEmbed.setColor('RED')
            banEmbed.setFooter('You can use ID!')
            return message.channel.send(banEmbed);
        }

        if(target.id === message.guild.ownerId) {
            banEmbed.setDescription('You cannot ban the owner!')
            banEmbed.setColor('RED')
            return message.channel.send(banEmbed);
        }

        if(target.id === message.author.id) {
            banEmbed.setDescription('You cannot ban yourself!')
            banEmbed.setColor('RED')
            return message.channel.send(banEmbed);
        }

        const targetPosition = target.roles.highest.rawPosition;
        const modPosition = message.member.roles.highest.rawPosition;

        if(modPosition <= targetPosition) {
            banEmbed.setDescription('Access Denied!\nYou need to have a higher role.')
            banEmbed.setColor('RED')
            return message.channel.send(banEmbed);
        }

        let days = parseInt(args[1]);
        if(!days) days = 0;

        let reason = args.slice(2).join(' ');
        if(!reason) reason = 'No reason';

        if(target.bannable) {
            try {
                target.ban({ })
                banEmbed.setDescription(`Successfully banned ${target.user.tag} with the reason of ${reason}.`)
                banEmbed.setColor('GREEN')
                banEmbed.setFooter(`Ban ends in: ${days || 'Permanent'}`)
                return message.channel.send(banEmbed);
            } catch (error) {
                console.log(clint.chalk.red(error));
                banEmbed.setDescription(`Something went wrong...\n\`\`\`${error}\`\`\``)
                banEmbed.setColor('RED')
                banEmbed.setFooter('Please report this to the dev.')
                return message.channel.send(banEmbed);
            }
        } else {
            banEmbed.setDescription('Can\'t ban that member')
            banEmbed.setColor('RED')
            return message.channel.send(banEmbed);
        }
    }
}