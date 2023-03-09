const Discord = require('discord.js');

module.exports = {
    name: Discord.Events.ClientReady,
    once: true,

    async execute(client) {
        console.info(`Ready as ` + client.user.tag);
        try {
            client.user.setPresence({
                activities: [{
                    name: 'The power of Aura'
                }],
                status: 'idle'
            });
        } catch (error) {
            console.error(error.stack);
        }
    },
};