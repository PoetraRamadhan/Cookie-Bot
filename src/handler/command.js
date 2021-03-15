const chalk = require('chalk');
const fs = require('fs');

module.exports = (client) => {
    fs.readdirSync('./src/commands/').forEach((dir) => {
        const commands = fs.readdirSync(`./src/commands/${dir}/`).filter((file) => file.endsWith('.js'));
        for(const file of commands) {
            const pull = require(`../commands/${dir}/${file}`);
            if(pull.name) {
                client.commands.set(pull.name, pull);
                console.log(chalk.green(`${file} ✅`));
            } else {
                console.log(chalk.red(`${file} Something went wrong. Please check again,`));
                continue;
            } if(pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach((alias) => client.aliases.set(alias, pull.name));
        }
    });
}