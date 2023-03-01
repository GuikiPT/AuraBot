// Node Modules
const Discord = require('discord.js');

/*
    Event similar to
    https://discordjs.guide/creating-your-bot/event-handling.html#individual-event-files
    https://github.com/discordjs/guide/blob/main/code-samples/creating-your-bot/event-handling/events/ready.js#L1-L9
*/

module.exports = {
    name: Discord.Events.ClientReady,
    once: true,
    async execute(client) {
        console.log(`Ready as ` + client.user.tag);
    },
};