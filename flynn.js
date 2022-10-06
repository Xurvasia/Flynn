const { Client, Intents, MessageEmbed, Discord } = require('discord.js');
const config = require('./config.json');
const chalk = require('chalk');
const os = require('os-utils');
const db = require('rethinkdb');

//INTENT MNAGER AND CLIENT SPAWNER
const client = new Client({ intents: [ 
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_MESSAGES, 
    Intents.FLAGS.GUILD_VOICE_STATES, 
    Intents.FLAGS.GUILD_MEMBERS
] });

//MODULES
var ready = require('./BOT/READY/ready.js');
var commandHandler = require('./BOT/COMMANDS/commandHandler.js');
var levelHandler = require('./BOT/LEVELS/levelHandler.js');
var vcLevelHandler = require('./BOT/LEVELS/vcLevelHandler');

//MAPS FOR DATA
var Levels = [];
var vcLevels = [];
const custom = {};
const camonly = [];

//WHEN CLIENT INITIALIZES
client.once('ready', () => {
    ready(client, chalk, db);

    setInterval(() => {
        vcLevelHandler(db, chalk, vcLevels, MessageEmbed, client);
    }, 5 * 60 * 1000);
});

//COMMAND HANDLER
client.on('messageCreate', async msg => {

    const args = msg.content.slice(config.dPrefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    //DONT LET BOT RESPOND TO ITSELF
    if(msg.author.id == client.user.id)return;

    //DONT LET BOT RESPOND TO OTHER BOTS
    if(msg.author.bot == true)return;

    //HANDLES COMMANDS
    commandHandler(msg, db, config.dPrefix, os, MessageEmbed, client, custom, camonly, args);

    //HANDLES LEVELS
    levelHandler(msg, db, chalk, Levels, MessageEmbed, client);
});


var camexempt = [];
client.on('voiceStateUpdate', (oldstate, newstate) => {

    if(newstate.channel !== null){
        if(!vcLevels.includes(newstate.member.id)){
            vcLevels.push(newstate.member.id);
        }
    }else{
        vcLevels.splice(vcLevels.indexOf(newstate.member.id));
    }


    //CAM SECTION
    if(!camexempt.includes(newstate.member.id)){
    if(newstate.channel !== null){
        if(newstate.channel.name.includes('📷')){
            setTimeout(() => {
                if(!newstate.selfVideo){
                    newstate.disconnect().then(() => {
                        const embed = new MessageEmbed()
                        .setColor('#006fdd')
                        .setDescription(':x: DISCONNECTED \n \n' + 'REASON: You must turn your camera on within 5 seconds of joining a vc with the 📷 emoji!');
             newstate.member.send({ embeds: [embed]});
                    })
                }
            }, 5000);
        }
    }
}
});

//LOGIN THE CLIENT
client.login(config.token);

//XP PARSER AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
function xpParse (value) {
    var suffixes = ["", "k", "m", "b","t"];
    var suffixNum = Math.floor((""+value).length/3);
    var shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000,suffixNum)) : value).toPrecision(3));
    if (shortValue % 1 != 0) {
        shortValue = shortValue.toFixed(1);
    }
    return shortValue+suffixes[suffixNum];
  }