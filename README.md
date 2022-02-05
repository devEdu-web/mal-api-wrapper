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

const oauth = new Oauth(YOUR_CLIENT_ID)

// Will return the url so you can authorize the use of his account, you can send him the URL, or redirect him
const authorizeUrl = oauth.getAuthorizationRedirect(YOUR_CODE_CHALLENGE)
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

const oauth = new Oauth(YOUR_CLIENT_ID, YOUR_CLIENT_SECRET)

// Use the code you got in the authorization process, seen earlier
// Your code verifier MUST be equal to your code challange
oauth.accessToken(YOUR_CODE, YOUR_CODE_VERIFIER)
.then(accessTokens => console.log(accessTokens))
.catch(err => console.log(err))

// You MUST store both of the tokens that will be returned for future use

```

***

### Refreshing your Token

```javascript

import {Oauth} from './src/components/oauth/Oauth.js'

const oauth = new Oauth(YOUR_CLIENT_ID, YOUR_CLIENT_SECRET)

// Return a new Access and Refresh Token, you also MUST store them for future use
oauth.refreshToken(YOUR_REFRESH_TOKEN)
.then(newTokens => console.log(newTokens))
.catch(err => console.log(err))

```

***

## Making a general anime search

```javascript
import {Animes} from './src/components/anime/Animes.js'

const anime = new Animes(YOUR_ACCESS_TOKEN)


anime.searchAnime(ANIME_TITLE, LIMIT, FIELDS)
.then(animes => console.log(animes))
.catch(err => console.log(err))
```

***

## Searching an anime by its ID

```javascript
import {Animes} from './src/components/anime/Animes.js'

const anime = new Animes(YOUR_ACCESS_TOKEN)

anime.searchAnimeById(ANIME_ID, FIELDS)
.then(anime => console.log(anime))
.catch(err => console.log(err))

```

## Getting the user's anime list

```javascript
import {User} from './src/components/user/User.js'

const user = new User(YOUR_ACCESS_TOKEN)

user.getAnimeList(USER_NAME, LIMIT, FIELDS)
.then(userAnimeList => console.log(userAnimeList))
.catch(err => console.log(err))
```

## Getting user's info

```javascript
import {User} from './src/components/user/User.js'

const user = new User(YOUR_ACCESS_TOKEN)

user.getInfo(FIELDS)
.then(userInfo => console.log(userInfo))
.catch(err => console.log(err))
```

***

## About the Mangas

Since I built this project seeking an understanding about the MAl API, and maybe using for personal use in some projects later on, I decided not to code an Manga class for the simple reason that I don't read manga, and there's no use for me particularly. 

***

## Conclusion

It was really fun to build this project, it was my first time building something on top of an API and also was my first contact with **OAuth**. With this project, I could not only practice JS Classes and POO but I also could understand how an API works, how to manipulate its URLs and parameters, how to make requests with Axios, and so on.