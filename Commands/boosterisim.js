const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require('moment')
const Database = require('../Models/regModel.js')
const { rolVer, renk,embedCreator } = require('../functions');
exports.run = async(client, message, args) => {
    let sunucu = client.guilds.cache.get(ayarlar.guildSettings.guildID);
    if(!message.member.roles.cache.has(ayarlar.guildRoles.boosterRole)) return;

const tag = uye.user.username.includes(ayarlar.guildSettings.tag) ? ayarlar.guildSettings.tag : ("⦁" === "" ?  ayarlar.guildSettings.tag : "⦁");

let isim = args.join(' ')
if(!isim) return message.react(ayarlar.emojiler.red)
message.member.setNickname(`${tag} ${isim}`)
message.react(ayarlar.emojiler.onay)
};

exports.commandSettings = {
    name: "booster-isim",
    aliases: ["bisim"],
    guildOnly: true, 
    coolDown: 3000, 
    description: ""
}