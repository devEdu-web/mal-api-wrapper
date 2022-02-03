import pkce from 'pkce-challenge'

function generateChallengeCode() {
    const {code_challenge} = pkce(128)
    return code_challenge
}

export {generateChallengeCode}