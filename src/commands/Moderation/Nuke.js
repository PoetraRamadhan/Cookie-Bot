const { MessageEmbed, MessageCollector } = require('discord.js');

module.exports = {
    name: 'nuke',
    description: 'Nukes the current channel and makes a clone of it.',
    category: 'moderation',
    usage: 'nuke',
    clientPermissions: ['MANAGE_CHANNELS'],
    userPermissions: ['MANAGE_CHANNELS'],
    cooldowns: 30,
    run: async (client, message, args) => {
        message.channel.send(
            new MessageEmbed({
                author: {
                    name: message.author.tag,
                    iconURL: message.author.displayAvatarURL({
                        dynamic: true,
                    }),
                },
                description: `Are you sure you want to delete **${message.channel.name}**? \`yes/no\``,
                color: 'YELLOW',
            })
        );

        const filter = (msg) => msg.author.id === message.author.id;
        const collector = new MessageCollector(message.channel, filter);
        collector.on('collect', (msg) => {
            if (msg.content === 'yes') {
                msg.channel.send(
                    new MessageEmbed({
                        author: {
                            name: message.author.tag,
                            iconURL: message.author.displayAvatarURL({
                                dynamic: true,
                            }),
                        },
                        description: 'Deleting channel...',
                        color: 'GREEN',
                    })
                );
                setTimeout(async () => {
                    await msg.channel.delete();
                    msg.channel.clone();
                    collector.stop();
                }, 5000);
            } else if (msg.content === 'no') {
                msg.channel.send(
                    new MessageEmbed({
                        author: {
                            name: message.author.tag,
                            iconURL: message.author.displayAvatarURL({
                                dynamic: true,
                            }),
                        },
                        description: 'Cancelling command...',
                        color: 'GREEN',
                    })
                );
                collector.stop();
            } else {
                msg.channel.send(
                    new MessageEmbed({
                        author: {
                            name: message.author.tag,
                            iconURL: message.author.displayAvatarURL({
                                dynamic: true,
                            }),
                        },
                        description: 'Invalid response, please try again.',
                        color: 'RED',
                    })
                );
            }
        });
    },
};
