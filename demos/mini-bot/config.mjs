//https://nodejs.org/api/esm.html

import dotenv from "dotenv";
dotenv.config({ debug: true });

const production = process.env.NODE_ENV.toLowerCase() === "production";
const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

export { production, token, clientId, guildId };
