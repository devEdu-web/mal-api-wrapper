import axios from 'axios'
import qs from 'querystring'

class Oauth {
    #originalUrl = "https://myanimelist.net/v1/oauth2"
    #userAuthorizationUrl = "https://myanimelist.net/v1/oauth2/authorize?"
    #accessTokenUrl = "https://myanimelist.net/v1/oauth2/token"

    constructor(clientId, secretId) {
        this.clientId = clientId,
        this.secretId = secretId
    }

    getAuthorizationRedirect(codeChallenge) {
        return `${this.#userAuthorizationUrl}response_type=code&client_id=${this.clientId}&code_challenge=${codeChallenge}`
    }

}

export {Oauth}