const { MessageEmbed } = require('discord.js');
const ModModel = require('../../models/ModModel');

module.exports = {
    name: 'removewarn',
    description: 'Removes all the warn from a member.',
    category: 'moderation',
    usage: 'removewarn <Member/ID>',
    aliases: ['remove-warn', 'rw', 'delwarn'],
    clientPermissions: ['MANAGE_MESSAGES'],
    userPermissions: ['MANAGE_MESSAGES'],
    cooldowns: 10,
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
                    description:
                        'Please specify a member to remove their warnings.',
                    color: 'RED',
                })
            );

        if (target.id === message.author.id) {
            return message.channel.send(
                new MessageEmbed({
                    author: {
                        name: message.author.tag,
                        iconURL: message.author.displayAvatarURL({
                            dynamic: true,
                        }),
                    },
                    description: "You can't do that.",
                    color: 'RED',
                })
            );
        }

        const User = await ModModel.findOne({
            guildId: message.guild.id,
            userId: target.id,
        });

        if (!User) {
            return message.channel.send(
                new MessageEmbed({
                    author: {
                        name: message.author.tag,
                        iconURL: message.author.displayAvatarURL({
                            dynamic: true,
                        }),
                    },
                    description:
                        "Looks like that user doesn't have any warnings yet.",
                    color: 'RED',
                })
            );
        }

        await User.deleteOne().catch((err) =>
            console.log(client.chalk.red(err))
        );
        return message.channel.send(
            new MessageEmbed({
                author: {
                    name: message.author.tag,
                    iconURL: message.author.displayAvatarURL({
                        dynamic: true,
                    }),
                },
                description: `Successfully remove ${target} warning(s)`,
                color: 'GREEN',
            })
        );
    },
};
