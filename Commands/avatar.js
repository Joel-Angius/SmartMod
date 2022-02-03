const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')

const config = require("../Settings/config.json");

const SmartModColour = config.SmartModColours

module.exports = {
    name: 'avatar',
    description: 'warns a user',
    async execute(client, message, args, discord) {


        // not for dms 
        if (message.channel.type === "dm") return message.channel.send("This command is not supported DMs; please run it in a Discord server.")
        //
        const user = message.mentions.users.first() || message.author 
        const avatar = user.displayAvatarURL({ size: 4096, dynamic: true})
        var embed = new Discord.MessageEmbed()
        .setTitle("Avatar")
        .setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
        .setColor(SmartModColour)
        .setImage(avatar)
        .setFooter("Smart Moderation")


        message.channel.send(embed)
    }
}