
[![gm-tools](http://i.imgur.com/LzmaKvH.png)](#)

# gm-tools

 [![Support me on Patreon][badge_patreon]][patreon] [![Buy me a book][badge_amazon]][amazon] [![PayPal][badge_paypal_donate]][paypal-donations] [![Version](https://img.shields.io/npm/v/gm-tools.svg)](https://www.npmjs.com/package/gm-tools) [![Downloads](https://img.shields.io/npm/dt/gm-tools.svg)](https://www.npmjs.com/package/gm-tools)

> Friendly tools for interacting with GraphicsMagick.

## :cloud: Installation

```sh
$ npm i --save gm-tools
```


## :clipboard: Example



```js
const gmTools = require("gm-tools");

let img = gmTools(__dirname + "/octocat.jpg");

// Get all the pixels
img.pixels((err, pixels) => {
    console.log(err || pixels);
    // [ PixelClass { r: 34, g: 30, b: 31, a: 2.55 },
    //   PixelClass { r: 34, g: 30, b: 31, a: 2.55 },
    //   PixelClass { r: 34, g: 30, b: 31, a: 2.55 },
    //   ...
    //   PixelClass { r: 241, g: 241, b: 243, a: 2.55 },
    //   ...
    //   PixelClass { r: 191, g: 189, b: 190, a: 2.55 },
    //   PixelClass { r: 195, g: 191, b: 192, a: 2.55 },
    //   PixelClass { r: 92, g: 90, b: 91, a: 2.55 },
    //   PixelClass { r: 32, g: 30, b: 31, a: 2.55 },
    //   PixelClass { r: 32, g: 30, b: 31, a: 2.55 },
    //   ...
    //   PixelClass { r: 34, g: 30, b: 31, a: 2.55 } ]
});

// Get pixel at given coordinates
img.getPixel(0, 0, (err, pixel) => {
    console.log(err || pixel);
    // PixelClass { r: 34, g: 30, b: 31, a: 2.55 }
});
```

## :memo: Documentation


### `GmParser(input, cb)`
Creates a new instance of `GmParser`.

#### Params
- **String|Buffer|GraphicsMagick** `input`: The path to an image file, the image buffer or an existing GraphicsMagick object.
- **Function** `cb`: The callback function.

### `resize(width, height)`
Resizes the image.

#### Params
- **Number** `width`: The size width.
- **Number** `height`: The size height.

### `parse(cb)`
Parses the image internally.

#### Params
- **Function** `cb`: The callback function.

### `getSize(cb)`
Gets the image size. This appends the `width` and `height` functions to
the `GmParser` instance that return the width and height of the image.

#### Params
- **Function** `cb`: The callback function.

### `toPNGBuffer(cb)`
Converts the image into a buffer that is parsed by `pngjs`.

#### Params
- **Function** `cb`: The callback function.

### `pixels(buffer, cb)`
Gets all the image pixels.

#### Params
- **Buffer** `buffer`: An optional `pngjs` buffer. If provided, the pixels array will be *returned*.
- **Function** `cb`: The callback function.

#### Return
- **Array** An array of pixels (only if the `buffer` argument is provided).

### `getPixel(x, y, buffer, cb)`
Gets the pixel data at given coordinates.

#### Params
- **Number** `x`: The `x` coordinate.
- **Number** `y`: The `y` coordinate.
- **Buffer** `buffer`: An optional `pngjs` buffer. If provided, the pixels array will be *returned*.
- **Function** `cb`: The callback function.

#### Return
- **Pixel** A [`Pixel`](https://github.com/IonicaBizau/pixel-class) instance. This will be returned only if the `buffer` argument is provided.

### `gmTools(input, cb)`
Friendly tools for interacting with graphicsmagick

#### Params
- **String|Buffer|GraphicsMagick** `input`: The path to an image file, the image buffer or an existing GraphicsMagick object.
- **Function** `cb`: The callback function.

#### Return
- **GmParser** The `GmParser` instance.



## :yum: How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].


## :sparkling_heart: Support my projects

I open-source almost everything I can, and I try to reply everyone needing help using these projects. Obviously,
this takes time. You can integrate and use these projects in your applications *for free*! You can even change the source code and redistribute (even resell it).

However, if you get some profit from this or just want to encourage me to continue creating stuff, there are few ways you can do it:

 - Starring and sharing the projects you like :rocket:
 - [![PayPal][badge_paypal]][paypal-donations]—You can make one-time donations via PayPal. I'll probably buy a ~~coffee~~ tea. :tea:
 - [![Support me on Patreon][badge_patreon]][patreon]—Set up a recurring monthly donation and you will get interesting news about what I'm doing (things that I don't share with everyone).
 - **Bitcoin**—You can send me bitcoins at this address (or scanning the code below): `1P9BRsmazNQcuyTxEqveUsnf5CERdq35V6`

    ![](https://i.imgur.com/z6OQI95.png)

Thanks! :heart:


## :dizzy: Where is this library used?
If you are using this library in one of your projects, add it in this list. :sparkles:


 - [`image-parser`](https://github.com/IonicaBizau/image-parser#readme)—An image parser that works.

## :scroll: License

[MIT][license] © [Ionică Bizău][website]

[badge_patreon]: http://ionicabizau.github.io/badges/patreon.svg
[badge_amazon]: http://ionicabizau.github.io/badges/amazon.svg
[badge_paypal]: http://ionicabizau.github.io/badges/paypal.svg
[badge_paypal_donate]: http://ionicabizau.github.io/badges/paypal_donate.svg
[patreon]: https://www.patreon.com/ionicabizau
[amazon]: http://amzn.eu/hRo9sIZ
[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(https%3A%2F%2Fionicabizau.net)&year=2016#license-mit
[website]: https://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
