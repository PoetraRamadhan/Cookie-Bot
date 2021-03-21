const { MessageEmbed } = require('discord.js');
const BakeryModel = require('../../models/BakeryModel');

module.exports = {
    name: 'profile',
    description: 'Shows the profile of your bakery',
    category: 'bakery',
    usage: 'profile',
    cooldowns: 10,
    run: async (client, message, args) => {
        const User = await BakeryModel.findOne({ userId: message.author.id });
        if (!User)
            return message.channel.send(
                new MessageEmbed({
                    author: {
                        name: message.author.tag,
                        iconURL: message.author.displayAvatarURL({
                            dynamic: true,
                        }),
                    },
                    description:
                        "You don't have any bakery open!\nUse `start` command to start your journey.",
                    color: 'RED',
                })
            );

        return message.channel.send(
            new MessageEmbed({
                author: {
                    name: message.author.tag,
                    iconURL: message.author.displayAvatarURL({ dynamic: true }),
                },
                description: `-> ${User.cookies} <:cookies:820462558422499358> - Cookies\n-> ${User.coins} <:coins:820462619076067428> - Coins\n-> ${User.workers} <:workers:820463325183344653> - Workers`,
                color: 'RANDOM',
            })
        );
    },
};
