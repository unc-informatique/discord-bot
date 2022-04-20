import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { token, clientId, guildId } from "./config.mjs";
import fs from 'fs';
import path from 'path';

const commands = [];
const dirPath = path.resolve('./src','./slashCommands');
const commandFiles = fs.readdirSync(dirPath).filter(file => file.endsWith('.mjs'));

var filePath;
for (const file of commandFiles) {
	//filePath = path.resolve('./src',`./slashCommands/${file}`);
	
	const command =  import(`./slashCommands/${file}`);
	commands.push(command);
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();