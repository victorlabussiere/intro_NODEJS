const obterPessoas = require('./services/services')

// criando o método map() personalizado
Array.prototype.meuMap = function (callback) {
    const novoArrayMapeado = []
    for (let i = 0; i <= this.length - 1; i++) {
        const resultado = callback(this[i], i)
        novoArrayMapeado.push(resultado)
    }
    return novoArrayMapeado
    // Com isso concluimos que o método map() é um for reduzido para facilitar o processo de desenvolvimento.
}

async function main() {
    try {
        const result = await obterPessoas('a')
        // const names = []

        // result.results.forEach(resultados => {
        //     names.push(resultados.name)
        // });

        const names = result.results.map((pessoas, indice) => `[${indice}] ${pessoas.name}`)

        const namesMeuMap = result.results.meuMap((pessoas, indice) => `[${indice}] ${pessoas.name}`)

        // O uso do .map() é mais performático.
        console.log('names =', names)
        console.log('meuMap =', namesMeuMap)
    } catch (error) {
        console.error('Error:', error.message)
    }
}
main()