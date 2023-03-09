const fs = require('fs');

module.exports = async function(client) {
    try {
        const commandFolders = fs.readdirSync(__dirname + '/../commands/messages/');

        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(__dirname + `/../commands/messages/${folder}`).filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const command = require(__dirname + `/../commands/messages/${folder}/${file}`);
                client.msgCommands.set(command.name, command);
                if (command.aliases && Array.isArray(command.aliases)) command.aliases.forEach(alias => client.aliases.set(alias, command.name));
            }
        }
    } catch (error) {
        console.error(error.stack);
    }
}