"use strict";

const gm = require("gm")
    , sameTime = require("same-time")
    , Pixel = require("pixel-class")
    , PNG = require("pngjs").PNG
    , iterateObject = require("iterate-object")
    ;

class GmParser {
    /**
     * GmParser
     * Creates a new instance of `GmParser`.
     *
     * @name GmParser
     * @function
     * @param {String|Buffer|GraphicsMagick} input The path to an image file, the
     * image buffer or an existing GraphicsMagick object.
     * @param {Function} cb The callback function.
     */
    constructor (input, cb) {
        this.input = input;

        if (input.constructor.name === "gm") {
            this.gm = input;
        } else {
            this.gm = gm(this.input);
        }

        this.getSize(cb);
        //iterateObject(this.gm.__proto__, (func, name) => {
        //    if (typeof func === "function") {
        //        this[name] = func.bind(this.gm);
        //    }
        //});
    }

    /**
     * resize
     * Resizes the image.
     *
     * @name resize
     * @function
     * @param {Number} width The size width.
     * @param {Number} height The size height.
     */
    resize (width, height) {
        this.gm.resize.apply(this.gm, arguments);
    }

    /**
     * parse
     * Parses the image internally.
     *
     * @name parse
     * @function
     * @param {Function} cb The callback function.
     */
    parse (cb) {
        sameTime([
            this.toPNGBuffer.bind(this)
          , this.getSize.bind(this)
        ], cb);
    }

    /**
     * getSize
     * Gets the image size. This appends the `width` and `height` functions to
     * the `GmParser` instance that return the width and height of the image.
     *
     * @name getSize
     * @function
     * @param {Function} cb The callback function.
     */
    getSize (cb) {
        cb = cb || function () {};
        this.gm.size((err, size) => {
            if (err) { return cb(err); }
            this.size = size;
            this.width = () => {
                return size.width;
            };
            this.height = () => {
                return size.height;
            };
            cb(null, size);
        });
    }

    /**
     * toPNGBuffer
     * Converts the image into a buffer that is parsed by `pngjs`.
     *
     * @name toPNGBuffer
     * @function
     * @param {Function} cb The callback function.
     */
    toPNGBuffer (cb) {
        this.gm.toBuffer("PNG", (err, buff) => {
            if (err) { return cb(err); }
            let str = new PNG();
            str.end(buff);
            str.on("parsed", b => cb(null, b, buff));
            str.on("error", cb);
        });
    }

    /**
     * pixels
     * Gets all the image pixels.
     *
     * @name pixels
     * @function
     * @param {Buffer} buffer An optional `pngjs` buffer. If provided, the pixels
     * array will be *returned*.
     * @param {Function} cb The callback function.
     * @returns {Array} An array of pixels (only if the `buffer` argument is provided).
     */
    pixels (buffer, cb) {
        if (typeof buffer === "function") {
            cb = buffer;
            buffer = null;
            return this.parse((err, data) => {
                if (err) { return cb(err); }
                let buffer = data[0];
                this.pixels(buffer, cb);
            });
        }

        let pixels = []
          , size = this.size
          ;

        for (let y = 0; y < size.height; ++y) {
            for (let x = 0; x < size.width; ++x) {
                pixels.push(this.getPixel(x, y, buffer));
            }
        }

        if (cb) {
            cb(null, pixels);
        }

        return pixels;
    }

    /**
     * getPixel
     * Gets the pixel data at given coordinates.
     *
     * @name getPixel
     * @function
     * @param {Number} x The `x` coordinate.
     * @param {Number} y The `y` coordinate.
     * @param {Buffer} buffer An optional `pngjs` buffer. If provided, the
     * pixels array will be *returned*.
     * @param {Function} cb The callback function.
     * @returns {Pixel} A [`Pixel`](https://github.com/IonicaBizau/pixel-class)
     * instance. This will be returned only if the `buffer` argument is provided.
     */
    getPixel (x, y, buffer, cb) {
        if (typeof buffer === "function") {
            cb = buffer;
            return this.toPNGBuffer((err, pngBuffer) => {
                if (err) { return cb(err); }
                this.getPixel(x, y, pngBuffer, cb);
            });
        }

        let idx = (this.width() * y + x) << 2
          , px = new Pixel(
                buffer[idx]
              , buffer[idx + 1]
              , buffer[idx + 2]
              , buffer[idx + 3] / 255
            )
          ;

        if (cb) {
            cb(null, px);
        }

        return px;
    }
}

/**
 * gmTools
 * Friendly tools for interacting with graphicsmagick
 *
 * @name gmTools
 * @function
 * @param {String|Buffer|GraphicsMagick} input The path to an image file, the
 * image buffer or an existing GraphicsMagick object.
 * @param {Function} cb The callback function.
 * @return {GmParser} The `GmParser` instance.
 */
module.exports = function gmTools (input, cb) {
    return new GmParser(input, cb);
};
