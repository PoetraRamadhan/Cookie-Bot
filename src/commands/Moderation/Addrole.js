const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'addrole',
    description: 'Add role to the specific member by the role ID',
    category: 'moderation',
    usage: 'addrole <Member/ID> <RoleID>',
    clientPermissions: ['MANAGE_ROLES'],
    userPermissions: ['MANAGE_ROLES'],
    cooldowns: 3,
    run: async (client, message, args) => {
        let roleEmbed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!member) return message.channel.send('Please provide a user.');

        const role = message.guild.roles.cache.get(args[1]);
        if(!role) return message.channel.send('Please provide a role ID');

        const memberPosition = member.roles.highest.rawPosition;
        const moderationPosition = message.member.roles.highest.rawPosition;

        if(moderationPosition <= memberPosition) {
            roleEmbed.setDescription('Access Denied!\nYou need to have a higher role.')
            roleEmbed.setColor('RED')
            return message.channel.send(roleEmbed);
        }

        try {
            member.roles.add(role);
            roleEmbed.setDescription('Succesfully added role')
            roleEmbed.setColor('GREEN');
            return message.channel.send(roleEmbed);
        } catch (err) {
            console.log(err);
            roleEmbed.setDescription(`\`\`\`ERROR: ${err}\`\`\``)
            roleEmbed.setColor('RED')
            return message.channel.send(roleEmbed);
        }
    }
}