module.exports = async function leaderboard(MessageEmbed, msg, client, r){
    r.table('Users').orderBy(r.desc('level'), r.desc('xp')).limit(10).run(global.conn, (err, res) => {
        if(err)console.log(chalk.red(err));
        

        const embed = new MessageEmbed()
        .setColor('#006fdd')
        .setTitle('LEADERBOARD')


        .setDescription(`
        **TOP 10 USERS** \n
        ${':one: `' + res[0].name + '` :crystal_ball: Level: `' + res[0].level + '` :zap: Xp: `' + res[0].xp + ' / ' + res[0].xpNeeded + '`'}
        ${':two: `' + res[1].name + '` :crystal_ball: Level: `' + res[1].level + '` :zap: Xp: `' + res[1].xp + ' / ' + res[1].xpNeeded + '`'}
        ${':three: `' + res[2].name + '` :crystal_ball: Level: `' + res[2].level + '` :zap: Xp: `' + res[2].xp + ' / ' + res[2].xpNeeded + '`'}
        ${':four: `' + res[3].name + '` :crystal_ball: Level: `' + res[3].level + '` :zap: Xp: `' + res[3].xp + ' / ' + res[3].xpNeeded + '`'}
        ${':five: `' + res[4].name + '` :crystal_ball: Level: `' + res[4].level + '` :zap: Xp: `' + res[4].xp + ' / ' + res[4].xpNeeded + '`'}
        ${':six: `' + res[5].name + '` :crystal_ball: Level: `' + res[5].level + '` :zap: Xp: `' + res[5].xp + ' / ' + res[5].xpNeeded + '`'}
        ${':seven: `' + res[6].name + '` :crystal_ball: Level: `' + res[6].level + '` :zap: Xp: `' + res[6].xp + ' / ' + res[6].xpNeeded + '`'}
        ${':eight: `' + res[7].name + '` :crystal_ball: Level: `' + res[7].level + '` :zap: Xp: `' + res[7].xp + ' / ' + res[7].xpNeeded + '`'}
        ${':nine: `' + res[8].name + '` :crystal_ball: Level: `' + res[8].level + '` :zap: Xp: `' + res[8].xp + ' / ' + res[8].xpNeeded + '`'}
        ${':one::zero: `' + res[9].name + '` :crystal_ball: Level: `' + res[9].level + '` :zap: Xp: `' + res[9].xp + ' / ' + res[9].xpNeeded + '`'}

        `)
        msg.channel.send({ embeds: [embed]});


    });
}