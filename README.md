
[![gm-tools](http://i.imgur.com/LzmaKvH.png)](#)

# gm-tools

 [![Patreon](https://img.shields.io/badge/Support%20me%20on-Patreon-%23e6461a.svg)][patreon] [![PayPal](https://img.shields.io/badge/%24-paypal-f39c12.svg)][paypal-donations] [![AMA](https://img.shields.io/badge/ask%20me-anything-1abc9c.svg)](https://github.com/IonicaBizau/ama) [![Version](https://img.shields.io/npm/v/gm-tools.svg)](https://www.npmjs.com/package/gm-tools) [![Downloads](https://img.shields.io/npm/dt/gm-tools.svg)](https://www.npmjs.com/package/gm-tools) [![Get help on Codementor](https://cdn.codementor.io/badges/get_help_github.svg)](https://www.codementor.io/johnnyb?utm_source=github&utm_medium=button&utm_term=johnnyb&utm_campaign=github)

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


## :moneybag: Donations

Another way to support the development of my open-source modules is
to [set up a recurring donation, via Patreon][patreon]. :rocket:

[PayPal donations][paypal-donations] are appreciated too! Each dollar helps.

Thanks! :heart:

## :dizzy: Where is this library used?
If you are using this library in one of your projects, add it in this list. :sparkles:


 - [`image-parser`](https://github.com/IonicaBizau/image-parser#readme)—An image parser that works.

## :scroll: License

[MIT][license] © [Ionică Bizău][website]

[patreon]: https://www.patreon.com/ionicabizau
[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(http%3A%2F%2Fionicabizau.net)&year=2016#license-mit
[website]: http://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
