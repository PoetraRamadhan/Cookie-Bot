const { MessageEmbed, Client } = require('discord.js');

module.exports = {
    name: 'unban',
    description: 'Unban a member from the server using ID',
    category: 'moderation',
    usage: 'unban <ID>',
    clientPermissions: ['BAN_MEMBERS'],
    userPermissions: ['BAN_MEMBERS'],
    cooldowns: 5,
    run: async (client, message, args) => {
        let unbanEmbed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

        const target = await client.users.fetch(args[0]);

        if(!target) {
            unbanEmbed.setDescription('Please specify a member to unban.')
            unbanEmbed.setColor('RED')
            return message.channel.send(unbanEmbed);
        }

        if(target === message.author.id) {
            unbanEmbed.setDescription('You cannot unban yourself!')
            unbanEmbed.setColor('RED')
            return message.channel.send(unbanEmbed);
        }

        let reason = args.slice(1).join(' ');
        if(!reason) reason = 'No reason';

        try {
            await message.guild.members.unban(target, reason);
            unbanEmbed.setDescription(`Successfuly unbanned ${target.user.username} with the reason of ${reason}.`)
            unbanEmbed.setColor('GREEN')
            return message.channel.send(unbanEmbed);
        } catch (error) {
            console.log(client.chalk.red(error));
            unbanEmbed.setDescription(`Something went wrong...\n\`\`\`${error}\`\`\``)
            unbanEmbed.setColor('RED')
            unbanEmbed.setFooter('Please report this to the dev.')
            return message.channel.send(unbanEmbed);
        }
    }
}