# unsplash-client
> lightweight, opinionated, dependency free Unsplash client 

### Features

* Bundle size: [0.5kB](https://bundlephobia.com/result?p=unsplash-client) vs [6kB unsplash-js ](https://bundlephobia.com/result?p=unsplash-js)
* Type safe

### Installation

```
$ yarn add unsplash-client
```

### Usage

```javascript
import Unsplash from 'unsplash-client'

const accessKey = 'YOUR-ACCESS-KEY';
const client = new Unsplash(accessKey);
const photos = await client.search('skateboarding');

photos.forEach(photo => {
  console.log(photo.id, photo.urls.full, photo.urls.small)
})
```

### Methods

* **search**: 

So far those are the methods the library supports as I don't have a use case for other ones. Please let me know if you need access to other methods, and we might add them :)

### Author

[@zzarcon](https://twitter.com/zzarcon)