const { deepEqual } = require('assert')
const exp = require('constants')
const database = require('./services/database')

const initialHero = {
    nome: 'Flash',
    poder: 'Speed',
    id: 1
}

describe('Suite de manipulação de heróis', () => {
    
    before(async () => {
        const lista = await database.listar()
        return lista.length === 0 ? database.cadastrar(initialHero) : false
    })

    it('Deve pesquisar o héroi desejado nos arquivos do sistema', async () => {

        const expected = initialHero
        const [resultado] = await database.listar(expected.id)
        console.log("Objeto desejado:", expected)
        console.log("Objeto encontrado:", resultado)
        deepEqual(resultado, expected)

    })
})