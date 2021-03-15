const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'kick',
    description: 'Kick a member from the server',
    category: 'moderation',
    usage: 'kick <Member/ID> [reason]',
    clientPermissions: ['KICK_MEMBERS'],
    userPermissions: ['KICK_MEMBERS'],
    cooldowns: 5,
    run: async (client, message, args) => {
        let kickEmbed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

        const target = message.mentions.members.first() ||message.guild.members.cache.get(args[0]);

        if(!target) {
            kickEmbed.setDescription('Please specify a member to kick.')
            kickEmbed.setColor('RED')
            kickEmbed.setFooter('You can use ID!')
            return message.channel.send(kickEmbed);
        }

        if(target.id === message.guild.ownerId) {
            kickEmbed.setDescription('You cannot kick the owner!')
            kickEmbed.setColor('RED')
            return message.channel.send(kickEmbed);
        }

        if(target.id === message.author.id) {
            kickEmbed.setDescription('You cannot kick yourself!')
            kickEmbed.setColor('RED')
            return message.channel.send(kickEmbed);
        }

        const targetPosition = target.roles.highest.rawPosition;
        const modPosition = message.member.roles.highest.rawPosition;

        if(modPosition <= targetPosition) {
            kickEmbed.setDescription('Access Denied!\nYou need to have a higher role.')
            kickEmbed.setColor('RED')
            return message.channel.send(kickEmbed);
        }

        let reason = args.slice(1).join(' ');
        if(!reason) reason = 'No reason';

        if(target.kickable) {
            try {
                target.kick(reason);
                kickEmbed.setDescription(`Successfully kicked ${target.user.tag} with the reason of \`${reason}.\``)
                kickEmbed.setColor('GREEN')
                return message.channel.send(kickEmbed);
            } catch (error) {
                console.log(clint.chalk.red(error));
                kickEmbed.setDescription(`Something went wrong...\n\`\`\`${error}\`\`\``)
                kickEmbed.setColor('RED')
                kickEmbed.setFooter('Please report this to the dev.')
                return message.channel.send(kickEmbed);
            }
        } else {
            kickEmbed.setDescription('Can\'t kick that member')
            kickEmbed.setColor('RED')
            return message.channel.send(kickEmbed);
        }
    }
}