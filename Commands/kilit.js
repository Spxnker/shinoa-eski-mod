const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require('moment')
const Database = require('../Models/ExecutorModel.js')
const { rolVer, renk,embedCreator } = require('../functions');
exports.run = async(client, message, args) => {

    if (!message.member.hasPermission('ADMINISTRATOR')) return message.react(ayarlar.emojiler.red);
      
    const everyone = message.guild.roles.cache.find((a) => a.name === "@everyone");
    if (message.channel.permissionsFor(everyone).has("SEND_MESSAGES")) {
        message.channel.updateOverwrite(everyone.id, {
            SEND_MESSAGES: false
        }).catch(err => message.channel.send(`Kanal **kilitlenirken** bir sorun yaşandı. | Hata kodu: ${err}`));
        message.channel.send(`🔒 Kanal başarıyla **kilitlendi**!`);   
    } else {
        message.channel.updateOverwrite(everyone.id, {
            SEND_MESSAGES: true
        }).catch(err => message.channel.send(`Kanal kilidi **açılırken** bir sorun yaşandı. | Hata kodu: ${err}`));
        message.channel.send(`🔓 Kanal kilidi başarıyla **açıldı**!`);
    }


};

exports.commandSettings = {
    name: "kilit",
    aliases: ["kanalkilit","lock"],
    guildOnly: true, 
    coolDown: 3000, 
    description: ""
}