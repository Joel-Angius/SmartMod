const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')

const config = require("../Settings/config.json");

const SmartModColour = config.SmartModColours


module.exports = {
    name: 'lock',
    description: 'locks a channel',
    async execute(message, args, discord, client) {


        // not for dms 
        if (message.channel.type === "dm") return message.channel.send("This command is not supported DMs; please run it in a Discord server.")
        //

        // prios 

        // none

        // command variables 
        var NoPerms = new Discord.MessageEmbed()
        .setColor(SmartModColour)
            .setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
            .setTitle("You cannot use this command!")
            .setDescription("You aren\'t part of the Moderation team in this server!")
            .setFooter("Smart Moderation")

        var failedtolock = new Discord.MessageEmbed()
        .setColor(SmartModColour)
            .setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
            .setTitle("Failed to lock!")
            .setDescription(`I could not lock this channel!`)
            .setFooter("Smart Moderation")

        var lockingthechannel = new Discord.MessageEmbed()
        .setColor(SmartModColour)
            .setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
            .setTitle("Locking the channel!")
            .setDescription(`I am changing the permissions of the channel now!`)
            .setFooter("Smart Moderation")

        var channelnowlocked = new Discord.MessageEmbed()
        .setColor(SmartModColour)
            .setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
            .setTitle("Channel now locked!")
            .setDescription(`This channel is now locked!`)
            .setFooter("Smart Moderation")

        var alreadylocked = new Discord.MessageEmbed()
        .setColor(SmartModColour)
            .setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
            .setTitle("This channel is already locked!")
            .setDescription(`I cannot lock this channel as it is already locked!`)
            .setFooter("Smart Moderation")

        //

        if (!message.member.roles.cache.some(r => r.name === "Admin" || r.name === "Moderator")) return message.channel.send(NoPerms)

        let channel = message.channel

        if (channel.permissionsFor(message.guild.id).has('SEND_MESSAGES') === false) {
            return message.channel.send(alreadylocked)
        }

        let msg = await message.channel.send(lockingthechannel)

        try {
            message.channel.updateOverwrite(message.guild.roles.cache.find(e => e.name.toLowerCase().trim() == "@everyone"), {
                SEND_MESSAGES: false
            })
            msg.edit(channelnowlocked)
        } catch (e) {
            message.channel.send(failedtolock)
        }






    }
}