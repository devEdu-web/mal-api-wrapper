import axios from 'axios'
import qs from 'querystring'

class Oauth {
    #originalUrl = "https://myanimelist.net/v1/oauth2"
    #userAuthorizationUrl = "https://myanimelist.net/v1/oauth2/authorize?"
    #accessTokenUrl = "https://myanimelist.net/v1/oauth2/token"

    constructor(clientId, clientSecret = undefined) {
        this.clientId = clientId,
        this.clientSecret = clientSecret
    }

    getAuthorizationRedirect(codeChallenge) {
        return `${this.#userAuthorizationUrl}response_type=code&client_id=${this.clientId}&code_challenge=${codeChallenge}`
    }

    accessToken(code, codeVerifier) {
        return new Promise((resolve, reject) => {
            let data = {
                client_id: this.clientId,
                client_secret: this.clientSecret,
                code: code,
                code_verifier: codeVerifier,
                grant_type: "authorization_code",
            }

            axios.post(this.#accessTokenUrl, qs.stringify(data))
            .then(response => resolve(response.data))
            .catch(err => reject(err))

        })
    }

    refreshAccessToken(refreshToken) {
        return new Promise((resolve, reject) => {
            let data = {
                client_id: this.clientId,
                client_secret: this.clientSecret,
                grant_type: 'refresh_token',
                refresh_token: refreshToken
            }
            axios.post(this.#accessTokenUrl, qs.stringify(data))
            .then(response => resolve(response.data))
            .catch(err => reject(err))
        })
    }

}

export {Oauth}