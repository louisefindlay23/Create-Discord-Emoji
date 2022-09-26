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

    if (commandName === "emojibot") {
        const guild = interaction.guild;
        const emojiName = interaction.options.getString("name");
        if (client.emojis.cache.find((emoji) => emoji.name === emojiName)) {
            interaction.reply(
                "This emoji name already exists. Please run `/emojibot` again and pick a new name"
            );
        } else {
            let emoji = interaction.options.getAttachment("emoji").attachment;
            guild.emojis
                .create({
                    attachment: emoji,
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
