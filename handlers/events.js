// Node Modules
const fs = require('fs');

module.exports = async function (client) {
    try {
        /*
            Created event handler similar than discord.js v12 event handling system
            https://github.com/discordjs/guide/blob/v12/code-samples/event-handling/adding-features/12/index.js#L9-L17
        */
        const eventFolders = fs.readdirSync(__dirname + '/../events');

        for (const folder of eventFolders) {
            const eventFiles = fs.readdirSync(__dirname + `/../events/${folder}`).filter(file => file.endsWith('.js'));
            for (const file of eventFiles) {
                // https://discordjs.guide/creating-your-bot/event-handling.html#reading-event-files
                const event = require(__dirname + `/../events/${folder}/${file}`);
                if (event.once) {
                    client.once(event.name, (...args) => event.execute(client, ...args));
                } else {
                    client.on(event.name, (...args) => event.execute(client, ...args));
                }
            }
        }
    }
    catch (error) {
        console.error(error.stack);
    }

}