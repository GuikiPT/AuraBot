// Node Modules
const fs = require('fs');

module.exports = async function (client) {
    try {
        /*
            Created command handler similar than discord.js v12 command handling system
            https://github.com/discordjs/guide/blob/v12/code-samples/command-handling/adding-features/12/index.js#L9-L17
        */
        const commandFolders = fs.readdirSync(__dirname + '/../commands/messages/');
    
        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(__dirname + `/../commands/messages/${folder}`).filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                // https://discordjs.guide/creating-your-bot/command-handling.html#reading-command-files
                const command = require(__dirname + `/../commands/messages/${folder}/${file}`);
                client.msgCommands.set(command.name, command);
            }
        }
    }
    catch (error) {
        console.error(error.stack);
    }
}