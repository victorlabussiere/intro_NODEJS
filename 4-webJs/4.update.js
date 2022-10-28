const database = require('./services/database')
const { deepEqual } = require('assert')

const ITEMATUALIZAR = {
    nome: "Lanterna Verde",
    poder: "Ser verde",
    id: 2
}

describe('Teste de atualização de listas', async () => {
    before(async () => {
        const lista = await database.$obterDadosArquivo()
        if (lista.length === 0) return await database.cadastrar(ITEMATUALIZAR)
    })

    it("Deve atualizar um herói pelo ID", async () => {
        const dados = await database.$obterDadosArquivo()
        const expected = {
            ...ITEMATUALIZAR,
            nome: "Batman",
            poder: "Dinheiro"
        }
        const NOVOITEM = {
            nome: "Batman",
            poder: "Dinheiro"
        }

        await database.atualizar(ITEMATUALIZAR.id, NOVOITEM)
        const [resultado] = await database.listar(ITEMATUALIZAR.id)

        deepEqual(resultado, expected)
    })
})