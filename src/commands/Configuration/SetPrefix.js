const { MessageEmbed } = require('discord.js');
const ConfigModel = require('../../models/ConfigModel');

module.exports = {
    name: 'setprefix',
    description: 'Set a costum prefix for your server',
    category: 'configuration',
    usage: 'setpreix <prefix>',
    aliases: ['set-prefix'],
    clientPermissions: ['MANAGE_GUILD'],
    userPermissions: ['MANAGE_GUILD'],
    cooldowns: 10,
    run: async (client, message, args) => {
        const Config = await ConfigModel.findOne({ guildId: message.guild.id });
        const costumPrefix = args[0];

        let prefixEmbed = new MessageEmbed().setAuthor(
            message.author.tag,
            message.author.displayAvatarURL({ dynamic: true })
        );

        if (!costumPrefix)
            return message.channel.send(
                "Oops! looks like you didn't specify a prefix."
            );
        if (costumPrefix.length > 5)
            return message.channel.send(
                'Costum prfix cannot be longer than 4 character.'
            );

        if (!Config) {
            const newData = new ConfigModel({
                guildId: message.guild.id,
                prefix: costumPrefix,
            });
            await newData
                .save()
                .catch((err) => console.log(client.chalk.red(err)));
            prefixEmbed.setDescription(
                `The guild prefix has been changed to \`${costumPrefix}\``
            );
            prefixEmbed.setColor('GREEN');
            return message.channel.send(prefixEmbed);
        } else {
            await Config.updateOne({ prefix: costumPrefix });
            prefixEmbed.setDescription(
                `The guild prefix has been updated to \`${costumPrefix}\``
            );
            prefixEmbed.setColor('GREEN');
            return message.channel.send(prefixEmbed);
        }
    },
};
