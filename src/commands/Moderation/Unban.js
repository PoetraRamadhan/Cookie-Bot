const { MessageEmbed, Client } = require('discord.js');

module.exports = {
    name: 'unban',
    description: 'Unban a member from the server using ID',
    category: 'moderation',
    usage: 'unban <ID>',
    clientPermissions: ['BAN_MEMBERS'],
    userPermissions: ['BAN_MEMBERS'],
    cooldowns: 5,
    run: async (client, message, args) => {
        const target = await client.users.fetch(args[0]);

        if (!target) {
            return message.channel.send(
                new MessageEmbed({
                    author: {
                        name: message.author.tag,
                        iconURL: message.author.displayAvatarURL({
                            dynamic: true,
                        }),
                    },
                    description: 'Please specify a member.',
                    color: 'RED',
                    footer: 'You can also use ID of the member!',
                })
            );
        }

        if (target === message.author.id) {
            unbanEmbed.setDescription('You cannot unban yourself!');
            unbanEmbed.setColor('RED');
            return message.channel.send(
                new MessageEmbed({
                    author: {
                        name: message.author.tag,
                        iconURL: message.author.displayAvatarURL({
                            dynamic: true,
                        }),
                    },
                    description: 'You cannot unban yourself.',
                    color: 'RED',
                })
            );
        }

        let reason = args.slice(1).join(' ');
        if (!reason) reason = 'No reason';

        try {
            await message.guild.members.unban(target, reason);
            unbanEmbed.setDescription(
                `Successfuly unbanned ${target.user.username} with the reason of ${reason}.`
            );
            unbanEmbed.setColor('GREEN');
            return message.channel.send(
                new MessageEmbed({
                    author: {
                        name: message.author.tag,
                        iconURL: message.author.displayAvatarURL({
                            dynamic: true,
                        }),
                    },
                    description: `Successfuly unbanned ${target.user.username} with the reason of ${reason}.`,
                    color: 'GREEN',
                })
            );
        } catch (error) {
            console.log(client.chalk.red(error));
            return message.channel.send(
                new MessageEmbed({
                    author: {
                        name: message.author.tag,
                        iconURL: message.author.displayAvatarURL({
                            dynamic: true,
                        }),
                    },
                    description: `Something went wrong...\n\`\`\`${error}\`\`\``,
                    footer: 'Please report this to the dev.',
                    color: 'RED',
                })
            );
        }
    },
};
