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

    if (commandName === "emojibot") {
        const guild = interaction.guild;
        const emojiName = interaction.options.getString("name");
        if (client.emojis.cache.find((emoji) => emoji.name === emojiName)) {
            interaction.reply(
                "This emoji name already exists. Please run `/emojibot` again and pick a new name"
            );
        } else if (emojiName.length < 2 && emojiName.length > 32) {
            interaction.reply(
                "Your emoji name must be between 2 and 32 characters long. Please run `/emojibot` again and pick a name of the correct length"
            );
        } else {
            let emoji = interaction.options.getAttachment("emoji").attachment;
            fetch(emoji).then((res) => {
                if (res.status >= 400) {
                    throw new Error("Bad response from server");
                } else {
                    console.info(res.headers);
                    console.info(res.headers["content-length"]);
                    if (res.headers["content-length"] > 256000) {
                        interaction.reply(
                            "Your image must be less than 256KB. Please resize or pick image and run `/emojibot` again."
                        );
                    } else {
                        guild.emojis
                            .create({
                                attachment: emoji,
                                name: emojiName,
                            })
                            .then((emoji) => {
                                console.log(
                                    `Created new emoji with name ${emoji.name}`
                                );
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
        }
    }
});

client.login(token);
