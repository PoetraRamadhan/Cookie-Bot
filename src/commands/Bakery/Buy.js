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
        if(!User) return message.channel.send('You don\'t have any bakery opened!');
        const worker = User.workers || 1;
        const shopPrice = {
            worker: {
                price: 215 * worker,
                emoji: '<:workers:820463325183344653>'
            }
        };

        let content;
        let contentTitle;
        let contentPrice;
        const userBuy = args[0];
        const amount = parseInt(args[1]);
        const items = Object.keys(shopPrice);

        for(const i in items) {
            content = `${shopPrice[items[i]].emoji} ${items[i]} - ${shopPrice[items[i]].price} Coins`;
            contentTitle = items[i];
            contentPrice = shopPrice[items[i]].price * amount;
        }

        if(!userBuy) {
            const shopEmbed = new MessageEmbed()
            .setTitle('Shop')
            .setDescription(content)
            .setColor('RANDOM')
            .setFooter('Buy by using command: buy <item> <amount>')
            return message.channel.send(shopEmbed);
        }

        if(userBuy === contentTitle) {
            if(!amount) return message.channel.send('Please specify an amount!');
            if(User.coins < contentPrice) return message.channel.send(`Oops! looks like you do not have the correct currency to purchase \`${contentTitle}\``);
            if(userBuy === 'worker') {
                User.coins -= contentPrice;
                User.workers += amount;
                await User.save()
                .catch(err => console.log(client.chalk.red(err)));
                message.channel.send(`Successfully purchased \`${userBuy}\`, Now you have \`${User.workers}\` Workers`);
            }
        } else {
            return message.channel.send(`Oops! looks like \`${userBuy}\` is unavailable.`);
        }
    }
}