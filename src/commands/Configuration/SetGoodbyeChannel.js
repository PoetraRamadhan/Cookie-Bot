const { MessageEmbed } = require('discord.js');
const ConfigModel = require('../../models/ConfigModel');

module.exports = {
    name: 'setgoodbyechannel',
    description:
        'Set a costum goodbye channel to say farewell for the members that have left!',
    category: 'configuration',
    usage: 'setgoodbyechannel <#channel/channel-id>',
    aliases: ['set-goodbye-channel', 'sgc', 'sg'],
    clientPermissions: ['MANAGE_GUILD'],
    userPermissions: ['MANAGE_GUILD'],
    cooldowns: 10,
    run: async (client, message, args) => {
        const targetChannel =
            message.mentions.channels.first() ||
            message.guild.channels.cache.get(args[0]);
        if (!targetChannel)
            return message.channel.send(
                new MessageEmbed({
                    author: {
                        name: message.author.tag,
                        iconUrl: message.author.displayAvatarURL({
                            dynamic: true,
                        }),
                    },
                    description: 'Please specify a channel to be set up!',
                    color: 'RED',
                })
            );

        const Config = await ConfigModel.findOne({ guildId: message.guild.id });
        if (!Config) {
            const newData = new ConfigModel({
                guildId: message.guild.id,
                goodbyeChannelId: targetChannel.id,
            });
            await newData
                .save()
                .catch((err) => console.log(client.chalk.red(err)));
            return message.channel.send(
                new MessageEmbed({
                    author: {
                        name: message.author.tag,
                        iconUrl: message.author.displayAvatarURL({
                            dynamic: true,
                        }),
                    },
                    description: `Successfully set goodbye channel to ${targetChannel}`,
                    color: 'GREEN',
                })
            );
        } else {
            await Config.updateOne({ goodbyeChannelId: targetChannel.id });
            return message.channel.send(
                new MessageEmbed({
                    author: {
                        name: message.author.tag,
                        iconUrl: message.author.displayAvatarURL({
                            dynamic: true,
                        }),
                    },
                    description: `The goodbye channel has been updated to ${targetChannel}`,
                    color: 'GREEN',
                })
            );
        }
    },
};
