const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')

module.exports = {
    name: 'unlock',
    description: 'unlocks a channel',
    async execute(message, args, discord, client) {



        // not for dms 
        if (message.channel.type === "dm") return message.channel.send("This command is not supported DMs; please run it in a Discord server.")
        //

        // prios 

        // none

        // command variables 
        var NoPerms = new Discord.MessageEmbed()
            .setColor('b15b5b')
            .setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
            .setTitle("You cannot use this command!")
            .setDescription("You aren\'t part of the Moderation team in this server!")
            .setFooter("Smart Moderation")

        var failedtounlock = new Discord.MessageEmbed()
            .setColor('b15b5b')
            .setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
            .setTitle("Failed to unlock!")
            .setDescription(`I could not unlock this channel!`)
            .setFooter("Smart Moderation")

        var unlockingthechannel = new Discord.MessageEmbed()
            .setColor('b15b5b')
            .setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
            .setTitle("Unlocking the channel!")
            .setDescription(`I am changing the permissions of the channel now!`)
            .setFooter("Smart Moderation")

        var channelnowunlocked = new Discord.MessageEmbed()
            .setColor('b15b5b')
            .setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
            .setTitle("Channel now unlocked!")
            .setDescription(`This channel is now unlocked!`)
            .setFooter("Smart Moderation")

        var alreadyunlocked = new Discord.MessageEmbed()
            .setColor('b15b5b')
            .setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
            .setTitle("This channel is already unlocked!")
            .setDescription(`I cannot unlock this channel as it is already unlocked!`)
            .setFooter("Smart Moderation")

        //

        if (!message.member.roles.cache.some(r => r.name === "Admin" || r.name === "Moderator")) return message.channel.send(NoPerms)

        let channel = message.channel

        if (channel.permissionsFor(message.guild.id).has('SEND_MESSAGES') === true) {
            return message.channel.send(alreadyunlocked)
        }

        let msg = await message.channel.send(unlockingthechannel)

        try {
            message.channel.updateOverwrite(message.guild.roles.cache.find(e => e.name.toLowerCase().trim() == "@everyone"), {
                SEND_MESSAGES: true
            })
            msg.edit(channelnowunlocked)
        } catch (e) {
            message.channel.send(failedtounlock)
        }



    }
}