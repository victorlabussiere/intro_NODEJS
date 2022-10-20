// para salvar um comando nas dependências de desenvolvimento, usa-se o comando:
// npm i --save-dev
// Mocha: pacote node que deve ser instalado globalmente e nas dependências de desenvolvimento.
const nock = require('nock')
const assert = require('assert')
const axios = require('axios')
const URL = `https://swapi.dev/api/people`

async function obterPessoa(nome) {
    const url = `${URL}/?search=${nome}&format=json`
    const result = await axios.get(url)
    return result.data.results.map(item => {
        // console.log(result.data)
        return {
            nome: item.name,
            peso: item.height
        }
    })
}

describe('star wars tests', function () {

    // antes de cada tarefa, executa uma função => this.before
    this.beforeAll(() => {
        const dataResponse = {
            count: 1,
            next: null,
            previous: null,
            results: [
                {
                    name: 'R2-D2',
                    height: '96',
                    mass: '32',
                    hair_color: 'n/a',
                    skin_color: 'white, blue',
                    eye_color: 'red',
                    birth_year: '33BBY',
                    gender: 'n/a',
                    homeworld: 'https://swapi.dev/api/planets/8/',
                    films: [Array],
                    species: [Array],
                    vehicles: [],
                    starships: [],
                    created: '2014-12-10T15:11:50.376000Z',
                    edited: '2014-12-20T21:17:50.311000Z',
                    url: 'https://swapi.dev/api/people/3/'
                }
            ]
        }
        const response = JSON.stringify(dataResponse)

        // simulando uma resposta a uma requisição com nock:
        nock(URL)
            .get('/?search=r2-d2&format=json')
            .reply(200, response)
    })

    it('deve buscar o r2-d2 com o formato correto.', async () => {
        const expected = [{ nome: 'R2-D2', peso: '96' }]
        const nomeBase = 'r2-d2'
        const resultado = await obterPessoa(nomeBase)
        assert.deepEqual(resultado, expected)
    })
})