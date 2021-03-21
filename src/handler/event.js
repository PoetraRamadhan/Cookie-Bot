const ascii = require('ascii-table');
const fs = require('fs');

const table = new ascii('Events Log');
table.setHeading('Events', 'Statuses');

module.exports = (client) => {
    console.log('Events');
    fs.readdirSync('./src/events/').forEach((dir) => {
        const events = fs
            .readdirSync(`./src/events/${dir}/`)
            .filter((file) => file.endsWith('.js'));
        for (const file of events) {
            const pull = require(`../events/${dir}/${file}`);
            if (pull.name && typeof pull.name !== 'string') {
                table.addRow(
                    file,
                    '❌ => Please make sure the name property is a type of string'
                );
                continue;
            }

            pull.name = pull.name || file.replace('.js', '');
            client.on(pull.name, pull.run.bind(null, client));
            table.addRow(file, '✅');
        }
    });
    console.log(table.toString());
};
