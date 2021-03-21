const { MessageEmbed } = require('discord.js');
const ConfigModel = require('../../models/ConfigModel');

module.exports = {
    name: 'unmute',
    description: 'Unmute a member if they are muted',
    category: 'moderation',
    usage: 'unmute <Member/ID>',
    clientPermissions: ['MANAGE_ROLES'],
    userPermissions: ['MANAGE_ROLES'],
    cooldowns: 5,
    run: async (client, message, args) => {
        const Guild = await ConfigModel.findOne({ guildId: message.guild.id });
        const muteRole = Guild.muteRoleId;

        const target =
            message.mentions.members.first() ||
            message.guild.members.cache.get(args[0]);

        if (!target)
            return message.channel.send(
                new MessageEmbed({
                    author: {
                        name: message.author.tag,
                        iconURL: message.author.displayAvatarURL({
                            dynamic: true,
                        }),
                    },
                    description: 'Please specify a member to unmute',
                    color: 'RED',
                })
            );

        if (
            target.roles.highest.position >=
            message.member.roles.highest.position
        )
            return message.channel.send(
                new MessageEmbed({
                    author: {
                        name: message.author.tag,
                        iconURL: message.author.displayAvatarURL({
                            dynamic: true,
                        }),
                    },
                    description:
                        'You cannot mute someone who is higher/same role as you!',
                    color: 'RED',
                })
            );

        if (target.roles.cache.has(muteRole)) {
            target.roles.remove(muteRole);
            return message.channel.send(
                new MessageEmbed({
                    author: {
                        name: message.author.tag,
                        iconURL: message.author.displayAvatarURL({
                            dynamic: true,
                        }),
                    },
                    description: `Successfully unmuted ${target}`,
                    color: 'GREEN',
                })
            );
        } else {
            return message.channel.send(
                new MessageEmbed({
                    author: {
                        name: message.author.tag,
                        iconURL: message.author.displayAvatarURL({
                            dynamic: true,
                        }),
                    },
                    description: 'That member is already unmuted!',
                    color: 'RED',
                })
            );
        }
    },
};
