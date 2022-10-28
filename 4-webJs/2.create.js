const database = require('./services/database')
const assert = require('assert')
const exp = require('constants')

const BATMAN = {
    nome: 'Batman',
    poder: 'Dinheiro'
}

describe("Implementação de um novo herói na lista", async () => {
    it("Deve criar um novo elemento na lista de heróis", async () => {
        const expected = true
        const resultado = await database.cadastrar(BATMAN)
        console.log("Resposta desejada:", expected)
        console.log("Resposta postada   :", resultado)
        assert.deepEqual(resultado, expected)
    })
})