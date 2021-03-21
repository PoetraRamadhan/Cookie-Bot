const { MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'ban',
    description: 'Ban a member from the server',
    category: 'moderation',
    usage: 'Ban <Member/ID> [reason]',
    clientPermissions: ['BAN_MEMBERS'],
    userPermissions: ['BAN_MEMBERS'],
    cooldowns: 5,
    run: async (client, message, args) => {
        const target =
            message.mentions.members.first() ||
            message.guild.members.cache.get(args[0]);

        if (!target)
            return message.channel.send(
                new MessageEmbed({
                    author: {
                        name: message.author.tag,
                        iconURL: message.author.displayAvatarURL({
                            dynamic: true,
                        }),
                    },
                    description: 'Please specify a member',
                    color: 'RED',
                })
            );

        if (target.id === message.author.id)
            return message.channel.send(
                new MessageEmbed({
                    author: {
                        name: message.author.tag,
                        iconURL: message.author.displayAvatarURL({
                            dynamic: true,
                        }),
                    },
                    description: 'You cannot ban yourself.',
                    color: 'RED',
                })
            );

        if (target.id === message.guild.ownerId)
            return message.channel.send(
                new MessageEmbed({
                    author: {
                        name: message.author.tag,
                        iconURL: message.author.displayAvatarURL({
                            dynamic: true,
                        }),
                    },
                    description: 'You cannot ban the guild owner.',
                    color: 'RED',
                })
            );

        const targetPosition = target.roles.highest.rawPosition;
        const modPosition = message.member.roles.highest.rawPosition;

        if (modPosition <= targetPosition)
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

        let time = args[1];
        if (!time) time = 0;

        let reason = args.slice(2).join(' ');
        if (!reason) reason = 'No reason';

        if (target.bannable) {
            try {
                target.ban({ days: ms(time), reason: reason });
                message.channel.send(
                    new MessageEmbed({
                        author: {
                            name: message.author.tag,
                            iconURL: message.author.displayAvatarURL({
                                dynamic: true,
                            }),
                        },
                        description: `Successfully banned ${target.user.tag} with the reason of ${reason}`,
                        footer: `Ban ends in ${days || 'Permanent'}`,
                        color: 'GREEN',
                    })
                );
            } catch (error) {
                console.log(client.chalk.red(error));
            }
        } else {
            return message.channel.send(
                new MessageEmbed({
                    author: {
                        name: message.author.tag,
                        iconURL: message.author.displayAvatarURL({
                            dynamic: true,
                        }),
                    },
                    description: 'Cannot ban that member.',
                    color: 'RED',
                })
            );
        }
    },
};
