import { Client, GatewayIntentBits, Events, SlashCommandBuilder } from "discord.js";
import { CastQuestClient } from "@castquest/sdk";
import * as dotenv from "dotenv";

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

let castQuestClient: CastQuestClient;

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Discord bot ready! Logged in as ${readyClient.user.tag}`);

  if (process.env.RPC_URL && process.env.CAST_ADDRESS) {
    castQuestClient = CastQuestClient.connect(process.env.RPC_URL, {
      cast: process.env.CAST_ADDRESS,
      quest: process.env.QUEST_ADDRESS || "",
      media: process.env.MEDIA_ADDRESS || "",
      fram: process.env.FRAM_ADDRESS || "",
      game: process.env.GAME_ADDRESS || "",
      code: process.env.CODE_ADDRESS || "",
      sponsorToken: process.env.SPONSOR_TOKEN_ADDRESS || "",
      governance: process.env.GOVERNANCE_ADDRESS || "",
      subDAOs: process.env.SUBDAOS_ADDRESS || "",
      l3: process.env.L3_ADDRESS || "",
      marketplace: process.env.MARKETPLACE_ADDRESS || "",
      auctions: process.env.AUCTIONS_ADDRESS || "",
      sponsorship: process.env.SPONSORSHIP_ADDRESS || "",
    });
  }
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  if (commandName === "casts") {
    const address = interaction.options.getString("address");
    if (!address || !castQuestClient) {
      await interaction.reply("Invalid address or client not initialized");
      return;
    }

    try {
      const casts = await castQuestClient.cast.getCastsByCreator(address);
      await interaction.reply(`Found ${casts.length} CASTs for address ${address}`);
    } catch (error) {
      await interaction.reply("Error fetching CASTs");
    }
  } else if (commandName === "stats") {
    await interaction.reply({
      embeds: [
        {
          title: "CASTQUEST Stats",
          fields: [
            { name: "Total CASTs", value: "10,000+", inline: true },
            { name: "Active Quests", value: "500+", inline: true },
            { name: "Trading Volume", value: "$5M+", inline: true },
          ],
          color: 0x8b5cf6,
        },
      ],
    });
  } else if (commandName === "help") {
    await interaction.reply({
      embeds: [
        {
          title: "CASTQUEST Bot Commands",
          description: "Available commands:",
          fields: [
            { name: "/casts <address>", value: "Get CASTs by creator address" },
            { name: "/stats", value: "View platform statistics" },
            { name: "/help", value: "Show this help message" },
          ],
          color: 0x8b5cf6,
        },
      ],
    });
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
