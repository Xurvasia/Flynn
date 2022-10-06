module.exports = async function customvc(MessageEmbed, msg, client, custom, args, camonly) {

    if(!args[0]){
        const embed = new MessageEmbed()
            .setColor('#006fdd')
            .setDescription('**PLEASE TYPE A VALID COMMAND:** \n \n'
                + '`]temp create [name]` Creates a custom vc with the [name] you provided!' + '\n \n'
                + '`]temp delete` Deletes your custom vc!' + '\n \n'
                + ' `]temp name [name]` Changes the name of your custom vc to the [name] you privded!' + '\n \n'
                + ' `]temp camonly` Set your custom vc to cams only! If a user joins and doesnt turn their camera on in 5 seconds they get disconnected!' + '\n \n'
                + '`]temp limit [number]` Sets the maximum amount of users that can join your vc to the [number] you provided!');
        await msg.channel.send({ embeds: [embed] });
        return;
    }

    if (args[0].toLocaleLowerCase() == 'create') {
        if (args[1]) {
            if (!custom[msg.author.id]) {
                client.guilds.cache.get('959880825422356500').channels.create(msg.content.split(' ').splice(2).join(' '), { type: "GUILD_VOICE" }).then((channel) => {
                    custom[msg.author.id] = channel.id;
                    channel.setParent('975318545858715719');
                    const embed = new MessageEmbed()
                        .setColor('#006fdd')
                        .setTitle(':white_check_mark: SUCCESS: ' + 'Your custom vc has been made!');
                    msg.channel.send({ embeds: [embed] });
                });
            } else {
                const embed = new MessageEmbed()
                    .setColor('#006fdd')
                    .setTitle(':x: ERROR: ' + '`You already have a custom vc named:` ' + client.guilds.cache.get('959880825422356500').channels.cache.get(custom[msg.author.id]).name);
                await msg.channel.send({ embeds: [embed] });
            }
        } else {
            const embed = new MessageEmbed()
                .setColor('#006fdd')
                .setTitle(':x: ERROR: ' + '`]temp create [name]` Must provide a name!');
            await msg.channel.send({ embeds: [embed] });
        }
    } else if (args[0].toLocaleLowerCase() == 'limit') {
        if (args[1] && parseInt(args[1])) {
            if (custom[msg.author.id]) {
                client.guilds.cache.get('959880825422356500').channels.cache.get(custom[msg.author.id]).setUserLimit(args[1]);
                const embed = new MessageEmbed()
                    .setColor('#006fdd')
                    .setTitle(':white_check_mark: SUCCESS: ' + 'Your vcs temp limit has been set to ' + args[1]);
                await msg.channel.send({ embeds: [embed] });
            } else {
                const embed = new MessageEmbed()
                    .setColor('#006fdd')
                    .setTitle(':x: ERROR: ' + 'You dont have a custom vc!');
                await msg.channel.send({ embeds: [embed] });
            }
        } else {
            const embed = new MessageEmbed()
                .setColor('#006fdd')
                .setTitle(':x: ERROR: ' + '`]temp limit [number]` Must provide a number!');
            await msg.channel.send({ embeds: [embed] });
        }
    } else if (args[0].toLocaleLowerCase() == 'camonly') {
        if (custom[msg.author.id]) {
            if (!camonly.includes(msg.author.id)) {
                camonly.push(msg.author.id);
                if (client.guilds.cache.get('959880825422356500').channels.cache.get(custom[msg.author.id]).name.includes('📷')) {
                    client.guilds.cache.get('959880825422356500').channels.cache.get(custom[msg.author.id]).setName(client.guilds.cache.get('959880825422356500').channels.cache.get(custom[msg.author.id]).name.replace('📷', ''));
                }
                if (!client.guilds.cache.get('959880825422356500').channels.cache.get(custom[msg.author.id]).name.includes('📷')) {
                    client.guilds.cache.get('959880825422356500').channels.cache.get(custom[msg.author.id]).setName('📷' + client.guilds.cache.get('959880825422356500').channels.cache.get(custom[msg.author.id]).name);
                }
                setTimeout(() => {
                    camonly.splice(camonly.indexOf(msg.author.id), 1);
                }, 300000);
            } else {
                const embed = new MessageEmbed()
                    .setColor('#006fdd')
                    .setTitle(':x: ERROR: ' + 'You can only toggle cams every 5 minutes!');
                await msg.channel.send({ embeds: [embed] });
            }
        }
    } else if (args[0].toLocaleLowerCase() == 'name') {
        if (args[1]) {
            if (custom[msg.author.id]) {
                client.guilds.cache.get('959880825422356500').channels.cache.get(custom[msg.author.id]).setName(msg.content.split(' ').splice(2).join(' '));
                const embed = new MessageEmbed()
                    .setColor('#006fdd')
                    .setTitle(':white_check_mark: SUCCESS: ' + 'Your vcs name has been set to ' + msg.content.split(' ').splice(2).join(' '));
                await msg.channel.send({ embeds: [embed] });
            } else {
                const embed = new MessageEmbed()
                    .setColor('#006fdd')
                    .setTitle(':x: ERROR: ' + 'You dont have a custom vc!');
                await msg.channel.send({ embeds: [embed] });
            }
        } else {
            const embed = new MessageEmbed()
                .setColor('#006fdd')
                .setTitle(':x: ERROR: ' + '`]temp name [name]` Must provide a name!');
            await msg.channel.send({ embeds: [embed] });
        }
    } else if (args[0].toLocaleLowerCase() == 'delete') {
        if (custom[msg.author.id]) {
            client.guilds.cache.get('959880825422356500').channels.cache.get(custom[msg.author.id]).delete();
            delete custom[msg.author.id]
            const embed = new MessageEmbed()
                .setColor('#006fdd')
                .setTitle(':white_check_mark: SUCCESS: ' + 'Your custom vc has been deleted!');
            await msg.channel.send({ embeds: [embed] });
        } else {
            const embed = new MessageEmbed()
                .setColor('#006fdd')
                .setTitle(':x: ERROR: ' + 'You dont have a custom vc!');
            await msg.channel.send({ embeds: [embed] });
        }
    } /*else if (args[0].toLocaleLowerCase() == 'kick') {

        if (args[1]) {
            if (custom[msg.author.id]) {
                client.guilds.cache.get('959880825422356500').channels.cache.get(custom[msg.author.id]).setName(msg.content.split(' ').splice(2).join(' '));
                const embed = new MessageEmbed()
                    .setColor('#006fdd')
                    .setTitle(':white_check_mark: SUCCESS: ' + 'Your vcs name has been set to ' + msg.content.split(' ').splice(2).join(' '));
                await msg.channel.send({ embeds: [embed] });
            } else {
                const embed = new MessageEmbed()
                    .setColor('#006fdd')
                    .setTitle(':x: ERROR: ' + 'You dont have a custom vc!');
                await msg.channel.send({ embeds: [embed] });
            }
        } else {
            const embed = new MessageEmbed()
                .setColor('#006fdd')
                .setTitle(':x: ERROR: ' + '`]temp name [name]` Must provide a name!');
            await msg.channel.send({ embeds: [embed] });
        }
    }*/ else {
        const embed = new MessageEmbed()
            .setColor('#006fdd')
            .setDescription('**PLEASE TYPE A VALID COMMAND:** \n \n'
                + '`]temp create [name]` Creates a custom vc with the [name] you provided!' + '\n \n'
                + '`]temp delete` Deletes your custom vc!' + '\n \n'
                + ' `]temp name [name]` Changes the name of your custom vc to the [name] you privded!' + '\n \n'
                + '`]temp limit [number]` Sets the maximum amount of users that can join your vc to the [number] you provided!');
        await msg.channel.send({ embeds: [embed] });
    }
}