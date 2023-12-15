import {
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle
} from "discord.js";

export default {
  name: "help",
  aliases: ["h"],
  category: 'Utility',
  permission: "",
  desc: "!",
  options: {
    owner: false,
    inVc: false,
    sameVc: false,
    player: {
      playing: false,
      active: false,
    },
    premium: false,
    vote: false,
  },
  /**
   * @param {{ client: import("../../../Struct/Client"), message: import("discord.js").Message }}
   */
  run: async ({ client, message, args }) => {
    if (!args[0]) {
      let flexx = new EmbedBuilder()
        .setColor("#0ff5e2") // Add your desired color manually here
        .setAuthor({ name: `${client.user.username} HelpDesk`, iconURL: client.user.displayAvatarURL() })
        .setDescription(`Hey ${message.author}! I am ${client.user.username}, an Advanced Music Bot Get a great music experience\n\n <:prime:1184128532507541524>  Thanks for using ${client.user.username}\n <:prime:1184128532507541524>  [Invite](https://t.ly/MonsterBunny) | [Support](https://t.ly/MonsterBunny) | [Vote](https://t.ly/MonsterBunny)`)
        .addFields({
          name: `Command Categories`,
          value: `<:music:1184082173897216010> \`:\` Music \n <:filters:1184196300724502598>  \`:\` Filters \n <:utility:1184196995729084468> \`:\` Utility \n <:sources:1184197983357636630> \`:\` Sources`,
        })
        .setFooter({ text: `ColdMusic - 2023's Best Music Bot`, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }));

      let b1 = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId(`music`).setEmoji('1184082173897216010');
      let b2 = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId(`filters`).setEmoji('1184196300724502598');
      let b3 = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId(`utility`).setEmoji('1184196995729084468');
      let b4 = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId(`sources`).setEmoji('1184197983357636630');

      let row = new ActionRowBuilder().addComponents(b1, b2, b3, b4);

      const messageResponse = await message.reply({ embeds: [flexx], components: [row] });

      const collector = messageResponse.createMessageComponentCollector({
        filter: i => i.user.id === message.author.id,
        time: 60000, // 1 minute timeout
      });

      collector.on('collect', async interaction => {
        const category = interaction.customId;

        let commands;
        let categoryTitle;

        switch (category) {
          case 'music':
            commands = ['247', 'Autoplay', 'Clear', 'Disconnect', 'Grab', 'Join', 'Loop', 'Lyrics', 'Pause', 'Play', 'Previous', 'Queue', 'Remove', 'Resume', 'Search', 'Seek', 'Shuffle', 'Skip', 'Soundcloud', 'Spotify', 'Stop', 'Volume'];
            categoryTitle = 'Music Commands';
            break;

          case 'filters':
            commands = ['8d', 'Bass', 'Basboost', 'Chimpuk', 'China', 'Dance', 'Darthvader', 'Daycore', 'Doubletime', 'Treblebass'];
            categoryTitle = 'Filter Commands';
            break;

          case 'utility':
            commands = ['Invite', 'Ping', 'Prefix', 'Stats', 'Support', 'Uptime', 'Vote'];
            categoryTitle = 'Utility Commands';
            break;

          case 'sources':
            commands = ['musixmatch', 'deezer', 'soundcloud', 'spotify'];
            categoryTitle = 'Sources Commands';
            break;

          default:
            commands = [];
            categoryTitle = '';
            break;
        }

        const categoryEmbed = new EmbedBuilder()
          .setColor("#0ff5e2") // Add your desired color manually here
          .setTitle(categoryTitle)
          .setDescription(commands.join(', '));

        await interaction.reply({ embeds: [categoryEmbed], ephemeral: true });
      });

      collector.on('end', collected => {
        if (collected.size > 0) {
          // If any buttons were clicked, update the original message with no components
          messageResponse.edit({ components: [] });
        }
      });
    }
  }
};
