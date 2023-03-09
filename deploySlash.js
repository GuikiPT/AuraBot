const Discord = require('discord.js');
require('dotenv').config({});
const fs = require('fs');

const commands = [];

const interactionFolders = fs.readdirSync(__dirname + '/commands/interactions/');
for (const folder of interactionFolders) {
    const interactionFiles = fs.readdirSync(__dirname + `/commands/interactions/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of interactionFiles) {
        const interaction = require(__dirname + `/commands/interactions/${folder}/${file}`);
        commands.push(interaction.data.toJSON());
    }
}

const rest = new Discord.REST({
    version: '10'
}).setToken(process.env.DiscordToken);

(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        const data = await rest.put(
            Discord.Routes.applicationGuildCommands('1080492281615876167', '1033777057303371797'), {
                body: commands
            },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();