const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')
const { models } = require('mongoose')

const config = require("../Settings/config.json");

const SmartModColour = config.SmartModColours

module.exports = {
    name: 'kick',
    description: 'kicks a user',
    async execute(client, message, args, discord) {

        // not for dms 
        if (message.channel.type === "dm") return message.channel.send("This command is not supported DMs; please run it in a Discord server.")
//

// prios 
const user = message.mentions.users.first()
const reason = args.slice(1).join(" ");
let guildname = message.guild.name

//



        // command variables 
        var NoPerms = new Discord.MessageEmbed()
        .setColor(SmartModColour)
        .setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
       .setTitle("You cannot use this command!")
        .setDescription("You aren\'t part of the Moderation team in this server!")
        .setFooter("Smart Moderation")

        var invalidlayout = new Discord.MessageEmbed()
        .setColor(SmartModColour)
        .setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
        .setTitle("Command : -kick")
         .setDescription("**Command Layout:** -kick [User] [Reason] \n **Example:** -kick JoelHCraft#9541 naughty! \n **Cooldown:** Coming soon!")
           .setFooter("Smart Moderation")

         var mainkick = new Discord.MessageEmbed()
         .setColor(SmartModColour)
         .setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
         .setTitle("User has been Kicked!")
         .setDescription(`${user} has been Kicked!`)
         .addFields({
             name: 'User Kicked:',
             value: `${user}`
         },
         {
             name: "Kicked by:",
             value: `<@${message.author.id}>`
         },
         {
             name: "Reason:",
             value: `${reason != "" ? reason : "No reason was given"}`
         })
         .setFooter("Smart Moderation")

         var antikickauth = new Discord.MessageEmbed()
         .setColor(SmartModColour)
         .setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
         .setTitle("You cannot kick yourself!")
         .setDescription(`You cannot use the kick command on yourself!`)
         .setFooter("Smart Moderation")


         var antimod = new Discord.MessageEmbed()
         .setColor(SmartModColour)
         .setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
         .setTitle("You cannot kick Moderators!")
         .setDescription(`I cannot kick people in the moderation team!`)
         .setFooter("Smart Moderation")

         var highmember = new Discord.MessageEmbed()
         .setColor(SmartModColour)
         .setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
         .setTitle("I cannot kick this member!")
         .setDescription(`I cannot kick this member!`)
         .setFooter("Smart Moderation")

       
         //


         if(!message.member.roles.cache.some(r => r.name === "Admin" || r.name === "Moderator")) return message.channel.send(NoPerms)

         if (!user) return message.channel.send(invalidlayout);
         if(user.id === message.author.id) return message.channel.send(antikickauth);



         // anti mod removal 

         if(!user.kickable) return message.channel.send(highmember);

         const target = message.guild.members.cache.get(user.id);
         const mods = message.guild.roles.cache.find(r => r.name === "Admin" || r.name === "Moderator");

         if (target.roles.cache.has(mods.id)) return message.channel.send(antimod);



         message.guild.members.cache.get(user.id).kick(reason);


         
         message.channel.send(mainkick); 


    }
}