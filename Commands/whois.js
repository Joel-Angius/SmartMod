const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')

module.exports = {
    name: 'whois',
    description: 'gets a users information',
    async execute(client, message, args, discord) {

// not for dms 

//

if (message.channel.type === "dm") return message.channel.send("This command is not supported DMs; please run it in a Discord server.")

        const user = message.mentions.users.first() || message.author

        var whois = new Discord.MessageEmbed()
            .setTitle("User Information:")
            .setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
            .setColor('b15b5b')
            .addFields(
                {
                    name: "Username:",
                    value: `${user.tag}`
                },
                {
                    name: "User ID:",
                    value: `${user.id}`
                },
                {
                    name: "Joined Discord On:",
                    value: `${user.createdAt}`
                }
            )
            .setFooter("Smart Moderation")



        message.channel.send(whois)
    }
}