const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require('moment')
const Database = require('../Models/ExecutorModel.js')
const { rolVer, renk,embedCreator } = require('../functions');
exports.run = async(client, message, args) => {

    if (!message.member.hasPermission('ADMINISTRATOR')) return message.react(ayarlar.emojiler.red);
    message.guild.fetchBans().then(x => {
        return message.channel.send(`${x.size > 0 ? x.map(z => `${z.user.tag.replace("`", "")} - ${z.user.id}`).join("\n") : " Bu Sunucuda Mevcut Yasaklama Bulunmuyor."}`, {split: true}).catch(err => message.channel.send(` | ${err}`));
    });
};

exports.commandSettings = {
    name: "banliste",
    aliases: ["ban-liste"],
    guildOnly: true, 
    coolDown: 3000, 
    description: ""
}