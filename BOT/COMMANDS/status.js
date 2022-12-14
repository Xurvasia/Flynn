module.exports = async function status(msg, os, MessageEmbed, client){
    x = parseInt(client.uptime) / 1000;
    seconds = x % 60;
    x /= 60;
    minutes = x % 60;
    x /= 60;
    hours = x % 24;
    x /= 24;
    days = x;

    var embed = new MessageEmbed()
    //TITLE
    .setTitle(client.user.username.toString().toLocaleUpperCase() + ' STATUS:')
    .setColor('#006fdd')

    //INFO
    .addField('UPTIME:', parseInt(days).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'D ' + parseInt(hours) + 'H ' + parseInt(minutes) + 'M ' + parseInt(seconds) + 'S', true)
    .addField('WATCHING:', client.guilds.cache.size.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' SERVERS', true)
    .addField('PING:', parseInt(client.ws.ping) + ' MS', true)
    .addField('OS:', os.platform(), true)
    .addField('FREE MEM:', parseInt(os.freemem()).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' MB', true)
    .addField('TOTAL MEM:', parseInt(os.totalmem()).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' MB', true)

	msg.channel.send({ embeds: [embed]});
}