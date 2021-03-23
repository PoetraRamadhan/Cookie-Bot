const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const UserModel = require('../../models/UserModel');

module.exports = {
    name: 'userinfo',
    description: 'Shows the information of a user',
    category: 'general',
    usage: 'userinfo [@user/ID]',
    cooldowns: 3,
    aliases: ['user'],
    run: async (client, message, args) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        const UserData = await UserModel.findOne({ userId: member.id });
        console.log(member);

        return message.channel.send(
            new MessageEmbed({
                author: {
                    name: member.user.tag
                },
                thumbnail: {
                    url: member.user.displayAvatarURL({ dynamic: true })
                },
                description: `**Bio:** \`${UserData ? UserData.bio : 'This user haven\'t set his\\her bio.'}\``,
                fields: [
                    {
                        name: 'Nickname',
                        value: member.nickname ? member.nickname : 'None'
                    },
                    {
                        name: 'ID',
                        value: member.id
                    },
                    {
                        name: 'Account Creation Date',
                        value: moment(member.user.createdTimestamp).format('dddd, MMMM Do YYYY, HH:mm:ss')
                    },
                    {
                        name: 'Joined Date',
                        value: moment(member.joinedTimestamp).format('dddd, MMMM Do YYYY, HH:mm:ss')
                    },
                    {
                        name: 'Roles',
                        value: member.roles.cache.map((v) => `\`${v.name}\``).join(', ')
                    }
                ],
                color: 'RANDOM',
                footer: { text: 'You can use the [setbio] command to set up your bio!' }
            })
        );
    }
}