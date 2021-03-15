const { MessageEmbed } = require('discord.js');
const BakeryModel = require('../../models/BakeryModel');

module.exports = {
    name: 'start',
    description: 'Starts your bakery journey!',
    category: 'bakery',
    usage: 'start',
    cooldowns: 5,
    run: async (client, message, args) => {
        const User = await BakeryModel.findOne({ userId: message.author.id });
        let startEmbed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setColor('GREEN')

        if(User) {
            startEmbed.setDescription('You already opened a bakery!')
            startEmbed.setColor('RED')
        } else {
            const newData = new BakeryModel({
                userId: message.author.id,
                workers: 0,
                cookies: 0,
                coins: 0
            });
            await newData.save()
            .catch(err => console.log(client.chalk.red(err)));
            startEmbed.setDescription('Succesfully opened a new bakery, Welcome and get ready to bake those cookies!')
        }
        message.channel.send(startEmbed);
    } 
}
