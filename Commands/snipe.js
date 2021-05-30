const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require('moment')
const Database = require('../Models/ExecutorModel.js')
const { rolVer, renk,embedCreator } = require('../functions');
exports.run = async(client, message, args) => {
    let embed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor("RANDOM").setTimestamp()
    .addField(``)



};

exports.commandSettings = {
    name: "snipe",
    aliases: ["snipe"],
    guildOnly: true, 
    coolDown: 3000, 
    description: ""
}