const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')
const ms = require('ms')

module.exports = {
    name: 'serverinfo',
    description: 'give information about the server',
    async execute(client, message, discord, args) {

        // not for dms 
        if (message.channel.type === "dm") return message.channel.send("This command is not supported DMs; please run it in a Discord server.")
        //
        const user = message.author

        var serverinfo = new Discord.MessageEmbed()
        .setColor('b15b5b')
        .setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
            .setTitle(`${message.guild.name} Server Information`)
            .addFields(
                {
                    name: "Server Owner:",
                    value: `${message.guild.owner}`
                },
                {
                    name: "Region:",
                    value: `${message.guild.region}`
                },
                {
                    name: "Role Count:",
                    value: `${message.guild.roles.cache.size} Roles`
                },
                {
                    name: "Text Channels Count:",
                    value: `${message.guild.channels.cache.size} Text channels`
                },
                {
                    name: "Created on:",
                    value: `${message.guild.createdAt}`
                },
                {
                    name: "Joined on:",
                    value: `${message.member.joinedAt}`
                }
            )




        message.channel.send(serverinfo)

    }
}