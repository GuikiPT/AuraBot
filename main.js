// Node Modules
const Discord = require('discord.js');
const colors = require('colors/safe');
const moment = require('moment');
require('dotenv').config();
// https://olian04.gitbook.io/better-logging/
require('better-logging')(console, {
    format: ctx => `[${moment().format('HH:mm:ss')}] [${moment().format('L')}] ${ctx.type} >> ${ctx.msg}`,
    saveToFile: `${__dirname}/logs/${moment().format('YYYY')}/${moment().format('M')}/${moment().format('D')}.log`,
    color: {
        base: colors.grey,
        type: {
            debug: colors.green,
            info: colors.white,
            log: colors.grey,
            error: colors.red,
            warn: colors.yellow,
        }
    },
});

// Client Configuration
const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.AutoModerationConfiguration,
        Discord.GatewayIntentBits.AutoModerationExecution,
        Discord.GatewayIntentBits.DirectMessageReactions,
        Discord.GatewayIntentBits.DirectMessages,
        Discord.GatewayIntentBits.GuildEmojisAndStickers,
        Discord.GatewayIntentBits.GuildIntegrations,
        Discord.GatewayIntentBits.GuildInvites,
        Discord.GatewayIntentBits.GuildMembers,
        Discord.GatewayIntentBits.GuildMessageReactions,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.GuildModeration,
        Discord.GatewayIntentBits.GuildPresences,
        Discord.GatewayIntentBits.GuildScheduledEvents,
        Discord.GatewayIntentBits.GuildVoiceStates,
        Discord.GatewayIntentBits.GuildWebhooks,
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.MessageContent,
    ],
    partials: [
        Discord.Partials.Channel,
        Discord.Partials.GuildMember,
        Discord.Partials.GuildScheduledEvent,
        Discord.Partials.Message,
        Discord.Partials.Reaction,
        Discord.Partials.ThreadMember,
    ]
});

// Client Collections
client.msgCommands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

// Handler Loader
['events'].forEach(async (handlerName) => {
    try {
        require(__dirname + '/handlers/events')(client);
    }
    catch (error) {
        console.error(error.stack);
    }
});

// Client Token
client.login(process.env.DiscordToken);