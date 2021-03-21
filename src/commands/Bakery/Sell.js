const { MessageEmbed } = require('discord.js');
const BakeryModel = require('../../models/BakeryModel');

module.exports = {
    name: 'sell',
    description: 'Sells your cookies to get coins!',
    category: 'bakery',
    usage: 'sell <amount>',
    cooldowns: 5,
    run: async (client, message, args) => {
        const User = await BakeryModel.findOne({ userId: message.author.id });
        if (!User)
            return mesage.channel.send(
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

        if (!User.cookies)
            return mesage.channel.send(
                new MessageEmbed({
                    author: {
                        name: message.author.tag,
                        iconURL: message.author.displayAvatarURL({
                            dynamic: true,
                        }),
                    },
                    description: "You don't have any cookie to sell!",
                    color: 'RED',
                })
            );

        const amount = args[0];
        if (!amount)
            return message.channel.send(
                new MessageEmbed({
                    author: {
                        name: message.author.tag,
                        iconURL: message.author.displayAvatarURL({
                            dynamic: true,
                        }),
                    },
                    description:
                        'Please specify an amount to sell.\nYou can also use `sell all`',
                    color: 'RED',
                })
            );

        if (amount === 'all') {
            User.coins += User.cookies * 2;
            User.cookies -= User.cookies;
            message.channel.send(
                new MessageEmbed({
                    author: {
                        name: message.author.tag,
                        iconURL: message.author.displayAvatarURL({
                            dynamic: true,
                        }),
                    },
                    description: `You sold all of your <:cookies:820462558422499358> and earned ${User.coins} <:coins:820462619076067428>`,
                    color: 'RANDOM',
                })
            );
        } else {
            User.cookies -= parseInt(amount);
            User.coins += parseInt(amount) * 2;
            message.chanel.send(
                new MessageEmbed({
                    author: {
                        name: message.author.tag,
                        iconURL: message.author.displayAvatarURL({
                            dynamic: true,
                        }),
                    },
                    description: `You sold ${amount} <:cookies:820462558422499358> and earned ${User.coins} <:coins:820462619076067428>`,
                    color: 'RANDOM',
                })
            );
        }
        await User.save().catch((err) => console.log(client.chalk.red(err)));
    },
};
