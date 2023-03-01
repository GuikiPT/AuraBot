// Node Modules
const Discord = require('discord.js');
require('dotenv').config();


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