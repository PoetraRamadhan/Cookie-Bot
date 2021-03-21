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
        const member =
            message.mentions.members.first() ||
            message.guild.members.cache.get(args[0]);
        if (!member)
            return message.channel.send(
                new MessageEmbed({
                    author: {
                        name: message.author.tag,
                        iconURL: message.author.displayAvatarURL({
                            dynamic: true,
                        }),
                    },
                    description: 'Please specify a member.',
                    color: 'RED',
                    footer: 'You can also use ID of the member!',
                })
            );

        const role = message.guild.roles.cache.get(args[1]);
        if (!role)
            return message.channel.send(
                new MessageEmbed({
                    author: {
                        name: message.author.tag,
                        iconURL: message.author.displayAvatarURL({
                            dynamic: true,
                        }),
                    },
                    description: 'Please specify a role ID',
                    color: 'RED',
                })
            );

        const memberPosition = member.roles.highest.rawPosition;
        const moderationPosition = message.member.roles.highest.rawPosition;

        if (moderationPosition <= memberPosition)
            return message.channel.send(
                new MessageEmbed({
                    author: {
                        name: message.author.tag,
                        iconURL: message.author.displayAvatarURL({
                            dynamic: true,
                        }),
                    },
                    description:
                        'Access Denied!\nYou need to be on a higher role.',
                    color: 'RED',
                })
            );

        try {
            member.roles.add(role);
            return message.channel.send(
                new MessageEmbed({
                    author: {
                        name: message.author.tag,
                        iconURL: message.author.displayAvatarURL({
                            dynamic: true,
                        }),
                    },
                    description: `Added role to ${member}`,
                    color: 'GREEN',
                })
            );
        } catch (error) {
            console.log(client.chalk.red(err));
            return message.channel.send(
                new MessageEmbed({
                    description: `\`\`\`ERROR: ${error}\`\`\``,
                    color: 'RED',
                })
            );
        }
    },
};
