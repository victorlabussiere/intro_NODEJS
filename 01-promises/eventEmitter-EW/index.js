const EventEmitter = require('events')
class MeuEmissor extends EventEmitter {

}
const meuEmissor = new MeuEmissor()
const nomeEvento = 'usuario: click';

meuEmissor.on(nomeEvento, function (click) {  // observando um evento customizado.
    console.log('Um ususário clicou', click)
})

meuEmissor.emit(nomeEvento, 'na barra de rolagem') // simulação de um evento ocorrendo
let count = 0
setInterval(() => {
    meuEmissor.emit(nomeEvento, 'no ok ' + (count++))
}, 1000);