const { MessageEmbed } = require('discord.js');
const ConfigModel = require('../../models/ConfigModel');

module.exports = {
    name: 'setmuterole',
    description: 'Sets the mute role for the mute command',
    category: 'configuration',
    usage: 'setmuterole <@role/muterole_id>',
    aliases: ['set-mute-role', 'smr'],
    clientPermissions: ['MANAGE_ROLES'],
    userPermissions: ['MANAGE_ROLES'],
    cooldowns: 5,
    run: async (client, message, args) => {
        let embed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

        const roles = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
        if(!roles) {
            embed.setDescription('Please mention a role or specify an id.')
            embed.setColor('RANDOM')
            return message.channel.send(embed);
        }

        const MuteRole = await ConfigModel.findOne({ guildId: message.guild.id });
        if(!MuteRole) {
            const newData = new ConfigModel({
                guildId: message.guild.id,
                muteRoleId: roles.id
            });
            await newData.save()
            .catch(err => console.log(client.chalk.red(err)));
            embed.setDescription(`The mute role has been set to **${roles.name}**`)
            embed.setColor('GREEEN')
            return message.channel.send(embed);
        } else {
            await MuteRole.updateOne({ muteRoleId: roles.id });
            embed.setDescription(`The mute role has been updated to **${roles.name}**`)
            embed.setColor('GREEN')
            return message.channel.send(embed);
        }
    }
}