const { readFile, writeFile } = require('fs')
const { promisify } = require('util')
const writeFileAsync = promisify(writeFile)
const readFileAsync = promisify(readFile)

class Database {

    constructor() {
        this.NOME_ARQUIVO = './servicos-index/db.json'
    }

    async $obterDadosArquivo() {
        let arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8')
        let resultado = JSON.parse(arquivo)
        return resultado
    }

    async $escreverArquivo(dados) {
        await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados))
        return true
    }

    async listar(id) {
        const dados = await this.$obterDadosArquivo()
        const dadosFiltrados = dados.filter(item => (id ? (item.id === id) : true))
        return dadosFiltrados
    }

    async cadastrar(heroi) {
        const dados = await this.$obterDadosArquivo()
        const id = !heroi.id ? Date.now() : heroi.id;

        const heroiComID = {
            id,
            ...heroi
        }

        const dadosFinal = [
            ...dados,
            heroiComID
        ]

        const resultado = await this.$escreverArquivo(dadosFinal)
        return resultado
    }

    async remover(heroId) {
        const dados = await this.$obterDadosArquivo()
        const indice = dados.findIndex(i => parseInt(i.id) === parseInt(heroId))
        
        indice === -1 ? console.error('Não existem registros desse herói em nosso sistema') : await dados.splice(indice, 1)
        return await this.$escreverArquivo(dados) 
    }

    async atualizar(id, modificacoes) {
        const dados = await this.$obterDadosArquivo()
        const indice = dados.findIndex(i => i.id === parseInt(id))

        if (indice === -1) {
            throw Error("O herói indicado não existe.");
        }

        const atual = dados[indice] // atual = objeto que será atualizado
        const objetoAtualizado = {  // nessa etapa, preserva-se as informações que não foram informadas para atualização e se cria um novo objeto com a base do 'atual'
            ...atual,
            ...modificacoes         // as modificações desejadas que foram citadas nos parâmetros da função.
        }
        dados.splice(indice, 1)     // retira-se o objeto antigo = 'atual' 

        console.log("Herói atualiazdo.")
        return this.$escreverArquivo([  // será retornado para dentro do arquivo uum objeto atualiado, preservando os dados já existentes anteriormente.
            ...dados,                   // os dados que já existiam previamente
            objetoAtualizado            // novo objeto com as modificações desejadas.
        ])
    }
}

module.exports = new Database()