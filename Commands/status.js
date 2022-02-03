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
    name: 'status',
    description: 'grants a user',
    async execute(client, message, args, discord) {

        if (message.channel.type === "dm") return message.channel.send("This command is not supported DMs; please run it in a Discord server.")

            const UserId = message.guild.members.cache.get(args[0])

        let User = message.mentions.members.first() || message.author
        if (!User) return message.channel.send("NO LAYOUT")


        premiumSchema.findOne({ User: User.id }, async (err, data) => {
            if (err) throw err;
            if (data) {
                var data = new Discord.MessageEmbed()
                .setColor(SmartModColour)
                .setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
                .addFields(
                    {
                        name: 'Premium Status',
                        value: 'Active',
                        inline: true
                      },
                      {
                        name: 'Expiry',
                        value: 'Never (Unlimited)',
                        inline: true
                      },
                      {
                        name: 'Features',
                        value: 'Premium',
                        inline: true
                      },
                )

                message.channel.send(data)
            } else {
                var NoData = new Discord.MessageEmbed()
        .setColor(SmartModColour)
        .setAuthor('Smart Moderation Beta', 'https://i.imgur.com/t9Ku2gs.jpg')
        .setTitle("No premium!")
        .setDescription(`This user does not have premium. Join our [server](https://discord.gg/VgzRkuHYHB); premium will be given to active users!`)
        .setFooter("Smart Moderation")
                message.channel.send(NoData)
            }
        })


       
       
    }
}