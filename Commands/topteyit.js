const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require('moment')
const Database = require('../Models/regModel.js')
const { rolVer, renk,embedCreator } = require('../functions');
exports.run = async(client, message, args) => {


    let data = await Database.find().sort({ teyitler: "descending" });
let list = data.filter(x => ((x.erkek + x.kari !== 0)) && (message.guild.members.cache.get(x.execID)) )
    embedCreator("#4D0A0A", ` Top Teyit Listesi; \n\n${list.length ? list.map((d, index) => `\`${index+1}.\` <@${d.execID}> | ${d.erkek + d.kari } ( Erkek:\`${d.erkek}\` Kadın: \`${d.kari}\`)  `).splice(0, 30).join("\n") : "Bulunamadı!"} `,message,[true,30000])


};

exports.commandSettings = {
    name: "topteyit",
    aliases: ["topt","tt","top-teyit"],
    guildOnly: true, 
    coolDown: 3000, 
    description: ""
}