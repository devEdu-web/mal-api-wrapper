import { Oauth } from "./src/components/oauth/Oauth.js";
import { generateChallengeCode } from "./src/helpers/generateCodeChallenge.js";

const codeChallenge = generateChallengeCode()
const oauth = new Oauth('42456a65920b13d0cc0136745483b944', '07a93f2c222a984e524c3da3e8c8234a8cf8e661cdcf16951eb8f579a5872aa4')


console.log(oauth.getAuthorizationRedirect(codeChallenge))