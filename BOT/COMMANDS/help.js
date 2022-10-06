module.exports = async function help(MessageEmbed, msg, client, prefix){

    const embed = new MessageEmbed()
        .setColor('#006fdd')
        .setTitle('HELP MENU')


        .setDescription(`
        **GENERAL COMMANDS** \n
        ${'`' + prefix + 'help` | View all the commands!'}
        ${'`' + prefix + 'profile` | View your user profile!'}
        ${'`' + prefix + 'leaderboard` | View who the top 10 most active users are!'}
        \n**FUN COMMANDS** \n
        ${'`' + prefix + '8ball [question]` | Will reply with an answer based on the question you ask!'}
        ${'`' + prefix + 'coin` | Flip a coin to get heads or tails!'}
        ${'`' + prefix + 'dice` | Roll the dice for a number 1-6!'}
        ${'`' + prefix + 'temp` | Pulls up the commands on how to create a custom vc!'}
        `)
        msg.channel.send({ embeds: [embed]});

}
