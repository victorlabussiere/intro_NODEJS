const { readFile, read } = require('fs')
const { promisify } = require('util')
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

    // escreverArquivo() {

    // }

    async listar(id) {

        const dados = await this.obterDadosArquivo()
        const dadosFiltrados = dados.filter(item => (id ? (item.id === id) : true))
        console.log(dados)
        return dadosFiltrados

    }
}

module.exports = new Database()