require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");
const token = process.env.BOT_TOKEN;
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const fetch = require("cross-fetch");

client.once("ready", () => {
    console.log("Ready!");
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;

    if (commandName === "create-emoji") {
        const guild = interaction.guild;
        const emojiName = interaction.options.getString("name");
        if (client.emojis.cache.find((emoji) => emoji.name === emojiName)) {
            interaction.reply(
                "This emoji name already exists. Please run `/create-emoji` again and pick a new name"
            );
        } else if (emojiName.length < 2 && emojiName.length > 32) {
            interaction.reply(
                "Your emoji name must be between 2 and 32 characters long. Please run `/create-emoji` again and pick a name of the correct length"
            );
        } else {
        	const emojiFile = interaction.options.getAttachment("icon");
            guild.emojis
                .create({
                    attachment: emojiFile.attachment,
                    name: emojiName,
                })
                .then((emoji) => {
                    console.log(`Created new emoji with name ${emoji.name}`);
                    emoji = client.emojis.cache.find(
                        (emoji) => emoji.name === emojiName
                    );
                    interaction.reply(
                        `You created ${emojiName} emoji: ${emoji}`
                    );
                })
                .catch(console.error);
        }
    }
});

client.login(token);
