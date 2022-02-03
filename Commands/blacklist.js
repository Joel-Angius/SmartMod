const blacklist = require('../SmartModData/blacklist')
const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')
const config = require("../Settings/config.json");

const SmartModColour = config.SmartModColours
const prefix = config.Prefix
const ms = require('ms')


module.exports = {
    name: 'blacklist',
    description: 'blacklists a user',
    async execute(client, message, args, discord) {
        // not for dms 
        if (message.channel.type === "dm") return message.channel.send("This command is not supported DMs; please run it in a Discord server.")
        //

        var staffonly = new Discord.MessageEmbed()
        .setColor(SmartModColour)
        .setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
        .setTitle("You cannot use this command!")
        .setDescription(`This command is for Smart Moderation Staff only!`)
        .setFooter("Smart Moderation")




        if (!message.member.roles.cache.some(r => r.id === "907166917066895422" || r.id === "889974885810602027" || r.id === "889974983894380554")) return message.channel.send(staffonly)

        var invalidlayout = new Discord.MessageEmbed()
        .setColor(SmartModColour)
        .setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
        .setTitle("Command : -blacklist")
        .setDescription("**Command Layout:** -blacklist [User] \n **Example:** -blacklist JoelHCraft#9541 \n **Example:** -blacklist 662568072854372362")
        .setFooter("Smart Moderation")

        let User = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!User) return message.channel.send(invalidlayout)

        var addedblacklist = new Discord.MessageEmbed()
        .setColor(SmartModColour)
            .setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
            .setTitle("User added to Blacklist Database!")
            .setDescription(`${User.displayName} has been blacklisted!`)
            .setFooter("Smart Moderation")

        var alreadyblacklisted = new Discord.MessageEmbed()
        .setColor(SmartModColour)
            .setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
            .setTitle("User is already Blacklisted on the Database!")
            .setDescription(`${User.displayName} has already been blacklisted!`)
            .setFooter("Smart Moderation")

        blacklist.findOne({ id: User.user.id }, async (err, data) => {
            if (err) throw err;
            if (data) {
                message.channel.send(alreadyblacklisted)
            } else {
                data = new blacklist({ id: User.user.id })
                data.save()
                    .catch(err => console.log(err))
                message.channel.send(addedblacklist)
            }

        })


    }
}