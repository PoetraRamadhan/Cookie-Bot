const { MessageEmbed, Client, Message } = require('discord.js');
const moment = require('moment');

module.exports = {
    name: 'serverinfo',
    description: 'Shows the information of the guild.',
    category: 'general',
    usage: 'serverinfo',
    cooldowns: 3,
    aliases: ['server'],
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     * @returns 
     */
    run: async (client, message, args) => {
        return message.channel.send(
            new MessageEmbed({
                author: {
                    name: `${message.guild.name} [ID: ${message.guild.id}]`
                },
                thumbnail: {
                    url: message.guild.iconURL({ dynamic: true })
                },
                fields: [
                    {
                        name: 'Owner',
                        value: `${message.guild.owner.user.tag} [${message.guild.ownerID}]`
                    },
                    {
                        name: 'Region',
                        value: message.guild.region
                    },
                    {
                        name: 'Created On',
                        value: moment(message.guild.createdTimestamp).format('dddd, MMMM Do YYYY, HH:mm:ss')
                    },
                    {
                        name: 'Total Members',
                        value: `${message.guild.members.cache.size} Members`
                    },
                    {
                        name: 'Total Channels',
                        value: `${message.guild.channels.cache.size} Channels`
                    },
                    {
                        name: 'Total Roles',
                        value: `${message.guild.roles.cache.size} Roles`
                    },
                    {
                        name: 'Total Boost',
                        value: `Level: ${message.guild.premiumTier}\nNo. of boost: ${message.guild.premiumSubscriptionCount}`
                    }
                ],
                color: 'RANDOM'
            })
        )
    }
}