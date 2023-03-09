const Discord = require('discord.js');

module.exports = {
	name: 'ping',
	description: 'Shows the current latency of the bot',
	cooldown: 5,
	args: true,
	usage: '<user> <role>',


	async execute(client, message) {
		try {
			const loadingMessage = await message.channel.send('<a:DiscordLoading:1035119091662454836>');

			const roundtripPing = loadingMessage.createdTimestamp - message.createdTimestamp;

			const pingEmbed = new Discord.EmbedBuilder()
				.setColor('White')
				.setTitle('🏓 | Pong!')
				.addFields(
					{ name: '***Bot Latency***', value: '```ini\n[ ' + roundtripPing + 'ms ]\n```', inline: true },
					{ name: '***API Latency***', value: '```ini\n[ ' + client.ws.ping + 'ms ]\n```', inline: true },
				)
			return loadingMessage.edit({ content: '', embeds: [pingEmbed] });
		}
		catch (error) {
			console.error(error.stack);
		}
	},
};