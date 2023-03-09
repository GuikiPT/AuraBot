const Discord = require('discord.js');

const prefix = 'a!'

module.exports = {
    name: Discord.Events.MessageCreate,
    once: false,
    async execute(client, message) {
        try {
            if (!message.content.startsWith(prefix) || message.author.bot) return;

            const args = message.content.slice(prefix.length).trim().split(/ +/);
            const commandName = args.shift().toLowerCase();

            const command = client.msgCommands.get(commandName) ||
                client.msgCommands.get(client.aliases.get(commandName));

            if (!command) return;

            const channelType = Discord.ChannelType[message.channel.type]

            if (command.guildOnly && channelType === 'DM') {
                const notDmCommandEmbed = new Discord.EmbedBuilder()
                    .setColor('Red')
                    .setTitle('❌ | I can\'t execute that command inside DMs!')
                    .setDescription('To run this command you need to run it inside a server.')
                    .setTimestamp()
                return message.reply({
                    embeds: [notDmCommandEmbed],
                    allowedMentions: {
                        parse: []
                    }
                });
            }

            if (command.permissions) {
                const authorPerms = message.channel.permissionsFor(message.author);
                if (!authorPerms || !authorPerms.has(command.permissions)) {
                    const notHavePermsEmbed = new Discord.EmbedBuilder()
                        .setColor('Red')
                        .setTitle('❌ | You don`t have permissions to execute this!')
                        .setTimestamp()
                    return message.reply({
                        embeds: [notHavePermsEmbed],
                        allowedMentions: {
                            parse: []
                        }
                    });
                }
            }

            if (command.args && !args.length) {
                const noArgsEmbed = new Discord.EmbedBuilder()
                    .setColor('Red')
                    .setTitle(`❌ | You didn't provide any arguments!`)
                    .setTimestamp()

                if (command.usage) {
                    noArgsEmbed.setDescription(`\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``)
                }
                return message.reply({
                    embeds: [noArgsEmbed],
                    allowedMentions: {
                        parse: []
                    }
                });
            }

            const {
                cooldowns
            } = client;

            if (!cooldowns.has(command.name)) {
                cooldowns.set(command.name, new Discord.Collection());
            }

            const now = Date.now();
            const timestamps = cooldowns.get(command.name);
            const cooldownAmount = (command.cooldown || 3) * 1000;

            if (timestamps.has(message.author.id)) {
                const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

                if (now < expirationTime) {
                    const timeLeft = (expirationTime - now) / 1000;
                    const cooldownTimerEmbed = new Discord.EmbedBuilder()
                        .setColor('Red')
                        .setTitle(`❌ | Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`)
                    return message.reply({
                        embeds: [cooldownTimerEmbed],
                        allowedMentions: {
                            parse: []
                        }
                    });
                }
            }

            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

            try {
                command.execute(client, message, args);
                
                const guild = message.guild;
                var guildInfo;
                if (guild) guildInfo = '[' + message.guild.name + ' | ' + message.guild.id + ']';
                else guildInfo = '';

                console.log(`${guildInfo || ''} [${message.channel.name || 'DM'} | ${message.channel.id}] [${message.author.tag} | ${message.author.id}] [${command.name}]`);
            } catch (error) {
                console.error(error.stack);
                message.reply('there was an error trying to execute that command!');
            }
        } catch (error) {
            console.error(error.stack);
        }
    },
};