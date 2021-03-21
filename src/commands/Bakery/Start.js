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
        if (User)
            return message.channel.send(
                new MessageEmbed({
                    author: {
                        name: message.author.tag,
                        iconURL: message.author.displayAvatarURL({
                            dynamic: true,
                        }),
                    },
                    description: 'You already opened a bakery',
                    color: 'RED',
                })
            );

        const newData = new BakeryModel({
            userId: message.author.id,
            workers: 1,
            cookies: 0,
            coins: 0,
        });
        await newData.save().catch((err) => console.log(client.chalk.red(err)));
        return message.channel.send(
            new MessageEmbed({
                author: {
                    name: message.author.tag,
                    iconURL: message.author.displayAvatarURL({ dynamic: true }),
                },
                description:
                    'Succesfully opened a new bakery, Welcome and get ready to bake those cookies!',
                color: 'GREEN',
            })
        );
    },
};
