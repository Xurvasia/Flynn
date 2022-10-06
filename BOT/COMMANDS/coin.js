module.exports = async function coin(MessageEmbed, msg, client){
    var replymap = ['Heads', 'Tails'];
        const embed = new MessageEmbed()
        .setColor('#006fdd')
        .setTitle(':coin: ' + replymap[randomnum(0, replymap.length-1)]);
        msg.channel.send({ embeds: [embed]});
}

function randomnum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }