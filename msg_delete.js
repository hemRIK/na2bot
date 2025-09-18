
 
 
       const limpar = async (message, args) => {
            // Verifica se o usuário tem permissão
            if (!message.member.permissions.has("ManageMessages")) {
                return message.reply("❌ Você não tem permissão para apagar mensagens!");
            }
          const quantidade = parseInt(args[0])|| 100;
        
        try {
            await message.channel.bulkDelete(quantidade,true)
            const msg = await message.channel.send (` Apagadas ${quantidade} mensagens!`)

            setTimeout(()=> msg.delete(),5000  )
        }
            catch(err){message.channel.send(err)}



        }
        
         export default limpar




    