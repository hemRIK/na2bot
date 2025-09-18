import Jimp from 'jimp'

async function main (){
     let fonte = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);//
    let tamanhofoto = 490;
    let mask = await Jimp.read('img/mascara.png')
    let avatar = await Jimp.read('img/avatar.jpg')
    let fundo = await Jimp.read('img/fundo.png')

 

Jimp.read('https://img.freepik.com/fotos-gratis/close-up-de-uma-arara-escarlate-de-vista-lateral-close-up-da-cabeca-da-arara-scarlate_488145-3540.jpg?semt=ais_hybrid&w=740&q=80')
  
   .then(avatar => {

   mask.resize(tamanhofoto,tamanhofoto)
   avatar.resize(tamanhofoto,tamanhofoto).mask(mask)
   fundo.print(fonte,13,910,'teaaaaaaaste')
   fundo.composite(avatar,10,366).writeAsync ('bem-vindo.png');

 

   })

.catch(err => { console.log('Erro img avatar')})

}
main()