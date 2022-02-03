# My personal Myanimelist API simplifier

This project was built to help me simplify and understand more about the **Myanimelist API**, APIs in general and how to implement them in my projects. I don't plan to update this project as the API updates, so I don't recommend its use.

**This application was inspired by Chris-Kode wrapper for Myanimelist's API v2** , which is in constant updates. You should check it out: [Chris Kode's project](https://github.com/Chris-Kode/myanimelist-api-v2#built-with).

***

## First step

First of all, we have to create an application, you can access the form do to so clicking [here](https://myanimelist.net/apiconfig/create). You're gonna find something like this: 

![Create application image](https://media.discordapp.net/attachments/611633543420051458/938852128330485830/myanimelist1.jpeg?width=1004&height=684)

**Warning: Do not disclose your Client Id and Client Secret. KEEP THEM SAFE**

1. Homepage URL - Your application website. (I put the myanimelist's website for testing purpose).
2. Redirect URL - Here, put the URL to which it will be redirected after the user authorizes the use of his account. (I recommend you to put an URL for your application, I'll explain later why.)

***

## Authorizing The user

Here you're gonna need an URL to redirect the user to grant authorization.

```javascript
import {Oauth} from './src/components/oauth/Oauth.js'

// You must generate this randomly and store it
const codeChallenge = 'uFkF1fO16OQ1KvyieMU8sl-Nf76nL-N1pcBMOxffGBQ'

const oauth = new Oauth(YOUR_CLIENT_ID)

// Will return the url so you can authorize the use of his account, you can send him the URL, or redirect him
const authorizeUrl = oauth.getAuthorizationRedirect(codeChallenge)
console.log(authorizeUrl) 

// or using express
res.redirect(authorizeUrl)
```

You will see this screen: 
![Authorization page](https://cdn.discordapp.com/attachments/611633543420051458/938859569545895976/unknown.png)

### Important

After clicking "Allow" you will be redirected to the URL that was set to the field "App redirect URL" when we were creating the application. It is important that this url be one of your **routes** on your application, so you can get through your application the query param `code` that allows you to use the API.

***

## Getting the Access Token and Refresh Token

```javascript
import {Oauth} from './src/components/oauth/Oauth.js'

// Your code verifier MUST be equal to your code challange
const codeVerifier = 'uFkF1fO16OQ1KvyieMU8sl-Nf76nL-N1pcBMOxffGBQ'
const oauth = new Oauth(YOUR_CLIENT_ID, YOUR_CLIENT_SECRET)

// Use the code you got in the authorization process, seen earlier
oauth.accessToken(code, codeVerifier)
.then(accessTokens => console.log(accessTokens))
.catch(err => console.log(err))

// You MUST store both of the tokens that will be returned for future use

```

***

### Refreshing your Token

```javascript

import {Oauth} from './src/components/oauth/Oauth.js'

const refreshToken = 'uFkF1fO16OQ1KvyieMU8sl-Nf76nL-N1pcBMOxffGBQ'
const oauth = new Oauth(YOUR_CLIENT_ID, YOUR_CLIENT_SECRET)

// Return a new Access and Refresh Token, you also MUST store them for future use
oauth.refreshToken(refreshToken)
.then(newTokens => console.log(newTokens))
.catch(err => console.log(err))

```