require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");
const token = process.env.BOT_TOKEN;
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once("ready", () => {
    console.log("Ready!");
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;

    if (commandName === "messagebot") {
        const text = interaction.options._hoistedOptions[0].value;
        await interaction.reply(`The message was ${text}`);
    }
});

client.login(token);
