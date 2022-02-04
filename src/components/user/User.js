import axios from 'axios'
import qs from 'querystring'
import userFields from './fields.json'

class User {
    myAxios = axios.create()
    #baseUrl = 'https://api.myanimelist.net/v2/users'
    constructor(token) {
        this.myAxios.defaults.headers['Authorization'] = `Bearer ${token}`
    }

    /**
     * 
     * @param {String} username Optional, default me
     * @param {Number} limit Optional, default = 30
     * @param {Array} fields Optional
     * @returns 
     */

    getAnimeList(username = '@me', limit=30, fields = userFields.userList) {
        return new Promise((resolve, reject) => {

            this.myAxios.get(`${this.#baseUrl}/${username}/animelist`, {params: {
                fields: fields.toString()
            }})
            .then(response => resolve(response.data))
            .catch(err => reject(err))


        })
    }

}

export {User}