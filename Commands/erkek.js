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
if(!uye) return message.channel.send("Lütfen doğru doldurun ```.e @Miaf/461212138346905600  ```").then(x => x.delete({timeout: 5000}))
let embed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor("RANDOM").setTimestamp();
if(message.member.hasPermission("ADMINISTRATOR")) {


    Database.findOne({guildID: message.guild.id, execID: message.author.id}, (err, res) => {
        if(!res) {
            new Database({guildID: message.guild.id, execID: message.author.id, erkek: 1}).save()
        } else {
            res.erkek = (res.erkek + 1);
        res.save()
    
        }
    
        
    })
    await uye.roles.add(ayarlar.reg.erkekRoles)
    await uye.roles.add(ayarlar.guildRoles.unregister)
    message.channel.send(embed.setDescription(`${uye} **Kişisine** <@&${ayarlar.reg.erkekRoles[0]}> **rolleri başarıyla verildi** `))




} else {
if(uye.tag.includes(ayarlar.guildSettings.tag) || uye.roles.cache.has(ayarlar.guildRoles.boosterRole) || uye.roles.cache.has(ayarlar.reg.vipRole)) {

Database.findOne({guildID: message.guild.id, execID: message.author.id}, (err, res) => {
    if(!res) {
        new Database({guildID: message.guild.id, execID: message.author.id, erkek: 1}).save()
    } else {
        res.erkek = (res.erkek + 1);
    res.save()

    }

    
})
await uye.roles.add(ayarlar.reg.erkekRoles)
await uye.roles.add(ayarlar.guildRoles.unregister)
message.channel.send(embed.setDescription(`${uye} **Kişisine** <@&${ayarlar.reg.erkekRoles[0]}> **rolleri başarıyla verildi** `))

} else message.channel.send(embed.setDescription(`${uye} isminde tag olmayan kullanıcıları kayıt edemem.`).setFooter(`Sana bir bilgi vereyimmi, booster veya vip ise kayıt olabilir. Kimseye söyleme şşş!`))

}

};

exports.commandSettings = {
    name: "erkek",
    aliases: ["e","adam"],
    guildOnly: true, 
    coolDown: 3000, 
    description: ""
}