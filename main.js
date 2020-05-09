const { Client, MessageEmbed } = require("discord.js");
const client = new Client();

const config = require("./utils/config.json");

let rainbow = true;

if (config.ROLE_COLOR_CHANGE_IN_SECONDS < 6) {
  console.log("Ratelimited!! Please change the seconds in the config!");
  rainbow = false;
} else {
  client.on("error", err => {
    console.log(config.MESSAGES.THROW_ERROR.replace("{{error}}", err));
  });

  client.on("ready", () => {
    console.log("[BOT] Online");

    if (rainbow === true) {
      const guild = client.guilds.cache.get(config.GUILD_ID);
      const rainbowRole = guild.roles.cache.get(config.ROLE_ID);

      setInterval(() => {
        if (rainbow === true) {
          rainbowRole.setColor("RANDOM");
          console.log("Role Color change");
        }
      }, config.ROLE_COLOR_CHANGE_IN_SECONDS * 1000);
    }
  });

  client.on("message", message => {
    if (message.content.startsWith(config.PREFIX + "rainbow")) {
      if (!message.member.hasPermission(config.NEEDED_PERMS))
        return message.channel.send(config.NO_PERMS);

      rainbow = !rainbow;
      if (rainbow) {
        return message.channel.send(config.MESSAGES.RAINBOW_ENABLED);
      } else {
        return message.channel.send(config.MESSAGES.RAINBOW_DISABLED);
      }
    }
  });

  client.login(config.BOT_TOKEN);
}
