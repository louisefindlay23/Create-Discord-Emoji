require("dotenv").config();
const { REST, SlashCommandBuilder, Routes } = require("discord.js");

const token = process.env.BOT_TOKEN;
const clientID = process.env.CLIENT_ID;

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

(async () => {
    try {
        console.log("Started refreshing application (/) commands.");

        await rest.put(Routes.applicationCommands(clientID), {
            body: commands,
        });

        console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
        console.error(error);
    }
})();
