const chalk = require('chalk');

module.exports = async function level(MessageEmbed, msg, client, db, chalk){

	//GET USER FROM DATABASE
	db.table('Users').get(msg.author.id.toString()).run(global.conn, (err, res) => {
		if(err)console.log(chalk.red(chalk.grey('[' + chalk.red('ERROR') + '] ' + chalk.red(err.message))));

		if(res != null){
			var bar = calculateXP(res.xp, res.xpNeeded);

		//SEND MESSAGE IN CHAT OF USERS LEVEL
		const embed = new MessageEmbed()
					.setColor('#006fdd')
					.setDescription(`**${msg.author.username}'s Profile** \n
					**:crystal_ball: Level:** ${'`' + res.level + '`'} \n
					**:zap: Xp:** ${'`' + res.xp + ' / ' + res.xpNeeded + '`'} \n
					${bar}

					**:gem: Bits:** ${'`' + res.bits + '`'} \n
					**Creation Date:** ${'`' + msg.author.createdAt.toDateString() + '`'}
					`);
		msg.channel.send({ content: `${msg.author.toString()}`,embeds: [embed]});
		}

	});
}

function calculateXP(xp, xpNeeded) {
	var percent = ((xp/xpNeeded)*100);
	if(percent >= 0 && percent < 20){
		return ':yellow_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square:';
	}else if(percent >= 20 && percent < 30){
		return ':yellow_square::yellow_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square:';
	}else if(percent >= 30 && percent < 40){
		return ':yellow_square::yellow_square::yellow_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square:';
	}else if(percent >= 40 && percent < 50){
		return ':yellow_square::yellow_square::yellow_square::yellow_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square:';
	}else if(percent >= 50 && percent < 60){
		return ':yellow_square::yellow_square::yellow_square::yellow_square::yellow_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square:';
	}else if(percent >= 60 && percent < 70){
		return ':yellow_square::yellow_square::yellow_square::yellow_square::yellow_square::yellow_square::black_large_square::black_large_square::black_large_square::black_large_square:';
	}else if(percent >= 70 && percent < 80){
		return ':yellow_square::yellow_square::yellow_square::yellow_square::yellow_square::yellow_square::yellow_square::black_large_square::black_large_square::black_large_square:';
	}else if(percent >= 80 && percent < 90){
		return ':yellow_square::yellow_square::yellow_square::yellow_square::yellow_square::yellow_square::yellow_square::yellow_square::black_large_square::black_large_square:';
	}else if(percent >= 90 && percent < 100){
		return ':yellow_square::yellow_square::yellow_square::yellow_square::yellow_square::yellow_square::yellow_square::yellow_square::yellow_square::black_large_square:';
	}
}