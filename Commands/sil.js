const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require('moment')
const Database = require('../Models/ExecutorModel.js')
const { rolVer, renk,embedCreator } = require('../functions');
exports.run = async(client, message, args) => {

    if (!message.member.hasPermission('ADMINISTRATOR')) return message.react(ayarlar.emojiler.red);

    let shinoa = Number(args[0]);
    if (!shinoa) return;
    message.react(ayarlar.emojiler.onay);
message.channel.bulkDelete(shinoa)

};

exports.commandSettings = {
    name: "sil",
    aliases: ["temizle"],
    guildOnly: true, 
    coolDown: 10000, 
    description: ""
}