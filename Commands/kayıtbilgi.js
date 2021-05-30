const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require('moment')
const Database = require('../Models/regModel.js')
const { rolVer, renk,embedCreator } = require('../functions');
exports.run = async(client, message, args) => {
    let sunucu = client.guilds.cache.get(ayarlar.guildSettings.guildID);
let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author
if(!uye) return message.channel.send("Lütfen doğru doldurun ```.kayitbilgi @Shinoa/461212138346905600 [ ```").then(x => x.delete({timeout: 5000}))
let embed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor("RANDOM").setTimestamp();
Database.findOne({guildID: message.guild.id, execID: uye.id}, (err, res) => {
if(!res) {
    message.channel.send(embed.setDescription("Bu kişinin kayıt bilgisi bulunamadı!"))
} else {
message.channel.send(embed.setDescription(`${uye} kişisi **Toplam** \`${Number(res.erkek + res.kari)}\` (**Erkek** ${Number(res.erkek)}, **Kadın** ${Number(res.kari)}) kişiyi kayıt etmiş  `))
}

})



};

exports.commandSettings = {
    name: "kbilgi",
    aliases: ["kayıt-bilgi"],
    guildOnly: true, 
    coolDown: 3000, 
    description: ""
}