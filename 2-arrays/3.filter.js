const obterPessoas = require('./services/services')

Array.prototype.meuFilter = function (callback) {
    const lista = []
    for (index in this) {
        const item = this[index]
        const result = callback(item, index, this)
        // 0, "", null, undefined === false
        if (!result) continue;
        lista.push(item)
    }
    return lista;
}

async function main() {
    try {
        const { results } = await obterPessoas('a')
        const familiaLars = results.meuFilter(item => {
            // const familiaLars = results.filter(item => {
            // por padrão, precisa retornar boolean 
            // para informar se deve manter ou remover da lista
            // false > remove da lista
            // true > mantém na lista
            const result = item.name.toLowerCase().indexOf('lars') !== -1
                    // não encontrou = -1
                    // encontrou = posicao no Array
            return result
        })
        const names = familiaLars.map(pessoa => pessoa.name)
        console.log(names)

    } catch (error) {
        console.error("ERRO:", error.message)
    }
}

main() 