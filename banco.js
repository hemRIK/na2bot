import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
export {db} 
// Cria conexão com o arquivo JSON
const adapter = new JSONFile('db.json')
const db = new Low(adapter, { posts: [] }) // valor padrão inicial
 
// Lê o arquivo
await db.read()

// Se o arquivo estiver vazio, garante a estrutura mínima
if (!db.data) {
  db.data = { posts: [] }
}

// Se não existir a chave posts, cria
if (!db.data.posts) {
  db.data.posts = []
}

// Agora dá pra usar push sem erro
db.data.posts.push({ 
    id:"1111",
     nick:"henrique" 
    } )

// Salva no JSON
await db.write()

console.log("Posts:", db.data.posts)
