const assert = require('assert')
const database = require('./services/database')

const DEFAULT_HERO = {
    nome: "Flash",
    poder: "Speed",
    id: 1
}

describe("Deletando um elemento da lista", async () => {

    it("Deve deletar o herói desejado na lista", async () => {
        const expected = true
        const resultado = await database.remover(DEFAULT_HERO.id)
        assert.deepEqual(resultado, expected)
    })

})
