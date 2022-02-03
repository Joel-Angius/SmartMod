const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')
const config = require("../Settings/config.json");

const SmartModColour = config.SmartModColours
const prefix = config.Prefix
const ms = require('ms')

module.exports = {
    name: 'mute',
    description: 'mutes a user',
    async execute(client, args, discord, message) {
    // not for dms 
    if (message.channel.type === "dm") return message.channel.send("This command is not supported DMs; please run it in a Discord server.")
    //
    
        const mutes = require("../Systemlogs/mutes.json");
        const memberuserlogs = message.mentions.members.first()

        if (!mutes[memberuserlogs]) {
            mutes[memberuserlogs] = {
                muteCount: 1
            }
        } else {
            mutes[memberuserlogs].muteCount += 1;
        }

        //
        let guildname = message.guild.name
        const user = message.mentions.members.first();
        const reason = args.slice(2).join(" ");
        let time = args[1];
        if (!time) time = "1h";
        // command variables 
        var errormessage = new Discord.MessageEmbed()
        .setColor(SmartModColour)
            .setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
            .setDescription(`This user has been muted but I failed to dm them.`)
            .setFooter("Smart Moderation")

        var NoPerms = new Discord.MessageEmbed()
        .setColor(SmartModColour)
            .setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
            .setTitle("You cannot use this command!")
            .setDescription("You aren\'t part of the Moderation team in this server!")
            .setFooter("Smart Moderation")

        var invalidlayout = new Discord.MessageEmbed()
        .setColor(SmartModColour)
            .setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
            .setTitle("Command : -mute")
            .setDescription("**Command Layout:** -mute [User] [Time] [Reason] \n **Example:** -mute JoelHCraft#9541 1h naughty! \n **Cooldown:** Coming soon!")
            .setFooter("Smart Moderation")

        var antimuteauth = new Discord.MessageEmbed()
        .setColor(SmartModColour)
            .setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
            .setTitle("You cannot mute yourself!")
            .setDescription(`You cannot use the mute command on yourself!`)
            .setFooter("Smart Moderation")

        var alreadymuted = new Discord.MessageEmbed()
        .setColor(SmartModColour)
            .setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
            .setTitle("This user is already muted!")
            .setDescription(`I cannot mute this user as they\'re already muted!`)
            .setFooter("Smart Moderation")

        var dmmute = new Discord.MessageEmbed()
        .setColor(SmartModColour)
            .setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
            .setDescription(`You were muted in ${guildname} for : ${ms(ms(time))} for ${reason != "" ? reason : "No reason was given"}`)
            .setFooter("Smart Moderation")

        var nomuterolefound = new Discord.MessageEmbed()
        .setColor(SmartModColour)
            .setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
            .setTitle("No mute role!")
            .setDescription(`I cannot mute this user as I cannot find the Muted role! Please create a role called Muted`)
            .setFooter("Smart Moderation")

        var nowmuted = new Discord.MessageEmbed()
        .setColor(SmartModColour)
            .setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
            .setTitle("User has been muted!")
            .addFields({
                name: `User Muted:`,
                value: `${user}`,
                inline: true
            },
                {
                    name: 'Moderated by:',
                    value: `${message.author}`,
                    inline: false
                },
                {
                    name: `Muted for:`,
                    value: `${reason != "" ? reason : "No reason was given"}`,
                    inline: false
                },
                {
                    name: `Time muted for:`,
                    value: `${ms(ms(time))}`,
                    inline: false
                }
            )
            .setFooter("Smart Moderation")

        // variables end 

        const guild = message.guild
        const mutedroleid = 'Muted';
        const mutedrole = message.guild.roles.cache.find(role => role.name === "Muted");


        if (!message.member.roles.cache.some(r => r.name === "Admin" || r.name === "Moderator")) return message.channel.send(NoPerms)
        if (!user) return message.channel.send(invalidlayout);
        const target = message.guild.members.cache.get(user.id);
        if (user.id === message.author.id) return message.channel.send(antimuteauth);
        if (!mutedrole) return message.channel.send(nomuterolefound);
        if (target.roles.cache.has(mutedrole.id)) return message.channel.send(alreadymuted);



        target.roles.add(mutedrole);

        user.send(dmmute)
            .catch(err => message.channel.send(errormessage));

        message.channel.send(nowmuted);

        setTimeout(() => {
            target.roles.remove(mutedrole);
            const unmute = new Discord.MessageEmbed()
                .setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
                .setColor(SmartModColour)
                .setDescription(`${user} has been unmuted.`);
            message.channel.send(unmute);
        }, ms(time));

        fs.writeFile("./Systemlogs/mutes.json", JSON.stringify(mutes), err => {
            if (err) console.log(err);
        });



    }
}