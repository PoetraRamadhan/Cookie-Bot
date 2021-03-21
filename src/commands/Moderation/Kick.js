const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'kick',
    description: 'Kick a member from the server',
    category: 'moderation',
    usage: 'kick <Member/ID> [reason]',
    clientPermissions: ['KICK_MEMBERS'],
    userPermissions: ['KICK_MEMBERS'],
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
                    description: 'Please specify a member to kick.',
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
                    description: 'You cannot kick yourself.',
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
                    description: 'You cannot kick the guild owner.',
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

        let reason = args.slice(1).join(' ');
        if (!reason) reason = 'No reason';

        if (target.kickable) {
            try {
                target.kick(reason);
                message.channel.send(
                    new MessageEmbed({
                        author: {
                            name: message.author.tag,
                            iconURL: message.author.displayAvatarURL({
                                dynamic: true,
                            }),
                        },
                        description: `Successfully kicked ${target.user.tag} with the reason of ${reason}`,
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
                    description: 'Cannot kick that member.',
                    color: 'RED',
                })
            );
        }
    },
};
