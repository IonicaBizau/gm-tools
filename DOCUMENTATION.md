## Documentation

You can see below the API reference of this module.

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

