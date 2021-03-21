const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'clear',
    description: 'Clear messages from your channel',
    category: 'moderation',
    usage: 'clear <amount>',
    aliases: ['purge', 'clean'],
    clientPermissions: ['MANAGE_MESSAGES'],
    userPermissions: ['MANAGE_MESSAGES'],
    run: async (client, message, args) => {
        if (
            !args.length ||
            isNaN(args[0]) ||
            parseInt(args[0]) > 100 ||
            parseInt(args[0]) < 0
        ) {
            return message.channel.send(
                new MessageEmbed({
                    author: {
                        name: message.author.tag,
                        iconURL: message.author.displayAvatarURL({
                            dynamic: true,
                        }),
                    },
                    description: 'Please provide a number between 1 - 100',
                    color: 'RED',
                })
            );
        }

        const messages = await message.channel.messages.fetch({
            limit: parseInt(args[0]),
        });
        const isAble = messages.filter((msg) => !msg.pinned);
        await message.delete();
        await message.channel.bulkDelete(isAble);

        return message.channel
            .send(
                new MessageEmbed({
                    author: {
                        name: message.author.tag,
                        iconURL: message.author.displayAvatarURL({
                            dynamic: true,
                        }),
                    },
                    description: `Successfully deleted ${args[0]} messages`,
                    color: 'GREEN',
                })
            )
            .then((msg) => msg.delete({ timeout: 10000 }));
    },
};
