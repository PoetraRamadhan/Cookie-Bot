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
        let sellEmbed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setColor('GREEN')

        if(!User) {
            sellEmbed.setDescription('You don\'t have any bakery opened!')
            sellEmbed.setColor('RED');
        }

        if(!User.cookies) {
            sellEmbed.setDescription('You don\'t have any cookies to sell.')
            sellEmbed.setColor('RED')
        }

        const amount = parseInt(args[0]);
        if(!amount) {
            sellEmbed.setDescription('Please provide a amount!')
            sellEmbed.setColor('RED')
        } else {
            User.cookies -= amount;
            User.coins += amount * 2;
            sellEmbed.setDescription(`You just sold ${amount} <:cookies:820462558422499358> and earned ${amount * 2} <:coins:820462619076067428>`)
        }
        await User.save()
        .catch(err => console.log(client.chalk.red(err)));
        message.channel.send(sellEmbed);
    }
}