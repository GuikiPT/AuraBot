const fs = require('fs');

module.exports = async function(client) {
    try {

        const eventFolders = fs.readdirSync(__dirname + '/../events');

        for (const folder of eventFolders) {
            const eventFiles = fs.readdirSync(__dirname + `/../events/${folder}`).filter(file => file.endsWith('.js'));
            for (const file of eventFiles) {
                const event = require(__dirname + `/../events/${folder}/${file}`);
                if (event.once) {
                    client.once(event.name, (...args) => event.execute(client, ...args));
                } else {
                    client.on(event.name, (...args) => event.execute(client, ...args));
                }
            }
        }
    } catch (error) {
        console.error(error.stack);
    }

}