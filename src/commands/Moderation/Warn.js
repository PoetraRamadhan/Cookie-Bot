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
                    description: 'Please specify a member to warn.',
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
                    description: 'You cannot warn yourself.',
                    color: 'RED',
                })
            );
        }

        const User = await ModModel.findOne({
            guildId: message.guild.id,
            userId: target.user.id,
        });

        let reason = args.slice(1).join(' ');
        if (!reason) reason = 'No reason';

        if (!User) {
            const newData = new ModModel({
                guildId: message.guild.id,
                userId: target.user.id,
                warns: [{ modId: message.author.id, reason: reason }],
            });
            await newData
                .save()
                .catch((err) => console.log(client.chalk.red(err)));

            return message.channel.send(
                new MessageEmbed({
                    author: {
                        name: message.author.tag,
                        iconURL: message.author.displayAvatarURL({
                            dynamic: true,
                        }),
                    },
                    description: `Successfully warned **${target.user.username}** with the reason of \`${reason}\`.`,
                    color: 'GREEN',
                })
            );
        } else {
            User.warns.unshift({
                modId: message.author.id,
                reason: reason,
            });
            await User.save().catch((err) =>
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
                    description: `Successfully warned **${target.user.username}** with the reason of \`${reason}\`.`,
                    color: 'GREEN',
                })
            );
        }
    },
};
