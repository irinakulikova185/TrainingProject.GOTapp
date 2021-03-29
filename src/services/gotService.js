export default class GotService {
    constructor() {
        this._apiBase = "https://www.anapioficeandfire.com/api"
    }

    getResourse = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`)
        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }
        
        return await res.json()
    }

    getAllCharacters = async () => {
        const res = await this.getResourse("/characters?page=7")
        return res.map(char => this._transformChar(char))
        
    }
    getCharacter = async (id) => {
        const character = await this.getResourse(`/characters/${id}`)
        return this._transformChar(character)
    }

    getAllHouses = async () => {
        const res = await this.getResourse("/houses")
        return res.map(house => this._transformHouse(house) )
    }
    getHouse = async (id) => {
        const house = await this.getResourse(`/houses/${id}`)
        return this._transformHouse(house)
    }

    getAllBooks = async () => {
        const res = await this.getResourse("/books")
        return res.map(book => this._transformBook(book) )
    }

    getBook = async (id) => {
        const book = await this.getResourse(`/books/${id}`)
        return this._transformBook(book)
    }

    _extractId = (item) => {
        return item.url.replace(/\D/ig, '')
    }

    _transformChar(char) {
        return {
            name: char.name ? char.name : 'no info',
            gender: char.gender ? char.gender : 'no info',
            born: char.born ? char.born : 'no info',
            died: char.died ? char.died : 'no info',
            culture: char.culture ? char.culture : 'no info',
            id: this._extractId(char)
        }

    }

    _transformBook(book) {
        return {
            name: book.name ? book.name : 'no info',
            numberOfPages: book.numberOfPages ? book.numberOfPages : 'no info',
            publisher: book.publisher ? book.publisher : 'no info',
            released: book.released ? book.released : 'no info',
            id: this._extractId(book)
        }

    }

    _transformHouse(house) {
        return {
            name: house.name ? house.name : 'no info',
            region: house.region ? house.region : 'no info',
            words: house.words ? house.words : 'no info',
            titles: house.titles ? house.titles : 'no info',
            ancestralWeapons: house.ancestralWeapons ? house.ancestralWeapons : 'no info',
            id: this._extractId(house)
        }
    }
}