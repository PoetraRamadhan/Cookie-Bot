const { MessageEmbed } = require('discord.js');
const BakeryModel = require('../../models/BakeryModel');

module.exports = {
    name: 'buy',
    description: 'Buy some item from the shop to power up ypur bakery!',
    category: 'bakery',
    usage: 'buy <item> <amount>',
    cooldowns: 5,
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

        const worker = User.workers || 1;
        const shopPrice = {
            worker: {
                price: 215 * worker,
                emoji: '<:workers:820463325183344653>',
            },
        };

        let content;
        let contentTitle;
        let contentPrice;
        const userBuy = args[0];
        const amount = parseInt(args[1]);
        const items = Object.keys(shopPrice);

        for (const i in items) {
            content = `${shopPrice[items[i]].emoji} ${items[i]} - ${
                shopPrice[items[i]].price
            } Coins`;
            contentTitle = items[i];
            contentPrice = shopPrice[items[i]].price * amount;
        }

        if (!userBuy)
            return message.channel.send(
                new MessageEmbed({
                    title: 'Shop',
                    description: content,
                    color: 'RANDOM',
                    footer: 'Buy by using command: buy <item> <amount>',
                })
            );

        if (userBuy === contentTitle) {
            if (!amount)
                return message.channel.send(
                    new MessageEmbed({
                        description: 'Please specify an amount!',
                        color: 'RED',
                    })
                );

            if (User.coins < contentPrice)
                return message.channel.send(
                    new MessageEmbed({
                        description: `Oops! looks like you do not have the correct currency to purchase \`${contentTitle}\``,
                        color: 'RED',
                    })
                );

            if (userBuy === 'worker') {
                User.coins -= contentPrice;
                User.workers += amount;
                await User.save().catch((err) =>
                    console.log(client.chalk.red(err))
                );
                message.channel.send(
                    new MessageEmbed({
                        description: `Successfully purchased \`${userBuy}\`, Now you have \`${User.workers}\` Workers`,
                        color: 'GREEN',
                    })
                );
            }
        } else {
            return message.channel.send(
                new MessageEmbed({
                    description: `Oops! looks like \`${userBuy}\` is unavailable.`,
                    color: 'RED',
                })
            );
        }
    },
};
