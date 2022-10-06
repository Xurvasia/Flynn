const status = require('./status.js');
const ping = require('./ping.js');
const eightBall = require('./eightBall.js');
const help = require('./help.js');
const profile = require('./profile.js');
const coin = require('./coin.js');
const dice = require('./dice.js');
const leaderboard = require('./leaderboard.js');
const customVc = require('./customvc.js');

module.exports = (msg, db, prefix, os, MessageEmbed, client, custom, camonly, args) => {
    
    switch (msg.content.toLocaleLowerCase().split(' ')[0]) {

        //HELP COMMAND
        case prefix + 'help':
            help(MessageEmbed, msg, client, prefix);
            break;
        
        //STATUS COMMAND    
        case prefix + 'status':
            status(msg, os, MessageEmbed, client);
            break;
        
        //PING COMMAND
        case prefix + 'ping':
            ping(MessageEmbed, msg, client);
            break;

        //LEVEL COMMAND
        case prefix + 'profile':
            profile(MessageEmbed, msg, client, db);
            break;

        //8BALL COMMAND
        case prefix + '8ball':
            eightBall(MessageEmbed, msg, client);
            break;

        //CUSTOMVC COMMAND
        case prefix + 'temp':
            customVc(MessageEmbed, msg, client, custom, args, camonly);
            break;

        //COIN COMMAND
        case prefix + 'coin':
            coin(MessageEmbed, msg, client);
            break;

        //DICE COMMAND
        case prefix + 'dice':
            dice(MessageEmbed, msg, client);
            break;

        //leaderboard COMMAND
        case prefix + 'leaderboard':
            leaderboard(MessageEmbed, msg, client, db);
            break;

        default:
            break;
    }
}

