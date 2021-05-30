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
if(!uye) return embedCreator("#4D0A0A", `Lütfen doğru doldurun \n .isimler @Shinoa/461212138346905600 `,message,[true,5000])

let embed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor("RANDOM").setTimestamp();
Database.findOne({guildID: message.guild.id, victimID: uye.id}, (err, res) => {
if(!res) {
    message.channel.send(embed.setDescription("Bu kişinin geçmiş isim verisi bulunamadı"))
} else {
    res = res.nicknames.reverse();
    const History = res.map((e, i) => `\`${e.isimler}\``);
message.channel.send(embed.setDescription(`${uye} Kullanıcısının aşağıda sunucuda olduğu tüm kayıtlı isimleri listelenmiştir! \n${History.join("\n")}`))

}

})
};

exports.commandSettings = {
    name: "isimler",
    aliases: [],
    guildOnly: true, 
    coolDown: 3000, 
    description: ""
}