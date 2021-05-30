const { Activity } = require('discord.js');
const mongoose = require('mongoose');

const register = mongoose.Schema({
guildID: String,
execID: String,
victimID: String,
erkek:{type: Number, default: 0},
kari: {type: Number, default: 0},
nicknames: Array
});

module.exports = mongoose.model("shinoaRegister", register);