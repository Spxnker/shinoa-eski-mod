const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require('moment')
const Database = require('../Models/regModel.js')
const { rolVer, renk,embedCreator } = require('../functions');
exports.run = async(client, message, args) => {

let map = client.commands.map((value, index) => ` - \`${value.commandSettings.name}\` `)

embedCreator("#4D0A0A", `Sunucuda Bulunan Komutlar\n ${map.join("\n")}`,message,[true,30000])

};

exports.commandSettings = {
    name: "komutlar",
    aliases: ["com","help","yardım"],
    guildOnly: true, 
    coolDown: 3000, 
    description: ""
}