"use strict";

const gmTools = require("../lib");

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
