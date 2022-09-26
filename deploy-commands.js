require("dotenv").config();
const { REST, SlashCommandBuilder, Routes } = require("discord.js");

const token = process.env.BOT_TOKEN;
const clientID = process.env.CLIENT_ID;
const guildID = process.env.GUILD_ID;

const commands = [
    new SlashCommandBuilder()
        .setName("emojibot")
        .setDescription("Creates custom Discord emoji")
        .addStringOption((option) =>
            option
                .setName("name")
                .setDescription("Name of the Emoji")
                .setRequired(true)
        )
        .addAttachmentOption((option) =>
            option
                .setName("emoji")
                .setDescription("Emoji File")
                .setRequired(true)
        ),
].map((command) => command.toJSON());

const rest = new REST({ version: "10" }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientID, guildID), { body: commands })
    .then((data) =>
        console.log(
            `Successfully registered ${data.length} application commands.`
        )
    )
    .catch(console.error);
