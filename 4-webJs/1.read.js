const { deepEqual, ok } = require('assert')
const exp = require('constants')
const database = require('../services/database')

const DEFAULT_ITEM_CADASTRAR = {
    nome: 'Flash',
    poder: 'Speed',
    id: 1
}

describe('Suite de manipulação de heróis', () => {
    it('Deve pesquisar um héroi usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR;
        const [resultado] = await database.listar(expected.id)
        deepEqual(resultado, expected)
    })

    // it('Deve cadastrar um herói usando arquivos', async () => {
    //     const expected = DEFAULT_ITEM_CADASTRAR
    //     // Processamento: 
    //     ok(null, expected)
    // })
})