const Commander = require('commander')
const Database = require('./servicos-index/servicoHeroi')
const Heroi = require('./servicos-index/Herois')

async function main() {

    Commander
        .version('v1')
        .option('-n, --nome [value]', "Nome do Herói:")
        .option('-p, --poder [value]', "Poder do Herói:")
        .option('-i, --id [value]', "ID do Herói:")
        .option('-e, --exibir', "Exibe a lista de heróis registrados")
        .option('-c, --cadastrar', "Cadastrar um Herói")
        .option('-d --deletar [value]', "Deletar um herói")
        .parse(process.argv)
    const heroi = new Heroi(Commander._optionValues)

    try {
        // EXIBIR LISTA DE HERÓIS
        if (Commander._optionValues.exibir) {
            const lista = await Database.listar()
            return console.log("Lista de heróis =>", lista)
        }
        // CADASTRAR HEROI  
        if (Commander._optionValues.cadastrar) {
            delete heroi.id
            const lista = await Database.listar()

            let count = 0
            for (let i = 0; i <= lista.length; i++) {
                lista.map(item => {
                    if (item.nome.toLowerCase() === heroi.nome.toLowerCase()) {
                        return count++                    // validação pelo nome
                    }
                })
            }
            return count === 0 ? await Database.cadastrar(heroi) : console.error("O herói indicado já está registrado")
        }
        // DELETAR HEROI
        if (Commander._optionValues.deletar) {
            const searchHero = Commander._optionValues.nome
            const lista = await Database.listar()
            const indice = lista.findIndex(item => {
                return item.nome.toLowerCase() == searchHero.toLowerCase()      // pesquisa em lista pelo nome inserido
            })
            return indice === -1 ? console.error("Herói não encontrado") : await Database.remover(lista[indice].id)
        }
    } catch (err) {
        console.error("Erro:", err)
    }

}
main()