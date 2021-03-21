const ascii = require('ascii-table');
const fs = require('fs');

const table = new ascii('Commands Log');
table.setHeading('Commands', 'Status');

module.exports = (client) => {
    console.log('Commands');
    fs.readdirSync('./src/commands/').forEach((dir) => {
        const commands = fs
            .readdirSync(`./src/commands/${dir}/`)
            .filter((file) => file.endsWith('.js'));
        for (const file of commands) {
            const pull = require(`../commands/${dir}/${file}`);
            if (pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow(file, '✅');
            } else {
                table.addRow(
                    file,
                    '❌ => something went worng. Please check the file.'
                );
                continue;
            }
            if (pull.aliases && Array.isArray(pull.aliases))
                pull.aliases.forEach((alias) =>
                    client.aliases.set(alias, pull.name)
                );
        }
    });
    console.log(table.toString());
};
