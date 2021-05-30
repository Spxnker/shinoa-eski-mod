const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require('moment')
const Database = require('../Models/ExecutorModel.js')
const { rolVer, renk,embedCreator } = require('../functions');
exports.run = async(client, message, args) => {

    if (!message.member.hasPermission('ADMINISTRATOR')) return message.react(ayarlar.emojiler.red);

    
    let miktar = Number(args[0]);
    if (!miktar) return;
    message.channel.setRateLimitPerUser(miktar).catch(err => message.channel.send(`Bir hata oluştu! | ${err}`));
    message.react(ayarlar.emojiler.onay);
    
};

exports.commandSettings = {
    name: "slowmode",
    aliases: ["slow"],
    guildOnly: true, 
    coolDown: 3000, 
    description: ""
}