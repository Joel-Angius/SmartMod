const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')

const config = require("../Settings/config.json");

const SmartModColour = config.SmartModColours


module.exports = {
    name: 'botinfo',
    aliases: ['i'],
    premium: true,
    description: 'shows information about the bot',
    async execute(client, message, args, discord) {

        // not for dms 
        if (message.channel.type === "dm") return message.channel.send("This command is not supported DMs; please run it in a Discord server.")
        //

        var botinfo = new Discord.MessageEmbed()
        .setColor(SmartModColour)
        .setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
            .setTitle('Smart Moderation')
            .addFields(
                {
                    name: 'Version',
                    value: 'BETA',
                    inline: true
                  },
                  
                  {
                    name: 'Premium',
                    value: 'Disabled',
                    inline: true
                  },
                  {
                    name: 'Founder',
                    value: 'JoelHCraft#9541',
                    inline: true
                  }, 
                  {
                    name: 'Users',
                    value: 'N/A',
                    inline: true
                  },
                  {
                    name: 'Servers',
                    value: 'N/A',
                    inline: true
                  },
                  {
                    name: 'Support',
                    value: ("[Click Here](https://discord.gg/VgzRkuHYHB)"),
                    inline: true
                  },
                  
            )
            .setFooter("Smart Moderation")



        message.channel.send(botinfo)
    }
}