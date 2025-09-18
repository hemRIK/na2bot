import { Client, GatewayIntentBits, Events } from 'discord.js'
import fs from 'fs'
import 'dotenv/config'; // carrega automaticamente as variáveis do .env
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'))
import Jimp from 'jimp'
import sharp from 'sharp'
import criaemoji from './emoji.mjs'       // se for export default no arquivo
import toapng from 'gif-to-apng'
import download from 'download-file'
import limpar from './msg_delete.js'


import { db } from './banco.js'    // seu banco já exportando db como export



const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, // Servidores
    GatewayIntentBits.GuildMessages, // Mensagens em servidores
    GatewayIntentBits.MessageContent, // Conteúdo das mensagens
    GatewayIntentBits.GuildMembers
  ]
}); 

// Quando o bot inicia
client.once(Events.ClientReady, () => {
  console.log(`✅ Logado como ${client.user.tag}`);
  console.log(`Bot foi iniciado, com ${client.users.cache.size} usuários em ${client.guilds.cache.size} servidores.`);

  client.user.setActivity(`eu estou em ${client.guilds.cache.size} servidores`, { type: 0 }); // 0 = Jogando
});

// Quando entra em um servidor
client.on(Events.GuildCreate, guild => {
  console.log(`O bot entrou no servidor: ${guild.name} (id: ${guild.id}). População: ${guild.memberCount} membros`);
  client.user.setActivity(`Estou em ${client.guilds.cache.size} servidores`, { type: 0 });
});

// Quando é removido de um servidor
client.on(Events.GuildDelete, guild => {
  console.log(`O bot foi removido do servidor: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Estou em ${client.guilds.cache.size} servidores`, { type: 0 });
});

// Quando recebe uma mensagem
client.on(Events.MessageCreate, async message => {
  if (message.author.bot) return; // Ignora mensagens de bots
  const msg = message.content.toLowerCase()

   const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
   const comando = args.shift().toLocaleLowerCase();

    
 if(comando === "apng" )
 {
 let [nome ,emojilink] = args
 let info = {filename:"img.gif"}
 if(!args[0]){ console.log("vazio") }
 if(!args[1]){ console.log("vazio") }
 
 download(emojilink,info, function(err ) {

  if(!err){
toapng("img.gif")
.then( ()=> {
    message.guild.emojis.create({
            attachment: "img.png",
            name: nome
        });

message.channel.send("convertido")

 

}  )



  } else {message.channel.send("link invalido")}
                                          })

}

 
  switch(msg)
  {
case '!ping':
    await message.reply('pong');
    break;
case '!cls':
   await  limpar(message,args);
     // await cls.Events.limpar(message,args)
    break;
case '!desafio':
db.data.posts.push('teste')
db.write()
     await message.reply('desafio');
    break;
}})
//
client.on("guildMemberAdd",async member => {
 
    
    const canal = await client.channels.fetch("1348002865037180930"); // id do canal do discord 


  
    let fonte = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);// fonte

 
  
    let tamanhofoto = 490; // tamanho foto e mascara

 

 const mask = await Jimp.read('img/mascara.png')
 const fundo = await Jimp.read('img/fundo.png')
 const avatarURL = member.user.displayAvatarURL({size: 512});

  console.log(avatarURL)
 

 const response = await fetch(avatarURL);
 
 
const arrayBuffer = await response.arrayBuffer();

const buffer =  Buffer.from(arrayBuffer);

   

const bufferPng = await sharp(buffer).png().toBuffer();
 
const avatar = await Jimp.read(bufferPng); 


  

   mask.resize(tamanhofoto,tamanhofoto)

   avatar.resize(tamanhofoto,tamanhofoto).mask(mask)
  
   // ajusta tamanho da foto e mascara 
   fundo.print(fonte,13,910, member.user.username)

    fundo.composite(avatar,10,366).writeAsync ('bem-vindo.png');

         await canal.send({files:["bem-vindo.png"]})
         


 

   })

 

 
client.login(process.env.TOKEN);
