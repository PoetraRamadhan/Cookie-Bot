const ModModel = require('../../models/ModModel');
const ConfigModel = require('../../models/ConfigModel');

module.exports = {
    name: 'guildDelete',
    run: async (client, guild) => {
        await ModModel.deleteMany({ guildId: guild.id });
        await ConfigModel.deleteMany({ guildId: guild.id });
    },
};
