const fs = require('fs');

module.exports = async function(client) {
    try {

        const interactionFolders = fs.readdirSync(__dirname + '/../commands/interactions/');

        for (const folder of interactionFolders) {
            const interactionFiles = fs.readdirSync(__dirname + `/../commands/interactions/${folder}`).filter(file => file.endsWith('.js'));
            for (const file of interactionFiles) {
                const interaction = require(__dirname + `/../commands/interactions/${folder}/${file}`);
                client.interactions.set(interaction.data.name, interaction);
            }
        }
    } catch (error) {
        console.error(error.stack);
    }
}