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
        let bakedEmbed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setColor('RANDOM')

        if(!User) {
            bakedEmbed.setColor('RED')
            bakedEmbed.setDescription('You don\'t have any bakery opened!');
        }

        const randomCookie = Math.floor(Math.random() * 5) + 1;
        if(User.workers) {
            User.cookies += randomCookie * User.workers;
            await User.save()
            .catch(err => console.log(client.chalk.red(err)));
            bakedEmbed.setDescription(`You just baked ${randomCookie * User.workers} 🍪`)
        } else {
            User.cookies += randomCookie;
            await User.save()
            .catch(err => console.log(client.chalk.red(err)));
            bakedEmbed.setDescription(`You just baked ${randomCookie} 🍪`)
        }
        message.channel.send(bakedEmbed);
    }
}