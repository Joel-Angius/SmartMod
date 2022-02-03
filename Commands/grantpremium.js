const premiumSchema = require('../SmartModData/premium')
const day = require('dayjs')


const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')
const config = require("../Settings/config.json");

const SmartModColour = config.SmartModColours
const prefix = config.Prefix
const ms = require('ms')

module.exports = {
    name: 'grantpremium',
    aliases: ['grant'],
    description: 'grants a user',
    async execute(client, message, args, discord) { 

        if (message.channel.type === "dm") return message.channel.send("This command is not supported DMs; please run it in a Discord server.")

        var staffonly = new Discord.MessageEmbed()
        .setColor(SmartModColour)
        .setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
        .setTitle("You cannot use this command!")
        .setDescription(`This command is for Smart Moderation Staff only!`)
        .setFooter("Smart Moderation")

        if (!message.member.roles.cache.some(r => r.id === "907166917066895422" || r.id === "889974885810602027" || r.id === "889974983894380554")) return message.channel.send(staffonly)

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);


        var invalidlayout = new Discord.MessageEmbed()
        .setColor(SmartModColour)
        .setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
        .setTitle("Command : -grantpremium")
        .setDescription("**Command Layout:** -grantpremium [User] \n **Example:** -grantpremium JoelHCraft#9541 \n **Example:** -grantpremium§ 662568072854372362")
        .setFooter("Smart Moderation")

        if(!member) return message.channel.send(invalidlayout)

        var haspremium = new Discord.MessageEmbed()
        .setColor(SmartModColour)
        .setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
        .setTitle("User is already on the Premium Database!")
        .setDescription(`${member.displayName} has already been added onto the Premium Database!`)
        .setFooter("Smart Moderation")

        var addedpremium = new Discord.MessageEmbed()
        .setColor(SmartModColour)
        .setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
        .setTitle("User has been added on the Premium Database!")
        .setDescription(`${member.displayName} has now been added onto the Premium Database!`)
        .setFooter("Smart Moderation")




        premiumSchema.findOne({
            User: member.id,
            PremiumUserName: member.displayName,
            GrantedFromID: message.author.id,
        }, async(err, data) => {
            if(data) return message.channel.send(haspremium)

            new premiumSchema({
                User: member.id,
                PremiumUserName: member.displayName,
                GrantedFromID: message.author.id,
            }).save()
            return message.channel.send(addedpremium)
        }
        )




       
    
    }
}