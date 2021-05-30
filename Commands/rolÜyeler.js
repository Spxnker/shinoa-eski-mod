const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require('moment')
const Database = require('../Models/ExecutorModel.js')
const { rolVer, renk,embedCreator } = require('../functions');
exports.run = async(client, message, args) => {

    if (!message.member.hasPermission('ADMINISTRATOR')) return message.react(ayarlar.emojiler.red);
      
    let rol = args[0]
    if (!rol) return message.reply('Bir rol ID belirtmelisin.')

    let roluyeler = message.guild.members.cache.filter(piece => piece.roles.cache.has(rol)).size

    message.channel.send(`
    ● <@&${rol}> \`(${rol})\` rol bilgileri;
    ● Rol rengi: \`${message.guild.roles.cache.get(rol).hexColor}\` 
    ● Rol kişi sayısı: \`${roluyeler}\`
    ─────────────────
    ● Roldeki kişiler:
    ${message.guild.roles.cache.get(rol).members.map(m=> m .toString()+ " - " + "("+m.id+")").join("\n")}
    `, { split: true }).catch(err => message.channel.send(`Bir hata oluştu. | Hata kodu: ${err}`));

};

exports.commandSettings = {
    name: "rolüyeler",
    aliases: ["rol"],
    guildOnly: true, 
    coolDown: 3000, 
    description: ""
}