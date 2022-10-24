/*
Objetivo: Acessar uma tabela de endereço de um determinado usuário
A tabela de endereço é relacional à uma tabela de telefone;
A tabela de telefone é relacional à tabela de usuário;
Devemos acessar o usuário através de seu ID;
*/

function obterUser(callback) {
    setTimeout(() => {
        return callback(null, {
            user: {
                id: 1,
                nome: 'Aladin',
                nasciment: new Date()
            }
        })
    }, 1000);
}

function obterTel(userId, callback) {
    setTimeout(() => {
        return callback(null, {
            tel: '994726423',
            ddd: 21
        })
    }, 2000);
}

function obterEnd(userTel, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'dos bobos',
            numero: 0
        })
    }, 2000);
}

// Executando código.

console.log('buscando usuário')

obterUser((erro, usuario) => {

    if (erro) {
        console.error('problemas com usuário: ', error)
    }

    console.log(usuario.user)
    obterTel(usuario.id, function (erroTel, telefone) { // callback da obterUser => Inicia a busca pelo telefone após receber a resposta do usuário
        if (erroTel) {
            console.error('problemas com telefone: ', error)
        }
        console.log(telefone)
        obterEnd(telefone, function (erroEnd, endereco) { // callback da obterTek => Inicia a busca pelo endereço após receber a resposta do telefone
            if (erroEnd) {
                console.error('problemas com enderço: ', error)
            }

            console.log(endereco)
            console.log(`
                O usuário de ID ${usuario.user.id}, possui o telefone (${telefone.ddd}) ${telefone.tel} e reside na rua ${endereco.rua}, número ${endereco.numero}
            `)
        })
    })
})