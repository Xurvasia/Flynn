module.exports = async function dice(MessageEmbed, msg, client){
    const embed = new MessageEmbed()
        .setColor('#006fdd')
        .setTitle(':game_die: ' + randomnum(1, 6));
        msg.channel.send({ embeds: [embed]});
}

function randomnum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }