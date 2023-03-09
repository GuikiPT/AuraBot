const Discord = require('discord.js');

module.exports = {
    name: 'help',
    category: 'information',
    aliases: ['h', 'commandinfo'],
    cooldown: 5,
    usage: 'help [Command]',
    description: 'Returns all Commmands, or one specific command',

    async execute(client, message, args) {
        try {
            if (args[0]) {
                return getCMD(client, message, args[0]);
            } else {
                return getAll(client, message);
            }
        } catch (error) {
            console.error(error.stack);
        }
    },
};


function getAll(client, message) {
    const getAllCmdEmbed = new Discord.EmbedBuilder()
        .setColor('White')
        .setTitle('❓ | Help Menu')
        .setThumbnail(client.user.displayAvatarURL({
            size: 2048,
            format: 'png'
        }))
        .setFooter({
            text: 'To see more single command information, type: a!help <command name>'
        })
        .setTimestamp()

    const commands = (category) => {
        return client.msgCommands.filter(cmd => cmd.category === category)
            .map(cmd => `\`${cmd.name}\``).join(', ')
    }
    try {
        for (let i = 0; i < client.categories.length; i += 1) {
            const current = client.categories[i]
            const info = commands(current);
            getAllCmdEmbed.addFields({
                name: `***__${current.toUpperCase()}__***`,
                value: `> ${info}`
            })
        }
    } catch (error) {
        console.log(error)
    }
    return message.reply({
        embeds: [getAllCmdEmbed]
    });
}

function getCMD(client, message, input) {
    const singleCmdEmbed = new Discord.EmbedBuilder()
    const cmd = client.msgCommands.get(input.toLowerCase()) || client.msgCommands.get(client.aliases.get(input.toLowerCase()));

    if (!cmd) {
        const noCmdFoundEmbed = new Discord.EmbedBuilder()
            .setColor('Red')
            .setTitle(`❌ | No Information found for command **${input.toLowerCase()}**`)
            .setTimestamp()
        return message.reply({
            embeds: [noCmdFoundEmbed]
        });
    }

    if (cmd.name) {
        singleCmdEmbed.setColor('White')
            .setTitle(`❓ | Detailed Information -> \`${cmd.name}\``)
            .addFields({
                name: '***Command Name***',
                value: `\`${cmd.name}\``
            })
    }

    if (cmd.description) {
        singleCmdEmbed.addFields({
            name: '***Description***',
            value: `\`${cmd.description}\``
        })
    }

    if (cmd.category) {
        singleCmdEmbed.addFields({
            name: '***Category***',
            value: `\`${cmd.category.charAt(0).toUpperCase() + cmd.category.slice(1)}\``
        })
    }

    if (cmd.aliases) {
        singleCmdEmbed.addFields({
            name: '***Aliases***',
            value: `\`${cmd.aliases.map(a => `${a}`).join('\`, \`')}\``
        })
    }

    if (cmd.cooldown) {
        singleCmdEmbed.addFields({
            name: '***Cooldown***',
            value: `\`${cmd.cooldown} Seconds\``
        })
    } else {
        singleCmdEmbed.addFields({
            name: '***Cooldown***',
            value: `0 Seconds`
        })
    }

    if (cmd.guildOnly) {
        singleCmdEmbed.addFields({
            name: '***Guild Only***',
            value: '`Yes`'
        })
    } else {
        singleCmdEmbed.addFields({
            name: '***Guild Only***',
            value: '`No`'
        })
    }

    if (cmd.usage) {
        singleCmdEmbed.addFields({
            name: '***Usage***',
            value: `\`a!${cmd.name} ${cmd.usage}\``
        })
            .setFooter({
                text: 'Syntax: <> = required, [] = optional'
            })
    }

    return message.reply({
        embeds: [singleCmdEmbed]
    });
}