const chalk = require('chalk');
const { on } = require('events');
const fs = require('fs');

module.exports = (client) => {
    fs.readdirSync('./src/events/').forEach((dir) => {
        const events = fs.readdirSync(`./src/events/${dir}/`).filter((file) => file.endsWith('.js'));
        for(const file of events) {
            const pull = require(`../events/${dir}/${file}`);
            if(pull.name && typeof pull.name !== 'string') {
                console.log(chalk.red(`${file} Please make sure the name property is a type of string`));
                continue;
            }

            pull.name = pull.name || file.replace('.js', '');
            client.on(pull.name, pull.run.bind(null, client));
            console.log(chalk.green(`${file} ✅`));
        }
    });
}