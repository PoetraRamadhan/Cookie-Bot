const { MessageEmbed } = require('discord.js');
const ModModel = require('../../models/ModModel');

module.exports = {
    name: 'warnings',
    description: 'Sends you a list of warns from a member',
    category: 'moderation',
    usage: 'warnings <Member/ID>',
    cooldowns: 5,
    run: async (client, message, args) => {
        const userWarns =
            message.mentions.members.first() ||
            message.guild.members.cache.get(args[0]) ||
            message.author;
        console.log(userWarns.id);

        const User = await ModModel.findOne({
            guildId: message.guild.id,
            userId: userWarns.id,
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

        return message.channel.send(
            new MessageEmbed({
                author: {
                    name: message.author.tag,
                    iconURL: message.author.displayAvatarURL({
                        dynamic: true,
                    }),
                },
                description: `${User.warns
                    .map(
                        (warns, index) =>
                            `[${++index}] - Warned By: <@${
                                warns.modId
                            }>\nReason: \`${warns.reason}\``
                    )
                    .join('\n')}`,
                color: 'GREEN',
            })
        );
    },
};
