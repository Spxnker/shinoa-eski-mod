const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require("moment");

const Database = require('../Models/regModel.js')
const { rolVer, renk,embedCreator } = require('../functions');
exports.run = async(client, message, args) => {
    let sunucu = client.guilds.cache.get(ayarlar.guildSettings.guildID);
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
if(!member) return message.channel.send("Lütfen doğru doldurun ```.profil @Shinoa ```").then(x => x.delete({timeout: 5000}))
let embed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor("RANDOM").setTimestamp();
Database.findOne({guildID: message.guild.id, execID: member.id}, (err, res) => {

var erkek = res.erkek || 0
var kari = res.kari || 0
var total = res.kari + res.erkek || 0
var text = `Toplam **${total}** kişi kaydetmiş; **${erkek}** erkek, **${kari}** kadın.`


message.channel.send(embed.setDescription(`
__**Kullanıcı Bilgisi;**__

\`Kullanıcı Adı:\` **${member.user.tag}**
\`ID:\` **${member.id}**
\`Oluşturulma Tarihi:\` **${moment(member.user.createdAt).format("DD/MM/YY HH:mm:ss")}**
__**Sunucu İçi Bilgisi;**__
\`Rolleri:\` ${member.roles.cache.size > 8 ? `Çok fazla rolün mevcut (${member.roles.cache.size})` : member.roles.cache.filter(x => x.name !== "@everyone").map(roles => roles).join(",")}
\`Takma İsim:\` **${member.displayName.replace("`", "")}**
\`Katılma Tarihi:\` **${moment(member.joinedAt).format("DD/MM/YY HH:mm:ss")}**
__**Kayıt Bilgileri;**__
${text}

`));

})



};

exports.commandSettings = {
    name: "profil",
    aliases: ["profil"],
    guildOnly: true, 
    coolDown: 3000, 
    description: ""
}