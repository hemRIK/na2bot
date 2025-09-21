import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const uri = process.env.MONGO_URI
 

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
export async function conectadb()
{

await client.connect();

return client.db("Meubanco") // transforma db em um objeto "meu banco"
}

 const db= await conectadb()
 export async function salvarnomes(campo,nome,campo2 ,iddiscord)
 {

 //console.log(nome)
if(db==null) { db = await conectadb()}


 const collectionusuario = db.collection("usuarios")
 
  await collectionusuario.insertOne({[campo]:nome ,[campo2]:iddiscord})
  
 //console.log(`nome ${nome} salvo no banco de dados com o id ${iddiscord}`)
 
 }
export async function removernomes(id)
{

  console.log("entrou no removernomes ")
if(db==null) { db = await conectadb(),   console.log("entrou no conectdb ") }
const campo = "ID Discord"
 const collectionusuario = db.collection("usuarios")
 
 const resultado = await collectionusuario.deleteOne({[campo]:id})

  if (resultado.deletedCount === 0) {
      console.log(`Nenhum usuário com ID ${id} foi encontrado no banco.`);
    } else {
      console.log(`O usuário com ID ${id} foi removido do banco de dados.`);
    }
}

