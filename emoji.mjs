import fetch from "node-fetch";
import sharp from "sharp";

export default async function criaemoji() {

    

  
    try {
        // Baixar imagem
        const res = await fetch(emojilink);
        const buffer = Buffer.from(await res.arrayBuffer());

        // Converter para PNG
        await sharp(buffer).png().toFile("emoji.png");

        // Criar emoji no servidor
        await message.guild.emojis.create({
            attachment: "emoji.png",
            name: nome
        });

        await message.channel.send("✅ Emoji convertido e adicionado!");
    } catch (error) {
        console.error(error);
        message.channel.send("❌ Algo deu errado, verifique o link.");
    }
}

 
