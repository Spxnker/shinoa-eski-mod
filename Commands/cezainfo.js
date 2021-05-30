const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require('moment')
const Database = require('../Models/ExecutorModel.js')
const { rolVer, renk,embedCreator } = require('../functions');
exports.run = async(client, message, args) => {
    let sunucu = client.guilds.cache.get(ayarlar.guildSettings.guildID);
    if(!message.member.hasPermission("MANAGE_ROLES")) return embedCreator("#4D0A0A", `Bu komutu kullanmak için yeterli yetkin bulunmuyor.`,message,[true,5000])

let miaf = args[0]
if(!miaf) return message.channel.send("Lütfen doğru doldurun ```.cezainfo [Ceza Numarası]```").then(x => x.delete({timeout: 5000}))
Database.findOne({guildID: message.guild.id,cezaID: miaf }, async (err, ceza) => {
    if(ceza) {
    const embed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor("RANDOM").setTimestamp()
message.channel.send(embed.setDescription(`Cezalandırılan Kişi <@${ceza.victimID}>-(\`${ceza.victimID}\`) \n Cezalandıran Kişi <@${ceza.execID}>-(\`${ceza.execID}\`)\n Ceza Tipi **${ceza.Type}**\n Ceza Sebebi **${ceza.Reason}** `).setTitle(`${miaf} Adlı cezanın dosyası`))
    } else {
        message.channel.send("Belirttiğin Sayı numaralı bir ceza dosyası yok!")
    }
}) 
};

exports.commandSettings = {
    name: "cezainfo",
    aliases: ["cezabilgi"],
    guildOnly: true, 
    coolDown: 3000, 
    description: ""
}