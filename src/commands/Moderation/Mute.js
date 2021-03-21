const { MessageEmbed } = require('discord.js');
const ms = require('ms');
const ConfigModel = require('../../models/ConfigModel');

module.exports = {
    name: 'mute',
    description: 'Mutes a member for the amount of time the user specify',
    category: 'moderation',
    usage: 'mute <@member/ID> <Time> [reason]',
    clientPermissions: ['MANAGE_ROLES'],
    userPermissions: ['MANAGE_ROLES'],
    cooldowns: 5,
    run: async (client, message, args) => {
        const Guild = await ConfigModel.findOne({ guildId: message.guild.id });
        const muteRole = Guild.muteRoleId;
        if (!muteRole)
            return message.channel.send(
                new MessageEmbed({
                    author: {
                        name: message.author.tag,
                        iconURL: message.author.displayAvatarURL({
                            dynamic: true,
                        }),
                    },
                    description: "You haven't set any role for this command.",
                    color: 'RED',
                })
            );

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
                    description: 'Please specify a member to mute!',
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

        const time = args[1];
        if (!time)
            return message.channel.send(
                new MessageEmbed({
                    author: {
                        name: message.author.tag,
                        iconURL: message.author.displayAvatarURL({
                            dynamic: true,
                        }),
                    },
                    description:
                        'Please specify a amount of time to mute!\nExample: `mute @member/ID 1d`',
                    color: 'RED',
                })
            );

        let reason = args.slice(2).join(' ');
        if (!reason) reason = 'No reason.';

        const muteTime = ms(time);
        await message.guild.channels.cache.forEach((channel) => {
            channel.updateOverwrite(muteRole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false,
                SPEAK: false,
                CONNECT: false,
            });
        });
        target.roles.add(muteRole);
        message.channel.send(
            new MessageEmbed({
                author: {
                    name: message.author.tag,
                    iconURL: message.author.displayAvatarURL({
                        dynamic: true,
                    }),
                },
                description: `Successfully muted ${target.user.tag} for the reason of \`${reason}\``,
                color: 'GREEN',
                footer: { text: `Mute Timeout: ${time}` },
            })
        );
        setTimeout(() => {
            target.roles.remove(muteRole);
            message.channel.send(
                new MessageEmbed({
                    author: {
                        name: message.author.tag,
                        iconURL: message.author.displayAvatarURL({
                            dynamic: true,
                        }),
                    },
                    description: `Unmuted ${target}`,
                    color: 'GREEN',
                })
            );
        }, muteTime);
    },
};
