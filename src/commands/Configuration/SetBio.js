const { MessageEmbed } = require('discord.js');
const UserModel = require('../../models/UserModel');

module.exports = {
    name: 'setbio',
    description: 'Set a costum bio for your userinfo',
    category: 'configuration',
    usage: 'setbio <some-random-thing>',
    aliases: ['set-bio'],
    cooldowns: 10,
    run: async (client, message, args) => {
        const User = await UserModel.findOne({ userId: message.author.id });
        const bio = args.join(' ');

        if(!bio || bio.length > 200) return message.channel.send(
            new MessageEmbed({
                author: {
                    name: message.author.tag,
                    iconURL: message.author.displayAvatarURL({ dynamic: true })
                },
                description: 'You need to provide the thing you want to show on your bio\nMax character is: `200`',
                color: 'RED'
            })
        );

        if(!User) {
            const newData = new UserModel({
                userId: message.author.id,
                bio: bio
            });
            await newData.save().catch((err) => console.log(client.chalk.red(err)));
            return message.channel.send(
                new MessageEmbed({
                    author: {
                        name: message.author.tag,
                        iconURL: message.author.displayAvatarURL({ dynamic: true })
                    },
                    description: 'Your bio has been set up!',
                    color: 'GREEN',
                    footer: 'Use the `userinfo` command to show your bio'
                })
            );
        } else {
            await User.updateOne({ bio: bio }).catch((err) => console.log(client.chalk.red(err)));
            return message.channel.send(
                new MessageEmbed({
                    author: {
                        name: message.author.tag,
                        iconURL: message.author.displayAvatarURL({ dynamic: true })
                    },
                    description: 'Your bio has been updated!',
                    color: 'GREEN',
                    footer: 'Use the `userinfo` command to show your bio'
                })
            );
        }
    },
};
