const { MessageEmbed } = require('discord.js');
const BakeryModel = require('../../models/BakeryModel');

module.exports = {
    name: 'bake',
    description: 'Bakes some cookies!',
    category: 'bakery',
    usage: 'bake',
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

        const randomCookie = Math.floor(Math.random() * 5) + 1;
        User.cookies += randomCookie * User.workers;
        await User.save().catch((err) => console.log(client.chalk.red(err)));
        return message.channel.send(
            new MessageEmbed({
                author: {
                    name: message.author.tag,
                    iconURL: message.author.displayAvatarURL({ dynamic: true }),
                },
                description: `You just baked ${
                    randomCookie * User.workers
                } <:cookies:820462558422499358>`,
                color: 'RANDOM',
            })
        );
    },
};
