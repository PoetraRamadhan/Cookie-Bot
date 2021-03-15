const { Collection } = require('discord.js');
const { ownerId, defaultPrefix } = {
    ownerId: '782510921155215390',
    defaultPrefix: 'c!'
}
const ConfigModel = require('../../models/ConfigModel');

module.exports = {
    name: 'message',
    run: async (client, message) => {
        // Costum prefix setting
        let Prefix = defaultPrefix;
        const Guild = await ConfigModel.findOne({ guildId: message.guild.id });
        if(Guild) {
            Prefix = Guild.prefix;
        }
        

        if(message.author.bot || !message.guild) return;
        if(!message.member) message.member = await message.guild.members.fetch(message);
        if(!message.content.startsWith(Prefix)) return;

        const args = message.content.slice(Prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();

        // Load up the command collection
        let command = client.commands.get(cmd);

        // If there aren't any result, Load the aliases
        if(!command) command = client.commands.get(client.aliases.get(cmd));

        // If there are still no result, return;
        if(!command) return;

        // Commands Permissions

        if(command.clientPermissions) {
            let requiredPermissions = [];

            command.clientPermissions.forEach((permission) => {
                if(!message.guild.me.hasPermission(permission)) requiredPermissions.push(permission);
            });

            if(requiredPermissions.length) return message.reply(`I need \`${requiredPermissions.join(', ')}\` permission(s) for executing this command.`);
        }

        if(command.userPermissions) {
            let requiredPermissions = [];

            command.userPermissions.forEach((permission) => {
                if(!message.member.hasPermission(permission)) requiredPermissions.push(permission);
            });

            if(requiredPermissions.length) return message.reply(`You need \`${requiredPermissions.join(', ')}\` permission(s) for executing this command.`);
        }

        if(command.ownerOnly) {
            if(message.author.id !== ownerId) return message.reply('Only the owner can execute this command.');
        }

        // Cooldowns
        if(!client.cooldowns.has(command.name)) {
            client.cooldowns.set(command.name, new Collection());
        };

        const currentDate = Date.now();
        const timestamps = client.cooldowns.get(command.name);
        const cooldownAmount = (command.cooldowns || 3) * 1000;

        if(timestamps.has(message.author.id)) {
            const timeout = timestamps.get(message.author.id) + cooldownAmount;

            if(currentDate < timestamps) {
                const timeLeft = (timeout - currentDate) / 1000;
                return message.channel.send(`The command \`${command.name}\` is in a cooldown, you can do it again in \`${timeLeft.toFixed(1)} seconds\``)
            }
        } else command.run(client, message, args); // Run the command 

        timestamps.set(message.author.id, currentDate);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)
    }
}