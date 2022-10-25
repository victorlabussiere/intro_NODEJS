const { readFile, writeFile } = require('fs')
const { promisify } = require('util')

const writeFileAsync = promisify(writeFile)
const readFileAsync = promisify(readFile)

class Database {

    constructor() {
        this.NOME_ARQUIVO = '../services/herois.json'
    }

    async obterDadosArquivo() {
        let arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8')
        let resultado = JSON.parse(arquivo.toString())
        return resultado

    }

    async escreverArquivo(dados) {
        await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados))
        return true
    }

    async cadastrar(heroi) {
        const dados = await this.obterDadosArquivo()
        const id = !heroi.id ? Date.now() : heroi.id;

        const heroiComID = {
            id,
            ...heroi
        }

        const dadosFinal = [
            ...dados,
            heroiComID
        ]

        const resultado = await this.escreverArquivo(dadosFinal)
        return resultado
    }

    async listar(id) {
        const dados = await this.obterDadosArquivo()
        const dadosFiltrados = dados.filter(item => (id ? (item.id === id) : true))
        return dadosFiltrados
    }
}

module.exports = new Database()