(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// http://dev.w3.org/csswg/css-color/

function Color(value) {
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.a = null;
    var result = this.fromArray(value) ||
        this.namedColor(value) ||
        this.rgb(value) ||
        this.rgba(value) ||
        this.hex6(value) ||
        this.hex3(value);
}

Color.prototype.darken = function(amount) {
    var a = 1 - amount;
    return  new Color([
        Math.round(this.r * a),
        Math.round(this.g * a),
        Math.round(this.b * a),
        this.a
    ]);
};

Color.prototype.isTransparent = function() {
    return this.a === 0;
};

Color.prototype.isBlack = function() {
    return this.r === 0 && this.g === 0 && this.b === 0;
};

Color.prototype.fromArray = function(array) {
    if (Array.isArray(array)) {
        this.r = Math.min(array[0], 255);
        this.g = Math.min(array[1], 255);
        this.b = Math.min(array[2], 255);
        if (array.length > 3) {
            this.a = array[3];
        }
    }

    return (Array.isArray(array));
};

var _hex3 = /^#([a-f0-9]{3})$/i;

Color.prototype.hex3 = function(value) {
    var match = null;
    if ((match = value.match(_hex3)) !== null) {
        this.r = parseInt(match[1][0] + match[1][0], 16);
        this.g = parseInt(match[1][1] + match[1][1], 16);
        this.b = parseInt(match[1][2] + match[1][2], 16);
    }
    return match !== null;
};

var _hex6 = /^#([a-f0-9]{6})$/i;

Color.prototype.hex6 = function(value) {
    var match = null;
    if ((match = value.match(_hex6)) !== null) {
        this.r = parseInt(match[1].substring(0, 2), 16);
        this.g = parseInt(match[1].substring(2, 4), 16);
        this.b = parseInt(match[1].substring(4, 6), 16);
    }
    return match !== null;
};


var _rgb = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;

Color.prototype.rgb = function(value) {
    var match = null;
    if ((match = value.match(_rgb)) !== null) {
        this.r = Number(match[1]);
        this.g = Number(match[2]);
        this.b = Number(match[3]);
    }
    return match !== null;
};

var _rgba = /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d?\.?\d+)\s*\)$/;

Color.prototype.rgba = function(value) {
    var match = null;
    if ((match = value.match(_rgba)) !== null) {
        this.r = Number(match[1]);
        this.g = Number(match[2]);
        this.b = Number(match[3]);
        this.a = Number(match[4]);
    }
    return match !== null;
};

Color.prototype.toString = function() {
    return this.a !== null && this.a !== 1 ?
    "rgba(" + [this.r, this.g, this.b, this.a].join(",") + ")" :
    "rgb(" + [this.r, this.g, this.b].join(",") + ")";
};

Color.prototype.namedColor = function(value) {
    value = value.toLowerCase();
    var color = colors[value];
    if (color) {
        this.r = color[0];
        this.g = color[1];
        this.b = color[2];
    } else if (value === "transparent") {
        this.r = this.g = this.b = this.a = 0;
        return true;
    }

    return !!color;
};

Color.prototype.isColor = true;

// JSON.stringify([].slice.call($$('.named-color-table tr'), 1).map(function(row) { return [row.childNodes[3].textContent, row.childNodes[5].textContent.trim().split(",").map(Number)] }).reduce(function(data, row) {data[row[0]] = row[1]; return data}, {}))
var colors = {
    "aliceblue": [240, 248, 255],
    "antiquewhite": [250, 235, 215],
    "aqua": [0, 255, 255],
    "aquamarine": [127, 255, 212],
    "azure": [240, 255, 255],
    "beige": [245, 245, 220],
    "bisque": [255, 228, 196],
    "black": [0, 0, 0],
    "blanchedalmond": [255, 235, 205],
    "blue": [0, 0, 255],
    "blueviolet": [138, 43, 226],
    "brown": [165, 42, 42],
    "burlywood": [222, 184, 135],
    "cadetblue": [95, 158, 160],
    "chartreuse": [127, 255, 0],
    "chocolate": [210, 105, 30],
    "coral": [255, 127, 80],
    "cornflowerblue": [100, 149, 237],
    "cornsilk": [255, 248, 220],
    "crimson": [220, 20, 60],
    "cyan": [0, 255, 255],
    "darkblue": [0, 0, 139],
    "darkcyan": [0, 139, 139],
    "darkgoldenrod": [184, 134, 11],
    "darkgray": [169, 169, 169],
    "darkgreen": [0, 100, 0],
    "darkgrey": [169, 169, 169],
    "darkkhaki": [189, 183, 107],
    "darkmagenta": [139, 0, 139],
    "darkolivegreen": [85, 107, 47],
    "darkorange": [255, 140, 0],
    "darkorchid": [153, 50, 204],
    "darkred": [139, 0, 0],
    "darksalmon": [233, 150, 122],
    "darkseagreen": [143, 188, 143],
    "darkslateblue": [72, 61, 139],
    "darkslategray": [47, 79, 79],
    "darkslategrey": [47, 79, 79],
    "darkturquoise": [0, 206, 209],
    "darkviolet": [148, 0, 211],
    "deeppink": [255, 20, 147],
    "deepskyblue": [0, 191, 255],
    "dimgray": [105, 105, 105],
    "dimgrey": [105, 105, 105],
    "dodgerblue": [30, 144, 255],
    "firebrick": [178, 34, 34],
    "floralwhite": [255, 250, 240],
    "forestgreen": [34, 139, 34],
    "fuchsia": [255, 0, 255],
    "gainsboro": [220, 220, 220],
    "ghostwhite": [248, 248, 255],
    "gold": [255, 215, 0],
    "goldenrod": [218, 165, 32],
    "gray": [128, 128, 128],
    "green": [0, 128, 0],
    "greenyellow": [173, 255, 47],
    "grey": [128, 128, 128],
    "honeydew": [240, 255, 240],
    "hotpink": [255, 105, 180],
    "indianred": [205, 92, 92],
    "indigo": [75, 0, 130],
    "ivory": [255, 255, 240],
    "khaki": [240, 230, 140],
    "lavender": [230, 230, 250],
    "lavenderblush": [255, 240, 245],
    "lawngreen": [124, 252, 0],
    "lemonchiffon": [255, 250, 205],
    "lightblue": [173, 216, 230],
    "lightcoral": [240, 128, 128],
    "lightcyan": [224, 255, 255],
    "lightgoldenrodyellow": [250, 250, 210],
    "lightgray": [211, 211, 211],
    "lightgreen": [144, 238, 144],
    "lightgrey": [211, 211, 211],
    "lightpink": [255, 182, 193],
    "lightsalmon": [255, 160, 122],
    "lightseagreen": [32, 178, 170],
    "lightskyblue": [135, 206, 250],
    "lightslategray": [119, 136, 153],
    "lightslategrey": [119, 136, 153],
    "lightsteelblue": [176, 196, 222],
    "lightyellow": [255, 255, 224],
    "lime": [0, 255, 0],
    "limegreen": [50, 205, 50],
    "linen": [250, 240, 230],
    "magenta": [255, 0, 255],
    "maroon": [128, 0, 0],
    "mediumaquamarine": [102, 205, 170],
    "mediumblue": [0, 0, 205],
    "mediumorchid": [186, 85, 211],
    "mediumpurple": [147, 112, 219],
    "mediumseagreen": [60, 179, 113],
    "mediumslateblue": [123, 104, 238],
    "mediumspringgreen": [0, 250, 154],
    "mediumturquoise": [72, 209, 204],
    "mediumvioletred": [199, 21, 133],
    "midnightblue": [25, 25, 112],
    "mintcream": [245, 255, 250],
    "mistyrose": [255, 228, 225],
    "moccasin": [255, 228, 181],
    "navajowhite": [255, 222, 173],
    "navy": [0, 0, 128],
    "oldlace": [253, 245, 230],
    "olive": [128, 128, 0],
    "olivedrab": [107, 142, 35],
    "orange": [255, 165, 0],
    "orangered": [255, 69, 0],
    "orchid": [218, 112, 214],
    "palegoldenrod": [238, 232, 170],
    "palegreen": [152, 251, 152],
    "paleturquoise": [175, 238, 238],
    "palevioletred": [219, 112, 147],
    "papayawhip": [255, 239, 213],
    "peachpuff": [255, 218, 185],
    "peru": [205, 133, 63],
    "pink": [255, 192, 203],
    "plum": [221, 160, 221],
    "powderblue": [176, 224, 230],
    "purple": [128, 0, 128],
    "rebeccapurple": [102, 51, 153],
    "red": [255, 0, 0],
    "rosybrown": [188, 143, 143],
    "royalblue": [65, 105, 225],
    "saddlebrown": [139, 69, 19],
    "salmon": [250, 128, 114],
    "sandybrown": [244, 164, 96],
    "seagreen": [46, 139, 87],
    "seashell": [255, 245, 238],
    "sienna": [160, 82, 45],
    "silver": [192, 192, 192],
    "skyblue": [135, 206, 235],
    "slateblue": [106, 90, 205],
    "slategray": [112, 128, 144],
    "slategrey": [112, 128, 144],
    "snow": [255, 250, 250],
    "springgreen": [0, 255, 127],
    "steelblue": [70, 130, 180],
    "tan": [210, 180, 140],
    "teal": [0, 128, 128],
    "thistle": [216, 191, 216],
    "tomato": [255, 99, 71],
    "turquoise": [64, 224, 208],
    "violet": [238, 130, 238],
    "wheat": [245, 222, 179],
    "white": [255, 255, 255],
    "whitesmoke": [245, 245, 245],
    "yellow": [255, 255, 0],
    "yellowgreen": [154, 205, 50]
};

module.exports = Color;

},{}],2:[function(require,module,exports){
function GradientContainer(imageData) {
    this.src = imageData.value;
    this.colorStops = [];
    this.type = null;
    this.x0 = 0.5;
    this.y0 = 0.5;
    this.x1 = 0.5;
    this.y1 = 0.5;
    this.promise = Promise.resolve(true);
}

GradientContainer.TYPES = {
    LINEAR: 1,
    RADIAL: 2
};

// TODO: support hsl[a], negative %/length values
// TODO: support <angle> (e.g. -?\d{1,3}(?:\.\d+)deg, etc. : https://developer.mozilla.org/docs/Web/CSS/angle )
GradientContainer.REGEXP_COLORSTOP = /^\s*(rgba?\(\s*\d{1,3},\s*\d{1,3},\s*\d{1,3}(?:,\s*[0-9\.]+)?\s*\)|[a-z]{3,20}|#[a-f0-9]{3,6})(?:\s+(\d{1,3}(?:\.\d+)?)(%|px)?)?(?:\s|$)/i;

module.exports = GradientContainer;

},{}],3:[function(require,module,exports){
var GradientContainer = require('./gradientcontainer');
var Color = require('./color');

function LinearGradientContainer(imageData) {
    GradientContainer.apply(this, arguments);
    this.type = GradientContainer.TYPES.LINEAR;

    var hasDirection = LinearGradientContainer.REGEXP_DIRECTION.test( imageData.args[0] ) ||
        !GradientContainer.REGEXP_COLORSTOP.test( imageData.args[0] );

    if (hasDirection) {
        imageData.args[0].split(/\s+/).reverse().forEach(function(position, index) {
            switch(position) {
            case "left":
                this.x0 = 0;
                this.x1 = 1;
                break;
            case "top":
                this.y0 = 0;
                this.y1 = 1;
                break;
            case "right":
                this.x0 = 1;
                this.x1 = 0;
                break;
            case "bottom":
                this.y0 = 1;
                this.y1 = 0;
                break;
            case "to":
                var y0 = this.y0;
                var x0 = this.x0;
                this.y0 = this.y1;
                this.x0 = this.x1;
                this.x1 = x0;
                this.y1 = y0;
                break;
            case "center":
                break; // centered by default
            // Firefox internally converts position keywords to percentages:
            // http://www.w3.org/TR/2010/WD-CSS2-20101207/colors.html#propdef-background-position
            default: // percentage or absolute length
                // TODO: support absolute start point positions (e.g., use bounds to convert px to a ratio)
                var ratio = parseFloat(position, 10) * 1e-2;
                if (isNaN(ratio)) { // invalid or unhandled value
                    break;
                }
                if (index === 0) {
                    this.y0 = ratio;
                    this.y1 = 1 - this.y0;
                } else {
                    this.x0 = ratio;
                    this.x1 = 1 - this.x0;
                }
                break;
            }
        }, this);
    } else {
        this.y0 = 0;
        this.y1 = 1;
    }

    this.colorStops = imageData.args.slice(hasDirection ? 1 : 0).map(function(colorStop) {
        var colorStopMatch = colorStop.match(GradientContainer.REGEXP_COLORSTOP);
        var value = +colorStopMatch[2];
        var unit = value === 0 ? "%" : colorStopMatch[3]; // treat "0" as "0%"
        return {
            color: new Color(colorStopMatch[1]),
            // TODO: support absolute stop positions (e.g., compute gradient line length & convert px to ratio)
            stop: unit === "%" ? value / 100 : null
        };
    });

    if (this.colorStops[0].stop === null) {
        this.colorStops[0].stop = 0;
    }

    if (this.colorStops[this.colorStops.length - 1].stop === null) {
        this.colorStops[this.colorStops.length - 1].stop = 1;
    }

    // calculates and fills-in explicit stop positions when omitted from rule
    this.colorStops.forEach(function(colorStop, index) {
        if (colorStop.stop === null) {
            this.colorStops.slice(index).some(function(find, count) {
                if (find.stop !== null) {
                    colorStop.stop = ((find.stop - this.colorStops[index - 1].stop) / (count + 1)) + this.colorStops[index - 1].stop;
                    return true;
                } else {
                    return false;
                }
            }, this);
        }
    }, this);
}

LinearGradientContainer.prototype = Object.create(GradientContainer.prototype);

// TODO: support <angle> (e.g. -?\d{1,3}(?:\.\d+)deg, etc. : https://developer.mozilla.org/docs/Web/CSS/angle )
LinearGradientContainer.REGEXP_DIRECTION = /^\s*(?:to|left|right|top|bottom|center|\d{1,3}(?:\.\d+)?%?)(?:\s|$)/i;

module.exports = LinearGradientContainer;

},{"./color":1,"./gradientcontainer":2}],4:[function(require,module,exports){
var logger = function() {
    if (logger.options.logging && window.console && window.console.log) {
        Function.prototype.bind.call(window.console.log, (window.console)).apply(window.console, [(Date.now() - logger.options.start) + "ms", "html2canvas:"].concat([].slice.call(arguments, 0)));
    }
};

logger.options = {logging: false};
module.exports = logger;

},{}],5:[function(require,module,exports){
var log = require('./log');

function Renderer(width, height, images, options, document) {
    this.width = width;
    this.height = height;
    this.images = images;
    this.options = options;
    this.document = document;
}

Renderer.prototype.renderImage = function(container, bounds, borderData, imageContainer) {
    var paddingLeft = container.cssInt('paddingLeft'),
        paddingTop = container.cssInt('paddingTop'),
        paddingRight = container.cssInt('paddingRight'),
        paddingBottom = container.cssInt('paddingBottom'),
        borders = borderData.borders;

    var width = bounds.width - (borders[1].width + borders[3].width + paddingLeft + paddingRight);
    var height = bounds.height - (borders[0].width + borders[2].width + paddingTop + paddingBottom);
    this.drawImage(
        imageContainer,
        0,
        0,
        imageContainer.image.width || width,
        imageContainer.image.height || height,
        bounds.left + paddingLeft + borders[3].width,
        bounds.top + paddingTop + borders[0].width,
        width,
        height
    );
};

Renderer.prototype.renderBackground = function(container, bounds, borderData) {
    if (bounds.height > 0 && bounds.width > 0) {
        this.renderBackgroundColor(container, bounds);
        this.renderBackgroundImage(container, bounds, borderData);
    }
};

Renderer.prototype.renderBackgroundColor = function(container, bounds) {
    var color = container.color("backgroundColor");
    if (!color.isTransparent()) {
        this.rectangle(bounds.left, bounds.top, bounds.width, bounds.height, color);
    }
};

Renderer.prototype.renderBorders = function(borders) {
    borders.forEach(this.renderBorder, this);
};

Renderer.prototype.renderBorder = function(data) {
    if (!data.color.isTransparent() && data.args !== null) {
        this.drawShape(data.args, data.color);
    }
};

Renderer.prototype.renderBackgroundImage = function(container, bounds, borderData) {
    var backgroundImages = container.parseBackgroundImages();
    backgroundImages.reverse().forEach(function(backgroundImage, index, arr) {
        switch(backgroundImage.method) {
        case "url":
            var image = this.images.get(backgroundImage.args[0]);
            if (image) {
                this.renderBackgroundRepeating(container, bounds, image, arr.length - (index+1), borderData);
            } else {
                log("Error loading background-image", backgroundImage.args[0]);
            }
            break;
        case "linear-gradient":
        case "gradient":
            var gradientImage = this.images.get(backgroundImage.value);
            if (gradientImage) {
                this.renderBackgroundGradient(gradientImage, bounds, borderData);
            } else {
                log("Error loading background-image", backgroundImage.args[0]);
            }
            break;
        case "none":
            break;
        default:
            log("Unknown background-image type", backgroundImage.args[0]);
        }
    }, this);
};

Renderer.prototype.renderBackgroundRepeating = function(container, bounds, imageContainer, index, borderData) {
    var size = container.parseBackgroundSize(bounds, imageContainer.image, index);
    var position = container.parseBackgroundPosition(bounds, imageContainer.image, index, size);
    var repeat = container.parseBackgroundRepeat(index);
    switch (repeat) {
    case "repeat-x":
    case "repeat no-repeat":
        this.backgroundRepeatShape(imageContainer, position, size, bounds, bounds.left + borderData[3], bounds.top + position.top + borderData[0], 99999, size.height, borderData);
        break;
    case "repeat-y":
    case "no-repeat repeat":
        this.backgroundRepeatShape(imageContainer, position, size, bounds, bounds.left + position.left + borderData[3], bounds.top + borderData[0], size.width, 99999, borderData);
        break;
    case "no-repeat":
        this.backgroundRepeatShape(imageContainer, position, size, bounds, bounds.left + position.left + borderData[3], bounds.top + position.top + borderData[0], size.width, size.height, borderData);
        break;
    default:
        this.renderBackgroundRepeat(imageContainer, position, size, {top: bounds.top, left: bounds.left}, borderData[3], borderData[0]);
        break;
    }
};

module.exports = Renderer;

},{"./log":4}],6:[function(require,module,exports){
var Renderer = require('../renderer');
var LinearGradientContainer = require('../lineargradientcontainer');
var log = require('../log');

function CanvasRenderer(width, height) {
    Renderer.apply(this, arguments);
    this.canvas = this.options.canvas || this.document.createElement("canvas");
    if (!this.options.canvas) {
        this.canvas.width = width;
        this.canvas.height = height;
    }
    this.ctx = this.canvas.getContext("2d");
    this.taintCtx = this.document.createElement("canvas").getContext("2d");
    this.ctx.textBaseline = "bottom";
    this.variables = {};
    log("Initialized CanvasRenderer with size", width, "x", height);
}

CanvasRenderer.prototype = Object.create(Renderer.prototype);

CanvasRenderer.prototype.setFillStyle = function(fillStyle) {
    this.ctx.fillStyle = typeof(fillStyle) === "object" && !!fillStyle.isColor ? fillStyle.toString() : fillStyle;
    return this.ctx;
};

CanvasRenderer.prototype.rectangle = function(left, top, width, height, color) {
    this.setFillStyle(color).fillRect(left, top, width, height);
};

CanvasRenderer.prototype.circle = function(left, top, size, color) {
    this.setFillStyle(color);
    this.ctx.beginPath();
    this.ctx.arc(left + size / 2, top + size / 2, size / 2, 0, Math.PI*2, true);
    this.ctx.closePath();
    this.ctx.fill();
};

CanvasRenderer.prototype.circleStroke = function(left, top, size, color, stroke, strokeColor) {
    this.circle(left, top, size, color);
    this.ctx.strokeStyle = strokeColor.toString();
    this.ctx.stroke();
};

CanvasRenderer.prototype.drawShape = function(shape, color) {
    this.shape(shape);
    this.setFillStyle(color).fill();
};

CanvasRenderer.prototype.taints = function(imageContainer) {
    if (imageContainer.tainted === null) {
        this.taintCtx.drawImage(imageContainer.image, 0, 0);
        try {
            this.taintCtx.getImageData(0, 0, 1, 1);
            imageContainer.tainted = false;
        } catch(e) {
            this.taintCtx = document.createElement("canvas").getContext("2d");
            imageContainer.tainted = true;
        }
    }

    return imageContainer.tainted;
};

CanvasRenderer.prototype.drawImage = function(imageContainer, sx, sy, sw, sh, dx, dy, dw, dh) {
    if (!this.taints(imageContainer) || this.options.allowTaint) {
        this.ctx.drawImage(imageContainer.image, sx, sy, sw, sh, dx, dy, dw, dh);
    }
};

CanvasRenderer.prototype.clip = function(shapes, callback, context) {
    this.ctx.save();
    shapes.filter(hasEntries).forEach(function(shape) {
        this.shape(shape).clip();
    }, this);
    callback.call(context);
    this.ctx.restore();
};

CanvasRenderer.prototype.shape = function(shape) {
    this.ctx.beginPath();
    shape.forEach(function(point, index) {
        if (point[0] === "rect") {
            this.ctx.rect.apply(this.ctx, point.slice(1));
        } else {
            this.ctx[(index === 0) ? "moveTo" : point[0] + "To" ].apply(this.ctx, point.slice(1));
        }
    }, this);
    this.ctx.closePath();
    return this.ctx;
};

CanvasRenderer.prototype.font = function(color, style, variant, weight, size, family) {
    this.setFillStyle(color).font = [style, variant, weight, size, family].join(" ").split(",")[0];
};

CanvasRenderer.prototype.fontShadow = function(color, offsetX, offsetY, blur) {
    this.setVariable("shadowColor", color.toString())
        .setVariable("shadowOffsetY", offsetX)
        .setVariable("shadowOffsetX", offsetY)
        .setVariable("shadowBlur", blur);
};

CanvasRenderer.prototype.clearShadow = function() {
    this.setVariable("shadowColor", "rgba(0,0,0,0)");
};

CanvasRenderer.prototype.setOpacity = function(opacity) {
    this.ctx.globalAlpha = opacity;
};

CanvasRenderer.prototype.setTransform = function(transform) {
    this.ctx.translate(transform.origin[0], transform.origin[1]);
    this.ctx.transform.apply(this.ctx, transform.matrix);
    this.ctx.translate(-transform.origin[0], -transform.origin[1]);
};

CanvasRenderer.prototype.setVariable = function(property, value) {
    if (this.variables[property] !== value) {
        this.variables[property] = this.ctx[property] = value;
    }

    return this;
};

CanvasRenderer.prototype.text = function(text, left, bottom) {
    this.ctx.fillText(text, left, bottom);
};

CanvasRenderer.prototype.backgroundRepeatShape = function(imageContainer, backgroundPosition, size, bounds, left, top, width, height, borderData) {
    var shape = [
        ["line", Math.round(left), Math.round(top)],
        ["line", Math.round(left + width), Math.round(top)],
        ["line", Math.round(left + width), Math.round(height + top)],
        ["line", Math.round(left), Math.round(height + top)]
    ];
    this.clip([shape], function() {
        this.renderBackgroundRepeat(imageContainer, backgroundPosition, size, bounds, borderData[3], borderData[0]);
    }, this);
};

CanvasRenderer.prototype.renderBackgroundRepeat = function(imageContainer, backgroundPosition, size, bounds, borderLeft, borderTop) {
    var offsetX = Math.round(bounds.left + backgroundPosition.left + borderLeft), offsetY = Math.round(bounds.top + backgroundPosition.top + borderTop);
    this.setFillStyle(this.ctx.createPattern(this.resizeImage(imageContainer, size), "repeat"));
    this.ctx.translate(offsetX, offsetY);
    this.ctx.fill();
    this.ctx.translate(-offsetX, -offsetY);
};

CanvasRenderer.prototype.renderBackgroundGradient = function(gradientImage, bounds) {
    if (gradientImage instanceof LinearGradientContainer) {
        var gradient = this.ctx.createLinearGradient(
            bounds.left + bounds.width * gradientImage.x0,
            bounds.top + bounds.height * gradientImage.y0,
            bounds.left +  bounds.width * gradientImage.x1,
            bounds.top +  bounds.height * gradientImage.y1);
        gradientImage.colorStops.forEach(function(colorStop) {
            gradient.addColorStop(colorStop.stop, colorStop.color.toString());
        });
        this.rectangle(bounds.left, bounds.top, bounds.width, bounds.height, gradient);
    }
};

CanvasRenderer.prototype.resizeImage = function(imageContainer, size) {
    var image = imageContainer.image;
    if(image.width === size.width && image.height === size.height) {
        return image;
    }

    var ctx, canvas = document.createElement('canvas');
    canvas.width = size.width;
    canvas.height = size.height;
    ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, size.width, size.height );
    return canvas;
};

function hasEntries(array) {
    return array.length > 0;
}

module.exports = CanvasRenderer;

},{"../lineargradientcontainer":3,"../log":4,"../renderer":5}]},{},[6]);
