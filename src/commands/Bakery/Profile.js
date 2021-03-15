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
        let profileEmbed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setColor('RANDOM')

        if(!User) {
            profileEmbed.setDescription('You don\'t have any bakery opened!')
            profileEmbed.setColor('RED');
        }
        profileEmbed.setDescription(`-> ${User.cookies} <:cookies:820462558422499358> - Cookies\n-> ${User.coins} <:coins:820462619076067428> - Coins\n-> ${User.workers} <:workers:820463325183344653> - Workers`)
        message.channel.send(profileEmbed);
    }
}