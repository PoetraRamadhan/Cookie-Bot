const { MessageEmbed } = require('discord.js');
const ms = require('pretty-ms');

module.exports = {
    name: 'help',
    description: 'Sends the command information and lists',
    category: 'general',
    usage: 'help [command]',
    cooldowns: 3,
    run: async (client, message, args) => {
        if (args[0]) {
            const command = await client.commands.get(args[0]);
            if (!command)
                return message.reply(
                    "That command doesn't exist or unavailabel"
                );

            const commandEmbed = new MessageEmbed()
                .setTitle(`${command.name} command`)
                .addField('Category', command.category || 'None')
                .addField('Description', command.description || 'None')
                .addField('Usage', command.usage || 'None')
                .addField(
                    'Alias',
                    command.aliases
                        ? command.aliases.map((alias) => alias).join(', ')
                        : 'None'
                )
                .addField(
                    'BotPermissions',
                    command.clientPermissions
                        ? `[${command.clientPermissions
                              .map((perms) => perms)
                              .join(', ')}]`
                        : 'Default'
                )
                .addField(
                    'UserPermissions',
                    command.userPermissions
                        ? `[${command.userPermissions
                              .map((perms) => perms)
                              .join(', ')}]`
                        : 'Default'
                )
                .addField(
                    'Command Cooldown',
                    command.cooldowns
                        ? `${ms(command.cooldowns * 1000, { verbose: true })}`
                        : '3 seconds'
                )
                .setThumbnail(client.user.displayAvatarURL())
                .setColor('RANDOM')
                .setFooter('<> - Required | [] - optional');
            return message.channel.send(commandEmbed);
        } else {
            const commands = await client.commands;

            let commandsEmbed = new MessageEmbed()
                .setTitle(`Command List - [${commands.size}]`)
                .setColor('RANDOM')
                .setThumbnail(client.user.displayAvatarURL())
                .setFooter('<> - Required | [] - optional');

            let com = {};
            for (let comm of commands.array()) {
                let category = `${comm.category} Commands` || 'Unknown';
                let name = comm.name;

                if (!com[category]) {
                    com[category] = [];
                }
                com[category].push(name);
            }

            for (const [key, value] of Object.entries(com)) {
                let category = key;

                let desc = '`' + value.join('`, `') + '`';

                commandsEmbed.addField(
                    `${category.toUpperCase()} - [${value.length}]`,
                    desc
                );
            }
            return message.channel.send(commandsEmbed);
        }
    },
};
