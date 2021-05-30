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

let shinoa = message.mentions.members.first() || message.guild.members.cache.get(args[0])

if(!shinoa) return embedCreator("#4D0A0A", `Lütfen doğru doldurun \n .k @Shinoa/461212138346905600`,message,[true,5000])

let embed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor("RANDOM").setTimestamp();

if(!shinoa.name.includes(ayarlar.guildSettings.tag)) {
    embedCreator("#4D0A0A", `İsminde Tag Bulunan Kullanıcıları Kayıtsıza Atamazsın`,message,[true,5000])
} else {
    user.roles.cache.has(ayarlar.guildRoles.boosterRole) ? user.roles.set([ayarlar.guildRoles.unregister, ayarlar.guildRoles.boosterRole]) : user.roles.set([ayarlar.guildRoles.unregister]).catch(); 
    embedCreator("#4D0A0A", `${shinoa} Kişisi Başarıyla kayıtsıza atıldı!`,message,[true,5000])

}



};

exports.commandSettings = {
    name: "unregister",
    aliases: ["unreg","kayıtsız"],
    guildOnly: true, 
    coolDown: 3000, 
    description: ""
}