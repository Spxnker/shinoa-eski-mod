const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require('moment')
const Database = require('../Models/regModel.js')
const { rolVer, renk,embedCreator } = require('../functions');
exports.run = async(client, message, args) => {
    let sunucu = client.guilds.cache.get(ayarlar.guildSettings.guildID);
    if(!message.member.roles.cache.has(ayarlar.reg.regHammer) && !message.member.hasPermission("ADMINISTRATOR")) return embedCreator("#4D0A0A", `Bu komutu kullanmak için yeterli yetkin bulunmuyor.`,message,[true,5000])

let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
let embed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor("RANDOM").setTimestamp();

const isim = args.slice(1).filter(x => isNaN(x)).map(arg => arg.charAt(0).toUpperCase() + arg.slice(arg.charAt(0).length).toLowerCase()).join(" ");
const yas = args.slice(2).filter(x => !isNaN(x))[0];
const tag = uye.user.username.includes(ayarlar.guildSettings.tag) ? ayarlar.guildSettings.tag : ("⦁" === "" ?  ayarlar.guildSettings.tag : "⦁");
 let isiml = `${tag} ${isim} | ${yas}`
 if(!uye || !isim || !yas || !isiml) return message.channel.send("Lütfen doğru doldurun ```.i @Shinoa/461212138346905600 [İsim] [Yaş] ```").then(x => x.delete({timeout: 5000}))

uye.setNickname(isiml)
message.channel.send(embed.setDescription(`${uye} Kişisinin ismi **başarıyla**   ${isiml} olarak değiştirildi!`))
Database.findOne({guildID: message.guild.id, victimID: uye.id}, (err, res) => {
if(!res) {
new Database({guildID: message.guild.id, victimID: uye.id, nicknames: [{isimler: `${isiml}`}]}).save()
} else {
    res.nicknames.push({isimler: `${isiml}`})
res.save()
}

})

console.log(isiml)
};

exports.commandSettings = {
    name: "isim",
    aliases: ["i"],
    guildOnly: true, 
    coolDown: 3000, 
    description: ""
}