const blacklist = require('../SmartModData/blacklist')
const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')
const config = require("../Settings/config.json");
const prefix = config.Prefix
const ms = require('ms')


module.exports = {
    name: 'rblacklist',
    description: 'rblacklists a user',
    async execute(client, message, args, discord) {
        // not for dms 
        if (message.channel.type === "dm") return message.channel.send("This command is not supported DMs; please run it in a Discord server.")
        //

       

        var staffonly = new Discord.MessageEmbed()
        .setColor('b15b5b')
        .setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
        .setTitle("You cannot use this command!")
        .setDescription(`This command is for Smart Moderation Staff only!`)
        .setFooter("Smart Moderation")




        if (!message.member.roles.cache.some(r => r.id === "907165881572941834" || r.id === "907166917066895422" || r.id === "889974983894380554")) return message.channel.send(staffonly)

        var invalidlayout = new Discord.MessageEmbed()
        .setColor('b15b5b')
        .setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
        .setTitle("Command : -rblacklist")
        .setDescription("**Command Layout:** -rblacklist [User] \n **Example:** -rblacklist 662568072854372362")
        .setFooter("Smart Moderation")


        const User = message.guild.members.cache.get(args[0])
        if(!User) return message.channel.send(invalidlayout)

        var removedblacklist = new Discord.MessageEmbed()
        .setColor('b15b5b')
        .setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
        .setTitle("User removed from the Blacklist Database!")
        .setDescription(`${User.displayName} has been removed from the Database!`)
        .setFooter("Smart Moderation")

        var notblacklisted = new Discord.MessageEmbed()
        .setColor('b15b5b')
        .setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
        .setTitle("User is not Blacklisted on the Database!")
        .setDescription(`${User.displayName} is not Blacklisted on the Database!`)
        .setFooter("Smart Moderation")

        blacklist.findOne({ id : User.user.id }, async(err, data) => {
            if(err) throw err;
            if(data) {
               await blacklist.findOneAndDelete({ id : User.user.id })
                .catch(err => console.log(err))
                message.channel.send(removedblacklist)
            } else {
               message.channel.send(notblacklisted)
            }
           
        })


    }
}