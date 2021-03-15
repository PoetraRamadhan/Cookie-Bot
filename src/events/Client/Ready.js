const { inspect } = require('util');

module.exports = {
    name: 'ready',
    run: (client) => {
        console.log(client.chalk.green(`${client.user.tag} Is up and ready to go!`));
        client.user.setActivity('I\'m Cookie!', { type: "PLAYING" });

        process.on('unhandledRejection', (reason, promise) => {
            client.channels.cache.get('821015823640297513').send(`UnhandledRejection\nReason:\n\`\`\`\n${inspect(reason, { depth: 0 })}\n\`\`\` Promise:\n\`\`\`\n${inspect(promise, { depth: 0 })}\n\`\`\``)
        });
        process.on('uncaughtException', (err, origin) => {
            client.channels.cache.get('821015823640297513').send(`UncaughtException\nError:\n\`\`\`\n${inspect(err, { depth: 0 })}\n\`\`\`\nType: ${inspect(origin, { depth: 0 })}`)
        });
        process.on('warning', (warn) => {
            client.channels.cache.get('821015823640297513').send(`Warning\nWarn:\n\`\`\`\n${warn.name}\n${warn.message}\n\n${warn.stack}\n\`\`\``)
        });
    }
}