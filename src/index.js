require('dotenv').config();

const { Client, Collection, Intents } = require('discord.js');
const mongoose = require('mongoose');
const chalk = require('chalk');

const client = new Client({
    disableMentions: 'everyone',
    partials: ['MESSAGE', 'CHANNEL', 'USER', 'REACTION'],
    messageSweepInterval: 180,
    messageCacheLifetime: 180,
    messageCacheMaxSize: 200,
    ws: {
        intents: Intents.ALL
    }
});

(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
})();

client.chalk = chalk;
client.commands = new Collection();
client.aliases = new Collection();
client.events = new Collection();
client.cooldowns = new Collection();
['command', 'event'].forEach((handler) => {
    require(`./handler/${handler}`)(client);
});

client.login(process.env.TOKEN);