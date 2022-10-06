const config = require('../../config.json');

module.exports = (msg, db, chalk, Levels, MessageEmbed, client) => {

    //ONLY GIVE PEOPLE XP EVERY 10 SECONDS
    if(Levels.includes(msg.author.id)){
        return;
    }else{
        Levels.push(msg.author.id);
        setTimeout(() => {
            Levels.splice(Levels.indexOf(msg.author.id));
        }, 10000);
    }

    //GLOBAL USER LEVELS
    db.table('Users').get(msg.author.id.toString()).run(global.conn, (err, res) => {
        if(err)console.log(chalk.red(chalk.grey('[' + chalk.red('ERROR') + '] ' + chalk.red(err.message))));

        //IF USER ISNT IN DATABASE ADD THEM TO IT
        if(res == null){
            db.table('Users').insert({
                id: msg.author.id,
                name: msg.author.username,
                icon: msg.author.avatarURL(),
                creationDate: msg.author.createdAt,
                level: 1,
                xp: 0,
                xpNeeded: 150,
                bits: 0
            }).run(global.conn, (err, res) => {
                if(err)console.log(chalk.red(chalk.grey('[' + chalk.red('ERROR') + '] ' + chalk.red(err.message))));
                if(res != null)console.log(chalk.green(chalk.grey('[' + chalk.green('DB') + ']Successfully inserted: ' + chalk.green(res.inserted + ' User'))));
            });

        //IF USER IS IN DATABASE UPDATE VALUES
        }else{
            var xpToAdd = randomnum(1, 10);
            var newLevel;
            var newXp;
            var newXpNeeded;

            //IF XP IS GREATER THAN XPNEEDED LEVEL UP USER
            if(xpToAdd + res.xp >= res.xpNeeded){
                newLevel = res.level+1;
                newXp = 0;
                newXpNeeded = Math.floor(res.xpNeeded*1.3);

                var guildMain = client.guilds.cache.get('959880825422356500');

                switch (newLevel) {
                    case 5:
                        var roleMain = guildMain.roles.cache.find(role => role.id === '977138391428780042');
                        msg.member.roles.add(roleMain);
                        break;
                    case 10:
                        var roleMain = guildMain.roles.cache.find(role => role.id === '977138395597897749');
                        msg.member.roles.add(roleMain);
                        break;
                    case 15:
                        var roleMain = guildMain.roles.cache.find(role => role.id === '977138408700928020');
                        msg.member.roles.add(roleMain);
                        break;
                    case 20:
                        var roleMain = guildMain.roles.cache.find(role => role.id === '977138412773605386');
                        msg.member.roles.add(roleMain);
                        break;
                    case 25:
                        var roleMain = guildMain.roles.cache.find(role => role.id === '977138415160143902');
                        msg.member.roles.add(roleMain);
                        break;
                    case 30:
                        var roleMain = guildMain.roles.cache.find(role => role.id === '977138417534119976');
                        msg.member.roles.add(roleMain);
                        break;
                    case 35:
                        var roleMain = guildMain.roles.cache.find(role => role.id === '977138402128445450');
                        msg.member.roles.add(roleMain);
                        break;
                    case 40:
                        var roleMain = guildMain.roles.cache.find(role => role.id === '977138410265395201');
                        msg.member.roles.add(roleMain);
                        break;
                    case 45:
                        var roleMain = guildMain.roles.cache.find(role => role.id === '977138393496580117');
                        msg.member.roles.add(roleMain);
                        break;
                    case 50:
                        var roleMain = guildMain.roles.cache.find(role => role.id === '977138406448594965');
                        msg.member.roles.add(roleMain);
                        break;
                    case 55:
                        var roleMain = guildMain.roles.cache.find(role => role.id === '977138404225589248');
                        msg.member.roles.add(roleMain);
                        break;
                    case 60:
                        var roleMain = guildMain.roles.cache.find(role => role.id === '977138397984456754');
                        msg.member.roles.add(roleMain);
                        break;
                    case 65:
                        var roleMain = guildMain.roles.cache.find(role => role.id === '977138399997751296');
                        msg.member.roles.add(roleMain);
                        break;
                    case 70:
                        var roleMain = guildMain.roles.cache.find(role => role.id === '977138388413075497');
                        msg.member.roles.add(roleMain);
                        break;
                    case 75:
                        var roleMain = guildMain.roles.cache.find(role => role.id === '977138264672727100');
                        msg.member.roles.add(roleMain);
                        break;
                    case 80:
                        var roleMain = guildMain.roles.cache.find(role => role.id === '977138118694154260');
                        msg.member.roles.add(roleMain);
                        break;
                    default:
                        break;
                }

                const embed = new MessageEmbed()
					.setColor(config.msgColors.success)
                    .setDescription('**' + msg.author.username + '** has leveled up to **Level ' + newLevel + '**');
		        msg.channel.send({ embeds: [embed]});
                
            //IF XP IS NOT GREATER THAN XP NEEDED ADD XP
            }else{
                newLevel = res.level;
                newXp = res.xp+xpToAdd;
                newXpNeeded = res.xpNeeded;
            }

            //SUBMIT UPDATES TO DATABASE
            db.table('Users').get(msg.author.id.toString()).update({
                name: msg.author.username,
                icon: msg.author.avatarURL(),
                level: newLevel,
                xp: newXp,
                xpNeeded: newXpNeeded,
                bits: (res.bits+randomnum(1, 5))
            }).run(global.conn, (err, res) => {
                if(err)console.log(chalk.red(chalk.grey('[' + chalk.red('ERROR') + '] ' + chalk.red(err.message))));
            });
        }
    });
}

function randomnum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }