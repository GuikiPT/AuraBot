const Discord = require('discord.js');

module.exports = {
	data: new Discord.SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),

	async execute(client, interaction) {
		return interaction.reply('Pong!');
	},
};