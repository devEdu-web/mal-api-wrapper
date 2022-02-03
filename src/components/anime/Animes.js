import axios from 'axios'
import qs from 'querystring'
import fieldsParams from './fields.json'

class Animes {
    myAxios = axios.create()
    #urlBase = 'https://api.myanimelist.net/v2/anime'
    constructor(token) {
        this.myAxios.defaults.headers["Authorization"] = `Bearer ${token}`
    }
    /**
     * 
     * @param {String} q 
     * @param {Number} limit Default 30
     * @param {Array} fields  
     */

    searchAnime(q, limit = 30, fields = fieldsParams.animesFields) {
        return new Promise((resolve, reject) => {
            this.myAxios.get(this.#urlBase, {params: {
                q,
                limit,
                fields: fields.toString()
            }})
            .then(response => resolve(response.data.data))
            .catch(err => reject(err))
        })
    }

}

export {Animes}