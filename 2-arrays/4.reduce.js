// o objetivo do reduce é reduzir o array em um único objeto
// único resultado

// preparando serviços:
const obterPessoa = require('./services/services')
Array.prototype.meuReduce = function (callback, valorInicial) {
    let varlorFinal = typeof valorInicial !== undefined ? valorInicial : this[0]
    for (let index = 0; index <= this.length - 1; index++) {
        varlorFinal = callback(varlorFinal, this[index], this);
    }
    return varlorFinal
}
// passando algorítimo:
async function main() {
    try {
        const results = await obterPessoa('a').then(data => data.results.map(item => item.height))
        const altura = results.map(altura => parseInt(altura))
        const alturaTotal = altura.reduce((anterior, proximo) => {
            return anterior + proximo
        })
        const minhaLista = [
            ["Victor", "Labussiere"],
            ["NodeBR", "Vasco da Gama"],
        ]
        const minhaNovaLista = minhaLista.meuReduce((anterior, proximo) => {
            return anterior.concat(proximo)
        }, []).join(', ')
        // retorno da função:
        console.log('Minha lista criada com meuReduce:', minhaNovaLista)
        console.log('Lista de alturas encontradas no swapi:', altura)
        console.log("Soma do total de alturas encontradas no swapi:", alturaTotal)

    } catch (erro) {
        console.error('ERRO', erro)
    }
}
// executando algorítimo:
main()