"use strict";

const gm = require("gm")
    , sameTime = require("same-time")
    , Pixel = require("pixel-class")
    , PNG = require("pngjs").PNG
    , iterateObject = require("iterate-object")
    ;

class GmParser {
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

    resize () {
        return this.gm.resize.apply(this.gm, arguments);
    }

    parse (cb) {
        sameTime([
            this.toPNGBuffer.bind(this)
          , this.getSize.bind(this)
        ], cb);
    }

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
    toPNGBuffer (cb) {
        this.gm.toBuffer("PNG", (err, buff) => {
            if (err) { return cb(err); }
            let str = new PNG();
            str.end(buff);
            str.on("parsed", b => cb(null, b, buff));
            str.on("error", cb);
        });
    }
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
    getPixel (x, y, buffer, cb) {
        if (typeof buffer === "function") {
            cb = buffer;
            return this.toPNGBuffer((err, pngBuffer) => {
                if (err) { return cb(err); }
                this.getPixel(x, y, pngBuffer, cb);
            });
        }

        // [r, g, b, r, g, b, r, g, b]
        //  0x1      0x2      0x3

        // 0x0 (r, g, b), 0x1 (r, g, b)
        // 0x1 (r, g, b), 1x1 (r, g, b)
        //
        // this.width() * y + x

        let idx = (this.width() * y + x) << 2
          , px = new Pixel(
                buffer[idx]
              , buffer[idx + 1]
              , buffer[idx + 2]
              , 1 //buffer[idx + 3]
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
 * @param {Number} a Param descrpition.
 * @param {Number} b Param descrpition.
 * @return {Number} Return description.
 */
module.exports = function gmTools (input) {
    return new GmParser(input);
};
