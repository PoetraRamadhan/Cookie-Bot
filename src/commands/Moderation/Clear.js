const { MessageEmbed } = require('discord.js');
const ms = require('pretty-ms');

module.exports = {
    name: 'clear',
    description: 'Clear messages from your channel',
    category: 'moderation',
    usage: 'clear <amount>',
    aliases: ['purge', 'clean'],
    clientPermissions: ['MANAGE_MESSAGES'],
    userPermissions: ['MANAGE_MESSAGES'],
    run: async (client, message, args) => {
        let clearEmbed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

        if(!args.length || isNaN(args[0]) || parseInt(args[0]) > 100 || parseInt(args[0]) < 0) {
            clearEmbed.setDescription('Please provide a number between 1 - 100')
            clearEmbed.setColor('RED')
            return message.channel.send(clearEmbed);
        }

        const messages = await message.channel.messages.fetch({ limit: parseInt(args[0]) });
        const isAble = messages.filter((msg) => !msg.pinned);
        await message.delete();
        await message.channel.bulkDelete(isAble);

        clearEmbed.setDescription(`Successfully deleted ${args[0]} messages`)
        clearEmbed.setColor('GREEN')
        return message.channel.send(clearEmbed);

    }
}