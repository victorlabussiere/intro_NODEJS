const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUser() {
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(() => {
            return resolve(
                {
                    id: 1,
                    nome: 'Aladin',
                    dataNasc: '19/05/1995'
                }
            )
        }, 500);
    })
}

function obterTel(userId) {
    return new Promise(function resolverPromise(resolve, reject) {
        setTimeout(() => {
            return resolve({
                numero: '99999-9999',
                ddd: '(21)'
            })
        }, 500);
    })
}

function obterEndereco(useriD, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'dos bobos',
            numero: 0
        })
    }, 500);
}

// 1o passo: adicionar palavra async => automaticamente ela retornar uma Promise

main()
async function main() {
    try {
        console.time('medida-promise')
        const usuario = await obterUser()
        // const telefone = await obterTel(usuario.id)
        // const endereco = await obterEnderecoAsync(usuario.id)
        const resultado = await Promise.all([
            obterTel(usuario.id),
            obterEnderecoAsync(usuario.id)
        ])
        const endereco = resultado[1]
        const telefone = resultado[0]

        console.log(`
            Nome: ${usuario.nome},
            Telefone: (${telefone.ddd}) ${telefone.numero}
            Endereço: Rua: ${endereco.rua}, número: ${endereco.numero}
        `)
        console.timeEnd('medida-promise')
    }
    catch (erro) {
        console.error('Problemas:', erro.message)
    }
}