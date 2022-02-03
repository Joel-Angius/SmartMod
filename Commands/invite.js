const blacklist = require('../SmartModData/blacklist')
const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')
const config = require("../Settings/config.json");

const SmartModColour = config.SmartModColours
const prefix = config.Prefix
const ms = require('ms')


module.exports = {
    name: 'invite',
    description: 'blacklists a user',
    async execute(client, message, args, discord) {
        // not for dms 
        if (message.channel.type === "dm") return message.channel.send("This command is not supported DMs; please run it in a Discord server.")
        //  


        var invite = new Discord.MessageEmbed()
        .setColor(SmartModColour)
        .setTitle('Smart Moderation Bot Invite')
            .setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
            .setDescription(`[Invite Link](https://discord.com/api/oauth2/authorize?client_id=761858703862792213&permissions=8&scope=bot)`)
            .setFooter("Smart Moderation")


            message.channel.send(invite)

    }
}