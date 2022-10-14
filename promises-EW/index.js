const { type } = require('os');
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
// conceito de pipe: usuario -> telefone -> ultima função é o telefone.
const user = obterUser()


user
    .then(user => obterTel(user.id) // definindo telefone
        .then(tel => { // promise da função obterTel => result = dados tel
            return ({
                usuario: {
                    nome: user.nome,
                    id: user.id
                },
                telefone: tel
            })
        }))
    .then(user => { // promise do user definindo endereco
        const endereco = obterEnderecoAsync(user.usuario.id)
        return endereco.then(end => {
            return {
                nome: user.usuario.nome,
                id: user.usuario.id,
                tel: user.telefone,
                endereco: end
            }
        })
    })
    .then(user => console.log('resultado: ', user))
    .catch(err => console.error('erro: ', err))