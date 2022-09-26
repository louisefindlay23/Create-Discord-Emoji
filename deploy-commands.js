require("dotenv").config();
const { REST, SlashCommandBuilder, Routes } = require("discord.js");

const token = process.env.BOT_TOKEN;
const clientID = process.env.CLIENT_ID;
const guildID = process.env.GUILD_ID;

const commands = [
    new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with pong!"),
    new SlashCommandBuilder()
        .setName("server")
        .setDescription("Replies with server info!"),
    new SlashCommandBuilder()
        .setName("user")
        .setDescription("Replies with user info!"),
].map((command) => command.toJSON());

const rest = new REST({ version: "10" }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientID, guildID), { body: commands })
    .then((data) =>
        console.log(
            `Successfully registered ${data.length} application commands.`
        )
    )
    .catch(console.error);
