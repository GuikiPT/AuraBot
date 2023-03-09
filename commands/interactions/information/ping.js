const Discord = require('discord.js');

module.exports = {
    name: 'ping',
    category: 'information',
    description: 'Shows the current latency of the bot',
    usage: '/ping',
    data: new Discord.SlashCommandBuilder()
        .setName('ping')
        .setDescription('Shows the current latency of the bot'),

    async execute(client, interaction) {
        try {
            const loadingMessage = await interaction.reply({
                content: '<a:DiscordLoading:1035119091662454836>',
                fetchReply: true
            });

            const roundtripPing = loadingMessage.createdTimestamp - interaction.createdTimestamp;

            const pingEmbed = new Discord.EmbedBuilder()
                .setColor('White')
                .setTitle('🏓 | Pong!')
                .setThumbnail(client.user.displayAvatarURL({
                    size: 2048,
                    format: 'png'
                }))
                .addFields({
                    name: '***Bot Latency***',
                    value: '```ini\n[ ' + roundtripPing + 'ms ]\n```',
                    inline: true
                }, {
                    name: '***API Latency***',
                    value: '```ini\n[ ' + client.ws.ping + 'ms ]\n```',
                    inline: true
                }, )
            return interaction.editReply({
                content: '',
                embeds: [pingEmbed]
            });
        } catch (error) {
            console.error(error.stack);
        }
    },
};