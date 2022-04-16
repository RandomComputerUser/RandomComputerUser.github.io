// The code in here is of questionable quality

BACKGROUND_IMAGE = new Image();
BACKGROUND_IMAGE.src = document.getElementById('backgroundImage').src;

document.getElementById('galaxyName').value = "The Milky Way";

function updatePaintScaleNumberDisplay(value) {
    document.getElementById('paintScaleNumberDisplay').innerHTML = ''+(document.getElementById('paintScale').value);
}

ENTRIES_KEY = '___entries';
UNOWNED_ID = -1000000000;

CANVAS_SCALE = 2;

MAP_FONT = '"Barlow Semi Condensed"';
MAP_NAME_FILL = 'rgb(15,15,15)';
MAP_NAME_STROKE = 'rgba(235,235,235)';
MAP_NAME_ALPHA = 0.51;
MAP_NAME_STROKE_WIDTH = 0.25 * CANVAS_SCALE / 2;
MIN_MAP_NAME_SIZE = 10;

MAP_FONT_ALT = '"Barlow"';

MAX_MAP_NAME_SIZE = 110;

MAP_MIDDLE_FONT = '"Barlow Semi Condensed"';
MAP_MIDDLE_TEXT_COLOR = 'rgba(245,245,245,0.85)';

MISSING_COLOR = 'rgb(64,64,64)';

MAP_WIDTH = CANVAS_SCALE * 1920;
MAP_HEIGHT = CANVAS_SCALE * 1920;
UNOWNED_VALUE = 20;
UNOWNED_RADIUS = 110;
UNOWNED_HYPERLANE_RADIUS = 95;
SYSTEM_RADIUS = UNOWNED_RADIUS + UNOWNED_VALUE - 6;
HYPERLANE_RADIUS = UNOWNED_HYPERLANE_RADIUS + UNOWNED_VALUE - 6;

NEAR_RADIUS = 20;
NEAR_BOOST = 100;

SMOOTHING_RADIUS = 5;

PAINT_SCALE_FACTOR = 1.65;

PADDING = CANVAS_SCALE * 50;
INNER_PADDING = CANVAS_SCALE * 10;

INNER_CIRCLE_COLOR = 'rgba(0,0,0,0.6)';

RES_X = 384 + 1;
RES_Y = 384 + 1;

STAR_RADIUS = CANVAS_SCALE * 3;
STAR_PADDING = CANVAS_SCALE * 6;
UPGRADED_RADIUS = CANVAS_SCALE * 5;
CAPITAL_OUTER_RADIUS = CANVAS_SCALE * 9;
CAPITAL_INNER_RADIUS = CANVAS_SCALE * 7;
CAPITAL_STAR_RADIUS = CANVAS_SCALE * 7;

HYPERLANE_WIDTH = CANVAS_SCALE * 3;

BORDERS = [
    {color: 'rgba(225,225,225,0.4)', width: CANVAS_SCALE * 10, light: false, regular: true},
    {color: 'rgb(235,235,235)', width: CANVAS_SCALE * 2, light: true, regular: true}
];
EDGE_BORDERS = [
    {color: 'rgba(5,5,5,0.5)', width: CANVAS_SCALE * 14, light: false, regular: true},
    {color: 'rgba(5,5,5,0.5)', width: CANVAS_SCALE * 7, light: true, regular: false}
];

BACKGROUND_FILTER = 'saturate(0%)';
SUBSTITUTE_BACKGROUND = 'rgb(2,2,2)'; // If no Hubble
BACKGROUND_COLOR = 'rgba(5,5,5,0.7)';
BACKGROUND_COLOR_OPAQUE = 'rgb(5,5,5)';
HYPERLANE_COLOR = 'rgba(245,245,245,0.18)';
STAR_COLOR = 'rgb(245,245,245)';
POPULATED_COLOR = 'rgb(250,245,10)';

USE_FLAG_COLORS = false;
DRAW_MAP_NAMES = true;
ALT_NAME_STYLE = false;
LIMIT_MAP_NAME_SIZE = false;
DRAW_MAP_MIDDLE = true;
USE_HUBBLE = true;
LIGHT_BORDERS = false;
SMOOTH_BORDERS = true;

lock = false;
saveGame = null;

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function sleepUntilTrue(func) {
    return new Promise(async function(resolve) {
        await sleep(100 + 50 * Math.random());
        while (!func()) {
            await sleep(100 + 50 * Math.random());
        }
        resolve();
    });
}

function parseDataToObject(data) {

    function isWhitespace(c) {
        switch (c) {
            case ' ':
            case '\t':
            case '\n':
                return true;
            default:
                return false;
        }
    }

    function parseValue(data, i) {

        if (i == null) i = 0;
        while (i < data.length && isWhitespace(data[i])) {
            i++;
        }

        if (i >= data.length) {
            return [null, i];
        }

        let c = data[i];
        if (c === '"') {
            let value = "\"";
            i++;
            while (i < data.length) {
                if (data[i] === '"') {
                    break;
                } else if (data[i] === '\\') {
                    value += data[i + 1];
                    i += 2;
                } else {
                    value += data[i];
                }
                i++;
            }
            value += "\"";
            i++;
            return [value, i];
        } else if (c === '{') {

            i++;
            let isArray = false;
            let value = new Object();
            let originalEntries = [];
            let multikeys = new Object();
            while (i < data.length) {

                while (i < data.length && isWhitespace(data[i])) {
                    i++;
                }

                if (i >= data.length) {
                    return [value, i];
                }

                if (data[i] === '}') {
                    i++;
                    break;
                }

                if (data[i] === '{') {
                    if (!isArray) {
                        isArray = true;
                        value = [];
                    }
                }

                if (isArray) {

                    let [val, j] = parseValue(data, i);
                    i = j;
                    value.push(val);

                } else {
                    
                    let key = "";

                    if (data[i] === '"') {
                        key += "\"";
                        i++;
                        while (i < data.length) {
                            if (data[i] === '"') {
                                break;
                            } else if (data[i] === '\\') {
                                key += data[i + 1];
                                i += 2;
                            } else {
                                key += data[i];
                            }
                            i++;
                        }
                        key += "\"";
                        i++;
                    } else {
                        while (i < data.length && !isWhitespace(data[i]) && data[i] !== '=') {
                            key += data[i];
                            i++;
                        }
                    }

                    /*
                    if (key === 'true' || key === 'yes') {
                        key = true;
                    } else if (key === 'false' || key === 'no') {
                        key = false;
                    } else if (key === 'null' || key === 'none') {
                        key = null;
                    } else*/ if (key == +key) {
                        key = +key;
                    }

                    if (i + 1 < data.length && data[i + 1] === '=') {
                        i++;
                    }

                    if (data[i] === '=') {

                        i++;
                        let [val, j] = parseValue(data, i);
                        i = j;

                        originalEntries.push([key, val]);

                        if (multikeys.hasOwnProperty(key)) {
                            multikeys[key].push(val);
                        } else if (value.hasOwnProperty(key)) {
                            multikeys[key] = [value[key]];
                            multikeys[key].push(val);
                        } else {    
                            value[key] = val;
                        }


                    } else {
                        isArray = true;
                        value = [];
                        value.push(key);
                    }
                    i++;

                }
            
                if (i >= data.length) return [value, i];

            }

            if (!isArray) {
                for (key in multikeys) {
                    if (multikeys.hasOwnProperty(key)) value[key] = multikeys[key];
                }     
                value[ENTRIES_KEY] = originalEntries;
            }

            return [value, i];

        } else {
            let value = "";
            while (i < data.length && !isWhitespace(data[i])) {
                value += data[i];
                i++;
            }
            /*
            if (value === 'true' || value === 'yes') {
                value = true;
            } else if (value === 'false' || value === 'no') {
                value = false;
            } else if (value === 'null' || value === 'none') {
                value = null;
            } else*/ if (value == +value){
                value = +value;
            }
            return [value, i];
        }
    }

    return parseValue("{\n" + data + "\n}\n")[0];

}

function serializeObjectToData(obj) {

    function serializePrimitive(val) {
        if (typeof val === 'number') {
            return ''+val;
        } else if (typeof val === 'string') {
            return val;
        }
    }

    // Use list & join because Chrome/Edge performance is bad otherwise

    function serialize(obj, indent, out) {

        let outer = (indent == null);

        if (typeof obj === 'number') {
            out.push(''+obj);
            out.push('\n');
        } else if (typeof obj === 'string') {
            out.push(obj);
            out.push('\n');

        } else if (Array.isArray(obj)) {

            let primitive = true;

            for (let val of obj) {
                if (typeof val === 'string') {
                    if (val.length > 0 && val[0] === '"') {
                        primitive = false;
                        break;
                    }
                }
                if (typeof val === 'object') {
                    primitive = false;
                    break;
                }
            }

            let nextIndent = indent;
            if (outer) {
                nextIndent = '';
            } else {
                nextIndent += '\t';
            }

            if (!outer) out.push('{\n');

            if (primitive) {

                out.push(nextIndent);

                obj.forEach((val) => {
                    out.push(serializePrimitive(val));
                    out.push(' ');
                });

                if (out[out.length - 1] === ' ') {
                    out.pop();
                }

                out.push('\n');
                if (!outer) out.push(indent + '}');
                out.push('\n');

            } else {

                for (let val of obj) {
                    out.push(nextIndent);
                    serialize(val, nextIndent, out);
                }

                if (!outer) out.push(indent + '}');
                out.push('\n');

            }
            
        } else {

            let nextIndent = indent;
            if (outer) {
                nextIndent = '';
            } else {
                nextIndent += '\t';
            }
            if (!outer) out.push('{\n');

            for (let entry of obj[ENTRIES_KEY]) {

                let key = entry[0];
                let val = entry[1];
                
                out.push(nextIndent);
                serialize(key, nextIndent, out);
                if (out[out.length - 1] === '\n') out.pop();
                out.push('=');
                serialize(val, nextIndent, out);
                
            }

            if (!outer) out.push(indent + '}');
            out.push('\n');

        }

        return out;

    }

    return serialize(obj, null, []).join('');

}

class SaveState {

    constructor(file) {

        let fileName = file.name;
        let zip = new JSZip();

        sleepUntilTrue(() => (!lock)).then(() => {

            lock = true;

            zip.loadAsync(file).then((save) => {

                this.saveFile = save;

                this.saveFile.file("gamestate").async("string").then((content) => {

                    this.gamestate = parseDataToObject(content);

                    this.saveFile.file("meta").async("string").then((content) => {

                        this.meta = parseDataToObject(content);

                        // console.log(this.gamestate);
                        // console.log(this.meta);
                        
                        document.getElementById('fileStatus').innerHTML = 'Save file loaded.'

                        lock = false;
        
                    });

                });

            }).catch(function(e) {
                lock = false;
                console.log(e);
            });
        });

    }

}

function getSave(e) {

    try {

        document.getElementById('fileStatus').innerHTML = 'Loading save file...'
        saveGame = new SaveState(e.target.files[0]);

    } catch (e) {
        console.log(e);
        alert(e.message);
        document.getElementById('fileStatus').innerHTML = 'Save file failed to load.'
        return;
    }

}

function createEntries(obj) {

    obj[ENTRIES_KEY] = Object.entries(obj);

}

function getColorsAndCapitalSystems(gamestate, starbaseCount, stars, federations) {

    function hsv(h, s, v, count) {

        // v = Math.max(0, Math.min(1, v + 0.25 * (Math.random() - 0.75)));
        // s = Math.max(0, Math.min(1, s + 0.25 * (Math.random() - 0.6)));

        count = +(count || 0);
        v = Math.min(1.0, Math.max(0.2, 0.9 * v * (0.85 ** count) + 0.05));
        s = 0.65 * s;

        let r = 0.0;
        let g = 0.0;
        let b = 0.0;

        if (h < 1/6) {
            r = 1.0;
            g = 6 * h;
        } else if (h < 2/6) {
            r = 6 * (2/6 - h);
            g = 1.0;
        } else if (h < 3/6) {
            g = 1.0;
            b = 6 * (h - 2/6);
        } else if (h < 4/6) {
            g = 6 * (4/6 - h);
            b = 1.0;
        } else if (h < 5/6) {
            b = 1.0;
            r = 6 * (h - 4/6);
        } else {
            b = 6 * (6/6 - h);
            r = 1.0;
        }

        r = s * r + (1 - s) * 1.0;
        g = s * g + (1 - s) * 1.0;
        b = s * b + (1 - s) * 1.0;

        r *= v;
        g *= v;
        b *= v;

        r = Math.max(0, Math.min(255, Math.floor(255 * r)));
        g = Math.max(0, Math.min(255, Math.floor(255 * g)));
        b = Math.max(0, Math.min(255, Math.floor(255 * b)));

        return `rgb(${r},${g},${b})`;

    }

    function randomColor() {
        return hsv(Math.random(), 0.4 * Math.random() + 0.4, 0.3 * Math.random() + 0.45, 0);
    }

    let colors = {};

    let colorCount = {};

    for (let [id, country] of Object.entries(gamestate.country)) {
        if (id == ENTRIES_KEY) continue;

        if (country.capital != null && starbaseCount[id] != null && starbaseCount[id] > 0) {

            let capital = +(country.capital);

            if (gamestate.planets != null && gamestate.planets.planet != null) {
                let planet = gamestate.planets.planet[capital];

                if (planet != null && planet.coordinate != null) {
                    let system = +(planet.coordinate.origin);
                    if (stars[system] != null) {
                        stars[system].capital = true;
                    }
                }
            }

        }

        if (country.flag != null && Array.isArray(country.flag.colors) && country.flag.colors.length > 2) {

            let color = (''+country.flag.colors[2]).replaceAll('"', '');
            if (color == 'black' || color == 'null') color = (''+country.flag.colors[1]).replaceAll('"', '');
            if (color == 'black' || color == 'null') color = (''+country.flag.colors[0]).replaceAll('"', '');

            if (USE_FLAG_COLORS) {
                color = (''+country.flag.colors[0]).replaceAll('"', '');
                if (color == 'black' || color == 'null') color = (''+country.flag.colors[1]).replaceAll('"', '');
                if (color == 'black' || color == 'null') color = (''+country.flag.colors[2]).replaceAll('"', '');
            }

            if (colorCount[color] == null) {
                colorCount[color] = 0;
            } else {
                colorCount[color]++;
            }

            let count = colorCount[color];

            switch (color) {
                case 'dark_brown':
                    colors[id] = hsv(0.06, 0.5, 0.35, colorCount[color]);
                    continue;
                case 'brown':
                    colors[id] = hsv(0.08, 0.5, 0.55, colorCount[color]);
                    continue;
                case 'beige':
                    colors[id] = hsv(0.075, 0.4, 0.7, colorCount[color]);
                    continue;
                case 'yellow':
                    colors[id] = hsv(0.10, 0.75, 0.8, colorCount[color]); // originally hsv(0.10, 0.75, 0.99)
                    continue;
                case 'light_orange':
                    colors[id] = hsv(0.09, 0.8, 0.8, colorCount[color]);
                    continue;
                case 'orange':
                    colors[id] = hsv(0.075, 0.8, 0.7, colorCount[color]);
                    continue;
                case 'red_orange':
                    colors[id] = hsv(0.028, 0.75, 0.7, colorCount[color]);
                    continue;
                case 'red':
                    colors[id] = hsv(0.99, 0.8, 0.7, colorCount[color]);
                    continue;
                case 'burgundy':
                    colors[id] = hsv(0.93, 0.6, 0.42, colorCount[color]);
                    continue;
                case 'pink':
                    colors[id] = hsv(0.95, 0.35, 0.6, colorCount[color]);
                    continue;
                case 'purple':
                    colors[id] = hsv(0.8, 0.4, 0.5, colorCount[color]);
                    continue;
                case 'dark_purple':
                    colors[id] = hsv(0.85, 0.6, 0.35, colorCount[color]);
                    continue;
                case 'indigo':
                    colors[id] = hsv(0.71, 0.85, 0.5, colorCount[color]);
                    continue;
                case 'dark_blue':
                    colors[id] = hsv(0.58, 0.7, 0.4, colorCount[color]);
                    continue;
                case 'blue':
                    colors[id] = hsv(0.6, 0.5, 0.6, colorCount[color]);
                    continue;
                case 'light_blue':
                    colors[id] = hsv(0.6, 0.4, 0.65, colorCount[color]); // originally hsv(0.6, 0.4, 0.8)
                    continue;
                case 'turquoise':
                    colors[id] = hsv(0.5, 0.75, 0.5, colorCount[color]); // originally hsv(0.5, 0.7, 0.8)
                    continue;
                case 'dark_teal':
                    colors[id] = hsv(0.48, 0.6, 0.42, colorCount[color]);
                    continue;
                case 'teal':
                    colors[id] = hsv(0.43, 0.3, 0.5, colorCount[color]);
                    continue;
                case 'light_green':
                    colors[id] = hsv(0.35, 0.4, 0.55, colorCount[color]);
                    continue;
                case 'green':
                    colors[id] = hsv(0.32, 0.4, 0.55, colorCount[color]);
                    continue;
                case 'dark_green':
                    colors[id] = hsv(0.33, 0.4, 0.3, colorCount[color]);
                    continue;
                case 'grey':
                    colors[id] = hsv(0.58, 0.15, 0.5, colorCount[color]); // originally hsv(0.58, 0.15, 0.6)
                    continue;
                case 'dark_grey':
                    colors[id] = hsv(0.6, 0.2, 0.3, colorCount[color]);
                    continue;
                case 'black':
                    colors[id] = hsv(0.7, 0.1, 0.18, colorCount[color]);
                    continue;
                default:
                    break;
            }
        } 

        colors[id] = randomColor();
    }

    if (federations && gamestate.federation != null) {

        for (let [id, federation] of Object.entries(gamestate.federation)) {

            if (typeof federation !== 'object' || federation == null) continue;
            if (!Array.isArray(federation.members)) continue;

            let color = randomColor();

            for (let id of federation.members) {
                if (colors[id] != null) {
                    color = colors[id];
                    break;
                }
            }

            for (let id of federation.members) {
                if (colors[id] != null) colors[id] = color;
            }

        }

    }

    colors[UNOWNED_ID] = BACKGROUND_COLOR;

    return [colors, colorCount];

}

function getMap(stars, hyperlanes, scaleFactor, sizeX, sizeY) {

    let map = [];

    for (let i = 0; i < RES_X; i++) {
        let column = [];
        for (let j = 0; j < RES_Y; j++) {

            let obj = {};
            obj[UNOWNED_ID] = scaleFactor * UNOWNED_VALUE;
            column.push(obj);

        }
        map.push(column);
    }

    for (let [id, star] of Object.entries(stars)) {

        let baseRadius = SYSTEM_RADIUS;

        let owner = star.owner;
        if (owner == null) {
            owner = UNOWNED_ID;
            baseRadius = UNOWNED_RADIUS;
        } else {
            owner = +owner;
        }

        baseRadius *= scaleFactor;

        let imin = Math.max(0, Math.floor((star.x - baseRadius) / sizeX));
        let imax = Math.min(RES_X, Math.floor((star.x + baseRadius) / sizeX));
        let jmin = Math.max(0, Math.floor((star.y - baseRadius) / sizeY));
        let jmax = Math.min(RES_Y, Math.floor((star.y + baseRadius) / sizeY));

        for (let i = imin; i < imax; i++) {
            column = map[i];
            for (let j = jmin; j < jmax; j++) {

                let x = sizeX * i;
                let y = sizeY * j;

                let distance = Math.hypot(star.x - x, star.y - y);
                let value = baseRadius - distance;

                if (distance < NEAR_RADIUS) {
                    value -= baseRadius - NEAR_RADIUS;
                    value *= NEAR_BOOST;
                    value += baseRadius - NEAR_RADIUS;
                }

                value = Math.max(0, value);

                if (column[j][owner] == null) column[j][owner] = 0;
                // column[j][owner] += value;
                column[j][owner] = Math.max(column[j][owner], value);

            }
        }

    }

    for (let [key, hyperlane] of Object.entries(hyperlanes)) {

        if (stars[hyperlane.from].owner != stars[hyperlane.to].owner) continue;
        
        let baseRadius = HYPERLANE_RADIUS;

        let owner = stars[hyperlane.from].owner;
        if (owner == null) {
            owner = UNOWNED_ID;
            baseRadius = UNOWNED_HYPERLANE_RADIUS;
        } else {
            owner = +owner;
        }

        baseRadius *= scaleFactor;

        let x1 = stars[hyperlane.from].x;
        let y1 = stars[hyperlane.from].y;
        let x2 = stars[hyperlane.to].x;
        let y2 = stars[hyperlane.to].y;

        // ax + by = c

        let a = y1 - y2;
        let b = x2 - x1;
        let c = a * x1 + b * y1;

        let x3 = x1 - (y2 - y1);
        let y3 = y1 + (x2 - x1);

        let distanceFactor = Math.hypot(x3 - x1, y3 - y1) / Math.abs(a * x3 + b * y3 - c);

        // normal

        let a2 = b;
        let b2 = -a;
        let c2 = a2 * ((x1 + x2) / 2) + b2 * ((y1 + y2) / 2);

        // let normalFactor = Math.hypot((x2 - x1) / 2, (y2 - y1) / 2) / Math.abs(a2 * x2 + b2 * y2 - c2);
        let halfLength = Math.abs(a2 * x1 + b2 * y1 - c2);

        let imin = Math.max(0, Math.floor((Math.min(x1, x2) - baseRadius) / sizeX));
        let imax = Math.min(RES_X, Math.floor((Math.max(x1, x2) + baseRadius) / sizeX));
        let jmin = Math.max(0, Math.floor((Math.min(y1, y2) - baseRadius) / sizeY));
        let jmax = Math.min(RES_Y, Math.floor((Math.max(y1, y2) + baseRadius) / sizeY));

        for (let i = imin; i < imax; i++) {
            column = map[i];
            for (let j = jmin; j < jmax; j++) {

                let x = sizeX * i;
                let y = sizeY * j;

                let distance = Math.min(Math.hypot(x - x1, y - y1), Math.hypot(x - x2, y - y2));

                if (Math.abs(a2 * x + b2 * y - c2) <= halfLength) {
                    distance = Math.min(distance, distanceFactor * Math.abs(a * x + b * y - c));
                }

                let value = baseRadius - distance;

                if (distance < NEAR_RADIUS / 2) {
                    value -= baseRadius - NEAR_RADIUS / 2;
                    value *= NEAR_BOOST / 2;
                    value += baseRadius - NEAR_RADIUS / 2;
                }

                value = Math.max(0, value);

                if (!Number.isFinite(value)) continue;

                if (column[j][owner] == null) column[j][owner] = 0;
                // column[j][owner] += value;
                column[j][owner] = Math.max(column[j][owner], value);

            }
        }

    }

    return map;

}

function smoothMap(map) {

    let map2 = [];
    for (let i = 0; i < RES_X; i++) {
        let column = [];
        for (let j = 0; j < RES_Y; j++) {
            column.push({});
        }
        map2.push(column);
    }

    for (let j = 0; j < RES_Y; j++) {
        for (let i = 0; i < RES_X; i++) {

            let entries = Object.entries(map[i][j]);

            for (let dy = -SMOOTHING_RADIUS; dy <= SMOOTHING_RADIUS; dy++) {

                let y = j + dy;
                if (y < 0 || y >= RES_Y) continue;

                for (let dx = -SMOOTHING_RADIUS; dx <= SMOOTHING_RADIUS; dx++) {

                    let x = i + dx;
                    if (x < 0 || x >= RES_X) continue;

                    const factor = 1 - Math.hypot(dx, dy) / (SMOOTHING_RADIUS + 1);
                    if (factor <= 0) continue;
                    for (let [id, value] of entries) {
                        if (map2[x][y][id] == null) {
                            map2[x][y][id] = factor * value;
                        } else {
                            map2[x][y][id] += factor * value;
                        }
                    }

                }

            }
        }
    }

    return map2;

}

function getBlocksAndMapNames(ctx, gamestate, values, createMapNames, sizeX, sizeY) {

    let blocks = [];
    let blockRun = [];
    let blockOwner = {};
    let blockSize = {};
    let blockMaximalRectangle = {};
    let blockCount = 0;

    for (let i = 0; i < RES_X - 1; i++) {
        let column = [];
        let column2 = [];
        for (let j = 0; j < RES_Y - 1; j++) {
            column.push(-1);
            column2.push(null);
        }
        blocks.push(column);
        blockRun.push(column2);
    }

    function spreadBlock(i, j, owner, block, stack) {
        if (i < 0 || i + 1 >= RES_X) return;
        if (j < 0 || j + 1 >= RES_Y) return;

        if (blocks[i][j] == block) return;
        
        let a = values[i][j].id;
        let b = values[i + 1][j].id;
        let c = values[i][j + 1].id;
        let d = values[i + 1][j + 1].id;

        if (a != owner) return;
        if (!(a == b && b == c && c == d)) return;

        blocks[i][j] = block;
        blockSize[block]++;

        stack.push([i - 1, j - 1]);
        stack.push([i, j - 1]);
        stack.push([i + 1, j - 1]);
        stack.push([i - 1, j]);
        stack.push([i + 1, j]);
        stack.push([i - 1, j + 1]);
        stack.push([i, j + 1]);
        stack.push([i + 1, j + 1]);

    }

    let stack = [];

    for (let j = 0; j + 1 < RES_Y; j++) {
        for (let i = 0; i + 1 < RES_X; i++) {

            if (blocks[i][j] != -1) continue;

            let a = values[i][j].id;
            let b = values[i + 1][j].id;
            let c = values[i][j + 1].id;
            let d = values[i + 1][j + 1].id;

            if (a == UNOWNED_ID) continue;
            if (a == b && b == c && c == d) {
                blockOwner[blockCount] = a;
                blockSize[blockCount] = 0;
                blockMaximalRectangle[blockCount] = null;

                stack.splice(0);
                stack.push([i, j]);

                for (let k = 0; k < stack.length; k++) {
                    spreadBlock(stack[k][0], stack[k][1], a, blockCount, stack);
                }

                blockCount++;
            }
        }
    }

    stack.splice(0);

    for (let j = 0; j < RES_Y - 1; j++) {

        let currentRun = {block: -1e100};

        for (let i = 0; i < RES_X - 1; i++) {

            if (blocks[i][j] == currentRun.block) {
                blockRun[i][j] = currentRun;
                continue;
            }

            currentRun.right = i;
            currentRun = {block: blocks[i][j], left: i};
            blockRun[i][j] = currentRun;

        }

        currentRun.right = RES_X - 1;

    }

    if (createMapNames) {
    
        ctx.font = `${(ALT_NAME_STYLE) ? 'bold' : '500'} 30px ${(ALT_NAME_STYLE) ? MAP_FONT_ALT : MAP_FONT}`;
    
        for (let block of Object.keys(blockMaximalRectangle)) {
    
            let owner = blockOwner[block];
    
            if (gamestate.country[owner] == null) continue;
            if (gamestate.country[owner].name == null) continue;
    
            let name = ''+(gamestate.country[owner].name);
            name = name.replaceAll('"', '');
            if (ALT_NAME_STYLE) name = (name.toLocaleUpperCase()).split('').join(' ');
    
            if (name.length < 1) continue;
    
            let text = ctx.measureText(name);
    
            let idealRatio = (sizeY / sizeX) * (text.width + 20) / (30 + 16);
    
            let best = {x: -1, y: -1, size: 0, width: 0};
    
            for (let j = 0; j < RES_Y - 1; j++) {
    
                let i = 0;
                while (i < RES_X - 1) {
                    
                    let size = 0;
                    let k = j;
                    let run = blockRun[i][j];
                    let minWidth = run.right - i;
    
                    while (true) {
    
                        if (k >= RES_Y - 1) break;
                        if (blocks[i][k] != block) break;
                        run = blockRun[i][k];
                        minWidth = Math.min(minWidth, run.right - i);
                        
                        size++;
                        if (idealRatio * size > minWidth) break;
    
                        if (size > best.size || (size == best.size && minWidth > best.width)) {
                            best.x = i + (minWidth - idealRatio * size) / 2;
                            best.y = j;
                            best.size = size;
                            best.width = minWidth
                        }
    
                        k++;
    
                    }
    
                    i += 1; // minWidth;
    
                }
    
            }
    
            if (best.size > 0) {
                let fontSize = (sizeY * best.size) / (30 + 16) * 30;
                if (LIMIT_MAP_NAME_SIZE) {
                    fontSize = Math.min(MAX_MAP_NAME_SIZE, fontSize);
                }
    
                blockMaximalRectangle[block] = {
                    x: sizeX * (best.x + idealRatio * best.size / 2) - fontSize / 30 * text.width / 2,
                    y: sizeY * (best.y + best.size / 2) + fontSize / 30 * Math.abs(text.actualBoundingBoxAscent) / 2,
                    fontSize: fontSize,
                    text: name,
                    owner: owner
                };
            }
    
        }

    }

    return [blocks, blockRun, blockOwner, blockSize, blockMaximalRectangle, blockCount];

}

function lerp(p0, p1, a0, b0, a1, b1) {

    a0 = a0 || 0;
    b0 = b0 || 0;
    a1 = a1 || 0;
    b1 = b1 || 0;

    a0 -= b0;
    a1 -= b1;

    if (a0 == a1) return 0.5 * p0 + 0.5 * p1;

    let t = (0 - a0) / (a1 - a0);
    if (!Number.isFinite(t)) t = 0.5;

    return (1 - t) * p0 + t * p1;

}

function drawCountryFill(ctx, colors, map, values, sizeX, sizeY) {
    
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1.0;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeWidth = 1.0;

    for (let currentId in colors) {

        if (!colors.hasOwnProperty(currentId)) continue;

        if (currentId == UNOWNED_ID) continue;

        ctx.fillStyle = colors[currentId] || MISSING_COLOR;
        ctx.strokeStyle = colors[currentId] || MISSING_COLOR;

        ctx.beginPath();

        for (let j = 0; j + 1 < RES_Y; j++) {

            for (let i = 0; i + 1 < RES_X; i++) {

                let value_UL = values[i][j];
                let value_UR = values[i + 1][j];
                let value_BL = values[i][j + 1];
                let value_BR = values[i + 1][j + 1];
                
                if (value_UL.id != currentId && value_UR.id != currentId && value_BL.id != currentId && value_BR.id != currentId) continue;
                
                let xmin = sizeX * i;
                let xmax = xmin + sizeX;
                let ymin = sizeY * j;
                let ymax = ymin + sizeY;

                let UL = map[i][j];
                let UR = map[i + 1][j];
                let BL = map[i][j + 1];
                let BR = map[i + 1][j + 1];

                if (value_UL.id == value_UR.id && value_UR.id == value_BL.id && value_BL.id == value_BR.id) {
                    if (value_UL.id != currentId) continue; // for some reason this breaks if I use a triple equals

                    ctx.rect(xmin, ymin, sizeX, sizeY);

                    continue;
                }

                if (value_UL.id == value_BR.id && value_UR.id == value_BL.id) {

                    let a = value_UL.id;
                    let b = value_UR.id;

                    let mida = 0;
                    let midb = 0;

                    if ((UR[a] || 0) == 0 || (BL[a] || 0) == 0) {
                        mida = 0.5 * value_UL.value + 0.5 * value_BR.value;
                    } else {
                        mida = 0.5 * (0.5 * value_UL.value + 0.5 * UR[a]) + 0.5 * (0.5 * value_BR.value + 0.5 * BL[a]);
                    }

                    if ((UL[b] || 0) == 0 || (BR[b] || 0) == 0) {
                        midb = 0.5 * value_UR.value + 0.5 * value_BL.value;
                    } else {
                        midb = 0.5 * (0.5 * value_UR.value + 0.5 * UL[b]) + 0.5 * (0.5 * value_BL.value + 0.5 * BR[b]);
                    }

                    let topMid = lerp(xmin, xmax, value_UL.value, (UL[b] || 0), (UR[a] || 0), value_UR.value);
                    let bottomMid = lerp(xmin, xmax, (BL[a] || 0), value_BL.value, value_BR.value, (BR[b] || 0));

                    let leftMid = lerp(ymin, ymax, value_UL.value, (UL[b] || 0), (BL[a] || 0), value_BL.value);
                    let rightMid = lerp(ymin, ymax, (UR[a] || 0), value_UR.value, value_BR.value, (BR[b] || 0));

                    if (midb > mida) {

                        if (value_UL.id == currentId) {
                            ctx.moveTo(xmin, ymin);
                            ctx.lineTo(topMid, ymin);
                            ctx.lineTo(xmin, leftMid);
                            ctx.closePath();

                            ctx.moveTo(xmax, ymax);
                            ctx.lineTo(bottomMid, ymax);
                            ctx.lineTo(xmax, rightMid);
                            ctx.closePath();
                        }
                        
                        if (value_UR.id == currentId) {
                            ctx.moveTo(xmax, ymin);
                            ctx.lineTo(xmax, rightMid);
                            ctx.lineTo(bottomMid, ymax);
                            ctx.lineTo(xmin, ymax);
                            ctx.lineTo(xmin, leftMid);
                            ctx.lineTo(topMid, ymin);
                        }

                    } else {

                        if (value_UL.id == currentId) {
                            ctx.moveTo(xmin, ymin);
                            ctx.lineTo(topMid, ymin);
                            ctx.lineTo(xmax, rightMid);
                            ctx.lineTo(xmax, ymax);
                            ctx.lineTo(bottomMid, ymax);
                            ctx.lineTo(xmin, leftMid);
                            ctx.closePath();
                        }

                        if (value_UR.id == currentId) {
                            ctx.moveTo(xmax, ymin);
                            ctx.lineTo(xmax, rightMid);
                            ctx.lineTo(topMid, ymin);
                            ctx.closePath();
    
                            ctx.moveTo(xmin, ymax);
                            ctx.lineTo(xmin, leftMid);
                            ctx.lineTo(bottomMid, ymax);
                            ctx.closePath();
                        }

                    }

                    continue;

                }

                let a = value_UL.id;
                let b = value_UR.id;
                let c = value_BR.id;
                let d = value_BL.id;

                let topMid = lerp(xmin, xmax, value_UL.value, (UL[b] || 0), (UR[a] || 0), value_UR.value);
                let bottomMid = lerp(xmax, xmin, value_BR.value, (BR[d] || 0), (BL[c] || 0), value_BL.value);

                let rightMid = lerp(ymin, ymax, value_UR.value, (UR[c] || 0), (BR[b] || 0), value_BR.value);
                let leftMid = lerp(ymax, ymin, value_BL.value, (BL[a] || 0), (UL[d] || 0), value_UL.value);

                if (a == currentId) {

                    ctx.moveTo(xmin, ymin);
                    ctx.lineTo(topMid, ymin);

                    if (a == b) {
                        b = UNOWNED_ID;
                        ctx.lineTo(topMid, ymin);
                        ctx.lineTo(xmax, ymin);
                        ctx.lineTo(xmax, rightMid);
                    }

                    if (a == c) {
                        c = UNOWNED_ID;
                        ctx.lineTo(xmax, rightMid);
                        ctx.lineTo(xmax, ymax);
                        ctx.lineTo(bottomMid, ymax);
                    }

                    if (a == d) {
                        d = UNOWNED_ID;
                        ctx.lineTo(bottomMid, ymax);
                        ctx.lineTo(xmin, ymax);
                        ctx.lineTo(xmin, leftMid);
                    }
                    
                    ctx.lineTo(xmin, leftMid);

                    ctx.closePath();

                }

                if (b == currentId) {

                    ctx.moveTo(xmax, ymin);
                    ctx.lineTo(xmax, rightMid);

                    if (b == c) {
                        c = UNOWNED_ID;
                        ctx.lineTo(xmax, rightMid);
                        ctx.lineTo(xmax, ymax);
                        ctx.lineTo(bottomMid, ymax);
                    }

                    if (b == d) {
                        d = UNOWNED_ID;
                        ctx.lineTo(bottomMid, ymax);
                        ctx.lineTo(xmin, ymax);
                        ctx.lineTo(xmin, leftMid);
                    }
                    
                    ctx.lineTo(topMid, ymin);

                    ctx.closePath();

                }

                if (c == currentId) {

                    ctx.moveTo(xmax, ymax);
                    ctx.lineTo(bottomMid, ymax);

                    if (c == d) {
                        d = UNOWNED_ID;
                        ctx.lineTo(bottomMid, ymax);
                        ctx.lineTo(xmin, ymax);
                        ctx.lineTo(xmin, leftMid);
                    }
                    
                    ctx.lineTo(xmax, rightMid);

                    ctx.closePath();

                }

                if (d == currentId) {

                    ctx.moveTo(xmin, ymax);
                    ctx.lineTo(xmin, leftMid);
                    ctx.lineTo(bottomMid, ymax);

                    ctx.closePath();

                }

            }

        }

        ctx.fill();
        ctx.stroke();

    }

}

function drawEdgeBorders(ctx, map, values, sizeX, sizeY) {

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.globalCompositeOperation = 'source-atop';
    ctx.globalAlpha = 1.0;

    for (let border of EDGE_BORDERS) {

        if (LIGHT_BORDERS) {
            if (!(border.light)) continue;
        } else {
            if (!(border.regular)) continue;
        }

        ctx.strokeStyle = border.color;
        ctx.lineWidth = border.width;
        ctx.beginPath();

        for (let j = 0; j + 1 < RES_Y; j++) {

            for (let i = 0; i + 1 < RES_X; i++) {

                let value_UL = values[i][j];
                let value_UR = values[i + 1][j];
                let value_BL = values[i][j + 1];
                let value_BR = values[i + 1][j + 1];
                
                let xmin = sizeX * i;
                let xmax = xmin + sizeX;
                let ymin = sizeY * j;
                let ymax = ymin + sizeY;

                let UL = map[i][j];
                let UR = map[i + 1][j];
                let BL = map[i][j + 1];
                let BR = map[i + 1][j + 1];

                if (value_UL.id == value_UR.id && value_UR.id == value_BL.id && value_BL.id == value_BR.id) {
                    continue;
                }

                if (value_UL.id == value_BR.id && value_UR.id == value_BL.id) {

                    let a = value_UL.id;
                    let b = value_UR.id;
                    
                    if (a == null) a == UNOWNED_ID;
                    if (b == null) b == UNOWNED_ID;

                    if (a != UNOWNED_ID && b != UNOWNED_ID) continue;

                    let mida = 0;
                    let midb = 0;

                    if ((UR[a] || 0) == 0 || (BL[a] || 0) == 0) {
                        mida = 0.5 * value_UL.value + 0.5 * value_BR.value;
                    } else {
                        mida = 0.5 * (0.5 * value_UL.value + 0.5 * UR[a]) + 0.5 * (0.5 * value_BR.value + 0.5 * BL[a]);
                    }

                    if ((UL[b] || 0) == 0 || (BR[b] || 0) == 0) {
                        midb = 0.5 * value_UR.value + 0.5 * value_BL.value;
                    } else {
                        midb = 0.5 * (0.5 * value_UR.value + 0.5 * UL[b]) + 0.5 * (0.5 * value_BL.value + 0.5 * BR[b]);
                    }

                    let topMid = lerp(xmin, xmax, value_UL.value, (UL[b] || 0), (UR[a] || 0), value_UR.value);
                    let bottomMid = lerp(xmin, xmax, (BL[a] || 0), value_BL.value, value_BR.value, (BR[b] || 0));

                    let leftMid = lerp(ymin, ymax, value_UL.value, (UL[b] || 0), (BL[a] || 0), value_BL.value);
                    let rightMid = lerp(ymin, ymax, (UR[a] || 0), value_UR.value, value_BR.value, (BR[b] || 0));

                    if (midb > mida) {

                        ctx.moveTo(topMid, ymin);
                        ctx.lineTo(xmin, leftMid);

                        ctx.moveTo(xmax, rightMid);
                        ctx.lineTo(bottomMid, ymax);

                    } else {

                        ctx.moveTo(topMid, ymin);
                        ctx.lineTo(xmax, rightMid);

                        ctx.moveTo(xmin, leftMid);
                        ctx.lineTo(bottomMid, ymax);

                    }

                    continue;

                }

                let a = value_UL.id;
                let b = value_UR.id;
                let c = value_BR.id;
                let d = value_BL.id;

                if (a == null) a == UNOWNED_ID;
                if (b == null) b == UNOWNED_ID;
                if (c == null) c == UNOWNED_ID;
                if (d == null) d == UNOWNED_ID;

                let topMid = lerp(xmin, xmax, value_UL.value, (UL[b] || 0), (UR[a] || 0), value_UR.value);
                let bottomMid = lerp(xmax, xmin, value_BR.value, (BR[d] || 0), (BL[c] || 0), value_BL.value);

                let rightMid = lerp(ymin, ymax, value_UR.value, (UR[c] || 0), (BR[b] || 0), value_BR.value);
                let leftMid = lerp(ymax, ymin, value_BL.value, (BL[a] || 0), (UL[d] || 0), value_UL.value);

                if (a != d && a != b && (a == UNOWNED_ID || d == UNOWNED_ID || b == UNOWNED_ID)) {
                    ctx.moveTo(xmin, leftMid);
                    ctx.lineTo(topMid, ymin);
                }

                if (b != a && b != c && (b == UNOWNED_ID || a == UNOWNED_ID || c == UNOWNED_ID)) {
                    ctx.moveTo(topMid, ymin);
                    ctx.lineTo(xmax, rightMid);
                }

                if (c != b && c != d && (c == UNOWNED_ID || b == UNOWNED_ID || d == UNOWNED_ID)) {
                    ctx.moveTo(xmax, rightMid);
                    ctx.lineTo(bottomMid, ymax);
                }

                if (d != c && d != a && (d == UNOWNED_ID || c == UNOWNED_ID || a == UNOWNED_ID)) {
                    ctx.moveTo(bottomMid, ymax);
                    ctx.lineTo(xmin, leftMid);
                }

                if ((a == b) && !(a == d || b == c) && (d == UNOWNED_ID || c == UNOWNED_ID)) {
                    ctx.moveTo(xmin, leftMid);
                    ctx.lineTo(xmax, rightMid);
                } else if ((c == d) && !(c == b || d == a) && (b == UNOWNED_ID || a == UNOWNED_ID)) {
                    ctx.moveTo(xmin, leftMid);
                    ctx.lineTo(xmax, rightMid);
                }

                if ((b == c) && !(b == a || c == d) && (a == UNOWNED_ID || d == UNOWNED_ID)) {
                    ctx.moveTo(topMid, ymin);
                    ctx.lineTo(bottomMid, ymax);
                } else if ((d == a) && !(d == c || a == b) && (c == UNOWNED_ID || b == UNOWNED_ID)) {
                    ctx.moveTo(topMid, ymin);
                    ctx.lineTo(bottomMid, ymax);
                }

            }

        }

        ctx.stroke();

    }

}

function drawCountryBorders(ctx, map, values, sizeX, sizeY) {

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1.0;

    for (let border of BORDERS) {
        
        if (LIGHT_BORDERS) {
            if (!(border.light)) continue;
        } else {
            if (!(border.regular)) continue;
        }
    
        ctx.strokeStyle = border.color;
        ctx.lineWidth = border.width;
        ctx.beginPath();

        for (let j = 0; j + 1 < RES_Y; j++) {

            for (let i = 0; i + 1 < RES_X; i++) {

                let value_UL = values[i][j];
                let value_UR = values[i + 1][j];
                let value_BL = values[i][j + 1];
                let value_BR = values[i + 1][j + 1];
                
                let xmin = sizeX * i;
                let xmax = xmin + sizeX;
                let ymin = sizeY * j;
                let ymax = ymin + sizeY;

                let UL = map[i][j];
                let UR = map[i + 1][j];
                let BL = map[i][j + 1];
                let BR = map[i + 1][j + 1];

                if (value_UL.id == value_UR.id && value_UR.id == value_BL.id && value_BL.id == value_BR.id) {
                    continue;
                }

                if (value_UL.id == value_BR.id && value_UR.id == value_BL.id) {

                    let a = value_UL.id;
                    let b = value_UR.id;
                    
                    if (a == null) a == UNOWNED_ID;
                    if (b == null) b == UNOWNED_ID;

                    if (a == UNOWNED_ID || b == UNOWNED_ID) continue;

                    let mida = 0;
                    let midb = 0;

                    if ((UR[a] || 0) == 0 || (BL[a] || 0) == 0) {
                        mida = 0.5 * value_UL.value + 0.5 * value_BR.value;
                    } else {
                        mida = 0.5 * (0.5 * value_UL.value + 0.5 * UR[a]) + 0.5 * (0.5 * value_BR.value + 0.5 * BL[a]);
                    }

                    if ((UL[b] || 0) == 0 || (BR[b] || 0) == 0) {
                        midb = 0.5 * value_UR.value + 0.5 * value_BL.value;
                    } else {
                        midb = 0.5 * (0.5 * value_UR.value + 0.5 * UL[b]) + 0.5 * (0.5 * value_BL.value + 0.5 * BR[b]);
                    }

                    let topMid = lerp(xmin, xmax, value_UL.value, (UL[b] || 0), (UR[a] || 0), value_UR.value);
                    let bottomMid = lerp(xmin, xmax, (BL[a] || 0), value_BL.value, value_BR.value, (BR[b] || 0));

                    let leftMid = lerp(ymin, ymax, value_UL.value, (UL[b] || 0), (BL[a] || 0), value_BL.value);
                    let rightMid = lerp(ymin, ymax, (UR[a] || 0), value_UR.value, value_BR.value, (BR[b] || 0));

                    if (midb > mida) {

                        ctx.moveTo(topMid, ymin);
                        ctx.lineTo(xmin, leftMid);

                        ctx.moveTo(xmax, rightMid);
                        ctx.lineTo(bottomMid, ymax);

                    } else {

                        ctx.moveTo(topMid, ymin);
                        ctx.lineTo(xmax, rightMid);

                        ctx.moveTo(xmin, leftMid);
                        ctx.lineTo(bottomMid, ymax);

                    }

                    continue;

                }

                let a = value_UL.id;
                let b = value_UR.id;
                let c = value_BR.id;
                let d = value_BL.id;

                if (a == null) a == UNOWNED_ID;
                if (b == null) b == UNOWNED_ID;
                if (c == null) c == UNOWNED_ID;
                if (d == null) d == UNOWNED_ID;

                let topMid = lerp(xmin, xmax, value_UL.value, (UL[b] || 0), (UR[a] || 0), value_UR.value);
                let bottomMid = lerp(xmax, xmin, value_BR.value, (BR[d] || 0), (BL[c] || 0), value_BL.value);

                let rightMid = lerp(ymin, ymax, value_UR.value, (UR[c] || 0), (BR[b] || 0), value_BR.value);
                let leftMid = lerp(ymax, ymin, value_BL.value, (BL[a] || 0), (UL[d] || 0), value_UL.value);

                if (a != d && a != b && !(a == UNOWNED_ID || d == UNOWNED_ID || b == UNOWNED_ID)) {
                    ctx.moveTo(xmin, leftMid);
                    ctx.lineTo(topMid, ymin);
                }

                if (b != a && b != c && !(b == UNOWNED_ID || a == UNOWNED_ID || c == UNOWNED_ID)) {
                    ctx.moveTo(topMid, ymin);
                    ctx.lineTo(xmax, rightMid);
                }

                if (c != b && c != d && !(c == UNOWNED_ID || b == UNOWNED_ID || d == UNOWNED_ID)) {
                    ctx.moveTo(xmax, rightMid);
                    ctx.lineTo(bottomMid, ymax);
                }

                if (d != c && d != a && !(d == UNOWNED_ID || c == UNOWNED_ID || a == UNOWNED_ID)) {
                    ctx.moveTo(bottomMid, ymax);
                    ctx.lineTo(xmin, leftMid);
                }

                if (a == UNOWNED_ID || b == UNOWNED_ID || c == UNOWNED_ID || d == UNOWNED_ID) continue;

                if ((a == b) && !(a == d || b == c)) {
                    ctx.moveTo(xmin, leftMid);
                    ctx.lineTo(xmax, rightMid);
                } else if ((c == d) && !(c == b || d == a)) {
                    ctx.moveTo(xmin, leftMid);
                    ctx.lineTo(xmax, rightMid);
                }

                if ((b == c) && !(b == a || c == d)) {
                    ctx.moveTo(topMid, ymin);
                    ctx.lineTo(bottomMid, ymax);
                } else if ((d == a) && !(d == c || a == b)) {
                    ctx.moveTo(topMid, ymin);
                    ctx.lineTo(bottomMid, ymax);
                }

            }

        }

        ctx.stroke();

    }
    
    ctx.fillStyle = BORDERS[BORDERS.length - 1].color;
    ctx.beginPath();

    let points = [[0, 0], [0, 0], [0, 0], [0, 0]];

    for (let j = 0; j + 1 < RES_Y; j++) {

        for (let i = 0; i + 1 < RES_X; i++) {

            let value_UL = values[i][j];
            let value_UR = values[i + 1][j];
            let value_BL = values[i][j + 1];
            let value_BR = values[i + 1][j + 1];
            
            let xmin = sizeX * i;
            let xmax = xmin + sizeX;
            let ymin = sizeY * j;
            let ymax = ymin + sizeY;

            let UL = map[i][j];
            let UR = map[i + 1][j];
            let BL = map[i][j + 1];
            let BR = map[i + 1][j + 1];

            if (value_UL.id == value_UR.id && value_UR.id == value_BL.id && value_BL.id == value_BR.id) {
                continue;
            }

            if (value_UL.id == value_BR.id && value_UR.id == value_BL.id) {
                continue;
            }

            let a = value_UL.id;
            let b = value_UR.id;
            let c = value_BR.id;
            let d = value_BL.id;

            if (a == null) a == UNOWNED_ID;
            if (b == null) b == UNOWNED_ID;
            if (c == null) c == UNOWNED_ID;
            if (d == null) d == UNOWNED_ID;

            let topMid = lerp(xmin, xmax, value_UL.value, (UL[b] || 0), (UR[a] || 0), value_UR.value);
            let bottomMid = lerp(xmax, xmin, value_BR.value, (BR[d] || 0), (BL[c] || 0), value_BL.value);

            let rightMid = lerp(ymin, ymax, value_UR.value, (UR[c] || 0), (BR[b] || 0), value_BR.value);
            let leftMid = lerp(ymax, ymin, value_BL.value, (BL[a] || 0), (UL[d] || 0), value_UL.value);

            let numPoints = 0;

            if ((a != b) && !(a == UNOWNED_ID || b == UNOWNED_ID)) {
                points[numPoints][0] = topMid;
                points[numPoints++][1] = ymin;
            }

            if ((b != c) && !(b == UNOWNED_ID || c == UNOWNED_ID)) {
                points[numPoints][0] = xmax;
                points[numPoints++][1] = rightMid;
            }

            if ((c != d) && !(c == UNOWNED_ID || d == UNOWNED_ID)) {
                points[numPoints][0] = bottomMid;
                points[numPoints++][1] = ymax;
            }

            if ((d != a) && !(d == UNOWNED_ID || a == UNOWNED_ID)) {
                points[numPoints][0] = xmin;
                points[numPoints++][1] = leftMid;
            }

            if (numPoints < 3) continue;

            ctx.moveTo(points[0][0], points[0][1]);
            for (let i = 1; i < numPoints; i++) {
                ctx.lineTo(points[i][0], points[i][1]);
            }
            ctx.closePath();

        }

    }

    ctx.fill();

}

function fillStar(ctx, x, y, radius) {

    function starPoint(n) {
        ctx.lineTo(
            x + radius * Math.cos((n/5 + 1/2) * Math.PI),
            y - radius * Math.sin((n/5 + 1/2) * Math.PI)
        );
    }

    ctx.beginPath();
    ctx.moveTo(x, y - radius);
    starPoint(4);
    starPoint(8);
    starPoint(2);
    starPoint(6);
    ctx.closePath();
    ctx.fill('nonzero');

}

function drawGatewayMarker(ctx, x, y, size) {
    let radius = 1.05 * size;
    ctx.lineWidth = 0.65 * Math.min(size, (CAPITAL_OUTER_RADIUS + UPGRADED_RADIUS) / 2);
    ctx.beginPath();

    ctx.moveTo(x - radius, y - radius);
    ctx.lineTo(x + radius, y + radius);

    ctx.moveTo(x + radius, y - radius);
    ctx.lineTo(x - radius, y + radius);

    ctx.strokeStyle = ctx.fillStyle;
    ctx.lineCap = 'round';
    ctx.stroke();
}

function drawGeography(ctx, colors, stars, hyperlanes) {

    ctx.lineJoin = 'round';
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1.0;

    ctx.strokeStyle = HYPERLANE_COLOR;
    ctx.lineWidth = HYPERLANE_WIDTH;
    ctx.beginPath();

    for (let [key, hyperlane] of Object.entries(hyperlanes)) {
        let x1 = stars[hyperlane.from].x;
        let y1 = stars[hyperlane.from].y;
        let x2 = stars[hyperlane.to].x;
        let y2 = stars[hyperlane.to].y;

        let length = Math.hypot(x2 - x1, y2 - y1);
        if (length <= 0) continue;

        dx = (x2 - x1) / length;
        dy = (y2 - y1) / length;

        if (stars[hyperlane.from].upgraded) { 
            ctx.moveTo(x1, y1);
        } else {
            ctx.moveTo(x1 + dx * Math.min(STAR_PADDING, length / 2), y1 + dy * Math.min(STAR_PADDING, length / 2));   
        }

        if (stars[hyperlane.to].upgraded) { 
            ctx.lineTo(x2, y2);
        } else {
            ctx.lineTo(x2 - dx * Math.min(STAR_PADDING, length / 2), y2 - dy * Math.min(STAR_PADDING, length / 2));   
        }
    }
    
    ctx.lineCap = 'butt';
    ctx.stroke();
    ctx.lineCap = 'round';

    for (let [id, star] of Object.entries(stars)) {

        if (star.capital) {
            continue;
        }

        if (star.upgraded) {
            continue;
        }

        ctx.fillStyle = star.populated ? POPULATED_COLOR : STAR_COLOR;
        if (star.gateway) drawGatewayMarker(ctx, star.x, star.y, STAR_RADIUS);

        ctx.beginPath();
        ctx.arc(star.x, star.y, STAR_RADIUS, 0, 2 * Math.PI);
        ctx.fill();

        if (star.gateway) drawGatewayMarker(ctx, star.x, star.y, STAR_RADIUS);

    }
    
    for (let [id, star] of Object.entries(stars)) {

        if (star.capital) {
            continue;
        }

        if (star.upgraded) {
            
            ctx.fillStyle = star.populated ? POPULATED_COLOR : STAR_COLOR;
            if (star.gateway) drawGatewayMarker(ctx, star.x, star.y, UPGRADED_RADIUS);

            ctx.beginPath();
            ctx.arc(star.x, star.y, UPGRADED_RADIUS, 0, 2 * Math.PI);
            ctx.fill();

            if (star.gateway) drawGatewayMarker(ctx, star.x, star.y, UPGRADED_RADIUS);

        }

    }
    
    for (let [id, star] of Object.entries(stars)) {

        if (star.capital) {

            ctx.fillStyle = POPULATED_COLOR;
            if (star.gateway) drawGatewayMarker(ctx, star.x, star.y, (CAPITAL_OUTER_RADIUS + CAPITAL_INNER_RADIUS) / 2);

            ctx.beginPath();
            ctx.arc(star.x, star.y, CAPITAL_OUTER_RADIUS, 0, 2 * Math.PI);
            ctx.fill();

            let owner = star.owner;
            if (owner == null) owner = UNOWNED_ID;

            ctx.fillStyle = (colors[owner] || MISSING_COLOR);
            ctx.beginPath();
            ctx.arc(star.x, star.y, CAPITAL_INNER_RADIUS, 0, 2 * Math.PI);
            ctx.fill();
            
            ctx.fillStyle = POPULATED_COLOR;
            fillStar(ctx, star.x, star.y, CAPITAL_STAR_RADIUS);

        }

    }

}

function drawMapNames(ctx, blockMaximalRectangle) {

    let canvas2 = document.getElementById('helperCanvas');
    let ctx2 = canvas2.getContext('2d');

    ctx2.lineJoin = 'round';
    ctx2.lineCap = 'round';
    ctx2.globalCompositeOperation = 'copy';

    canvas2.width = MAP_WIDTH;
    canvas2.height = MAP_HEIGHT;

    ctx2.fillStyle = 'rgba(0,0,0,0)';
    ctx2.beginPath();
    ctx2.rect(0, 0, MAP_WIDTH, MAP_HEIGHT);
    ctx2.fill();

    ctx2.strokeStyle = MAP_NAME_STROKE;
    ctx2.fillStyle = MAP_NAME_FILL;

    for (let [block, rect] of Object.entries(blockMaximalRectangle)) {
        if (rect == null || rect.fontSize < MIN_MAP_NAME_SIZE) continue;

        ctx2.font = `${(ALT_NAME_STYLE) ? 'bold' : '500'} ${rect.fontSize}px ${(ALT_NAME_STYLE) ? MAP_FONT_ALT : MAP_FONT}`;
        ctx2.lineWidth = MAP_NAME_STROKE_WIDTH * rect.fontSize;
        ctx2.strokeText(rect.text, rect.x, rect.y);
    }

    for (let [block, rect] of Object.entries(blockMaximalRectangle)) {
        if (rect == null || rect.fontSize < MIN_MAP_NAME_SIZE) continue;

        ctx2.font = `${(ALT_NAME_STYLE) ? 'bold' : '500'} ${rect.fontSize}px ${(ALT_NAME_STYLE) ? MAP_FONT_ALT : MAP_FONT}`;
        ctx2.lineWidth = MAP_NAME_STROKE_WIDTH * rect.fontSize;
        ctx2.fillText(rect.text, rect.x, rect.y);
    }

    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = MAP_NAME_ALPHA;
    ctx.drawImage(canvas2, 0, 0);
    ctx.globalAlpha = 1.0;

}

function drawMapMiddle(ctx, gamestate, innerRadius) {

    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1.0;

    ctx.fillStyle = INNER_CIRCLE_COLOR;

    ctx.beginPath();
    ctx.arc(MAP_WIDTH / 2, MAP_HEIGHT / 2, innerRadius, 0, 2 * Math.PI);
    ctx.fill();

    ctx.font = `bold 30px ${MAP_MIDDLE_FONT}`;
    let galaxyName = document.getElementById('galaxyName').value;
    let text = ctx.measureText(galaxyName);
    let fontSize = 30 * 0.75 * 2 * innerRadius / Math.max(60, text.width);

    ctx.font = `bold ${fontSize}px ${MAP_MIDDLE_FONT}`;
    ctx.fillStyle = MAP_MIDDLE_TEXT_COLOR;

    ctx.fillText(galaxyName, MAP_WIDTH / 2 - fontSize / 30 * text.width / 2, MAP_HEIGHT / 2 - 0.35 * innerRadius); // for some reason center align is buggy

    let dateText = (''+(gamestate.date)).replaceAll('"', '');

    ctx.font = `bold 30px ${MAP_MIDDLE_FONT}`;
    text = ctx.measureText(dateText);
    fontSize = 0.18 * innerRadius;
    ctx.font = `bold ${fontSize}px ${MAP_MIDDLE_FONT}`;
    ctx.fillText(dateText, MAP_WIDTH / 2 - fontSize / 30 * text.width / 2, MAP_HEIGHT / 2 - 0.1 * innerRadius);

    fontSize = 0.08 * innerRadius;
    ctx.font = `${fontSize}px ${MAP_MIDDLE_FONT}`;

    let x = MAP_WIDTH / 2 - 0.56 * innerRadius;
    let heights = [0.07, 0.22, 0.37, 0.53, 0.67];

    ctx.lineJoin = 'round';
    ctx.lineCap = 'butt';
    ctx.strokeStyle = HYPERLANE_COLOR;
    ctx.lineWidth = HYPERLANE_WIDTH;
    ctx.beginPath();
    ctx.moveTo(x, MAP_HEIGHT / 2);
    ctx.lineTo(x, MAP_HEIGHT / 2 + heights[0] * innerRadius - STAR_PADDING);
    ctx.moveTo(x, MAP_HEIGHT / 2 + heights[0] * innerRadius + STAR_PADDING);
    ctx.lineTo(x, MAP_HEIGHT / 2 + heights[1] * innerRadius - STAR_PADDING);
    ctx.moveTo(x, MAP_HEIGHT / 2 + heights[1] * innerRadius + STAR_PADDING);
    ctx.lineTo(x, MAP_HEIGHT / 2 + heights[2] * innerRadius - STAR_PADDING);
    ctx.moveTo(x, MAP_HEIGHT / 2 + heights[2] * innerRadius + STAR_PADDING);
    ctx.lineTo(x, MAP_HEIGHT / 2 + 0.77 * innerRadius);
    ctx.stroke();

    let y = MAP_HEIGHT / 2 + heights[0] * innerRadius;

    ctx.fillStyle = STAR_COLOR;
    ctx.beginPath();
    ctx.arc(x, y, STAR_RADIUS, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = MAP_MIDDLE_TEXT_COLOR;
    ctx.fillText('System', x + 0.11 * innerRadius, y + 0.03 * innerRadius);

    y = MAP_HEIGHT / 2 + heights[1] * innerRadius;

    ctx.fillStyle = POPULATED_COLOR;
    ctx.beginPath();
    ctx.arc(x, y, STAR_RADIUS, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = MAP_MIDDLE_TEXT_COLOR;
    ctx.fillText('Populated System', x + 0.11 * innerRadius, y + 0.03 * innerRadius);

    y = MAP_HEIGHT / 2 + heights[2] * innerRadius;

    ctx.fillStyle = STAR_COLOR;
    drawGatewayMarker(ctx, x, y, STAR_RADIUS);
    ctx.beginPath();
    ctx.arc(x, y, STAR_RADIUS, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = MAP_MIDDLE_TEXT_COLOR;
    ctx.fillText('System with Gateway', x + 0.11 * innerRadius, y + 0.03 * innerRadius);

    y = MAP_HEIGHT / 2 + heights[3] * innerRadius;

    ctx.fillStyle = POPULATED_COLOR;
    ctx.beginPath();
    ctx.arc(x, y, UPGRADED_RADIUS, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = MAP_MIDDLE_TEXT_COLOR;
    ctx.fillText('System with Upgraded Starbase', x + 0.11 * innerRadius, y + 0.03 * innerRadius);

    y = MAP_HEIGHT / 2 + heights[4] * innerRadius;

    ctx.fillStyle = POPULATED_COLOR;
    ctx.beginPath();
    ctx.arc(x, y, (CAPITAL_OUTER_RADIUS + CAPITAL_INNER_RADIUS) / 2, 0, 2 * Math.PI);
    ctx.strokeWidth = CAPITAL_OUTER_RADIUS - CAPITAL_INNER_RADIUS;
    ctx.strokeStyle = POPULATED_COLOR;
    ctx.stroke();

    ctx.fillStyle = POPULATED_COLOR;
    fillStar(ctx, x, y, CAPITAL_STAR_RADIUS);

    ctx.fillStyle = MAP_MIDDLE_TEXT_COLOR;
    ctx.fillText('Capital System', x + 0.11 * innerRadius, y + 0.03 * innerRadius);
    
}

function generateMap() {

    // Get settings, canvas, save file data

    USE_FLAG_COLORS = document.getElementById('useFlagColors').checked;
    USE_FEDERATION_COLORS = document.getElementById('useFederationColors').checked;
    DRAW_MAP_NAMES = document.getElementById('drawMapNames').checked;
    ALT_NAME_STYLE = document.getElementById('altNameStyle').checked;
    LIMIT_MAP_NAME_SIZE = document.getElementById('limitMapNameSize').checked;
    DRAW_MAP_MIDDLE = document.getElementById('drawMapMiddle').checked;
    USE_HUBBLE = document.getElementById('useHubble').checked;
    LIGHT_BORDERS = document.getElementById('lightBorders').checked;
    SMOOTH_BORDERS = document.getElementById('smoothBorders').checked;
    PAINT_SCALE_FACTOR = document.getElementById('paintScale').value / 100;

    const canvas = document.getElementById('galaxyMap');
    const ctx = canvas.getContext('2d');

    const gamestate = saveGame.gamestate;
    const meta = saveGame.meta;

    // Get map data

    let stars = {};
    let hyperlanes = {};

    let xmin = Infinity;
    let xmax = -Infinity;
    let ymin = Infinity;
    let ymax = -Infinity;

    let innerRadius = Infinity;

    let starbaseCount = {};

    for (let [id, star] of Object.entries(gamestate.galactic_object)) {

        if (id == ENTRIES_KEY) continue;

        id = Math.round(+id);

        if (star.coordinate == null) continue;

        xmin = Math.min(xmin, +star.coordinate.x);
        xmax = Math.max(xmax, +star.coordinate.x);
        ymin = Math.min(ymin, +star.coordinate.y);
        ymax = Math.max(ymax, +star.coordinate.y);

        innerRadius = Math.min(innerRadius, Math.hypot(+star.coordinate.x, +star.coordinate.y));

        stars[id] = {
            x: +star.coordinate.x,
            y: +star.coordinate.y,
            owner: null,
            hyperlanes: !(star.hyperlane == null || star.hyperlane.length === 0),
            capital: false,
            populated: false,
            gateway: false,
        };

        if (star.hyperlane != null) {
            for (let hyperlane of star.hyperlane) {
                let from = id;
                let to = Math.round(+hyperlane.to);
    
                if (from > to) {
                    let tmp = from;
                    from = to;
                    to = tmp;
                }
    
                let key = `${from},${to}`;
    
                hyperlanes[key] = {
                    from: from,
                    to: to
                };
            }
        }

        if (star.starbase != null) {
            if (gamestate.starbase_mgr.starbases[star.starbase] == null) continue;
            if (gamestate.starbase_mgr.starbases[star.starbase].owner == null) continue;

            let owner = gamestate.starbase_mgr.starbases[star.starbase].owner
            stars[id].owner = owner;
            if (starbaseCount[owner] == null) starbaseCount[owner] = 0;
            starbaseCount[owner]++;

            stars[id].upgraded = (gamestate.starbase_mgr.starbases[star.starbase].level != '"starbase_level_outpost"');
        }

        if (star.bypasses != null && gamestate.bypasses != null) {
            for (let bypass of star.bypasses) {
                if (gamestate.bypasses[bypass] != null && gamestate.bypasses[bypass].type == '"gateway"') {
                    stars[id].gateway = true;
                    continue;
                }
            }
        }

    }

    if (gamestate.planets != null && gamestate.planets.planet != null) {
        for (let [id, planet] of Object.entries(gamestate.planets.planet)) {
            if (id === ENTRIES_KEY) continue;

            if (!Array.isArray(planet.pop)) continue;
            if (planet.pop.length < 1) continue;

            if (planet.coordinate == null) continue;
            if (planet.coordinate.origin == null) continue;

            let system = +(planet.coordinate.origin);
            if (stars[system] == null) continue;
            stars[system].populated = true;
        }
    }

    let [colors, colorCount] = getColorsAndCapitalSystems(gamestate, starbaseCount, stars, USE_FEDERATION_COLORS);

    // Generate map

    const sizeX = MAP_WIDTH / (RES_X - 1);
    const sizeY = MAP_HEIGHT / (RES_Y - 1);

    let scale = Math.min(
        (MAP_WIDTH / 2 - (SYSTEM_RADIUS - UNOWNED_VALUE) - PADDING) / Math.max(Math.abs(xmax), Math.abs(xmin)),
        (MAP_HEIGHT / 2 - (SYSTEM_RADIUS - UNOWNED_VALUE) - PADDING) / Math.max(Math.abs(ymax), Math.abs(ymin))
    );

    innerRadius = Math.max(0, Math.min(MAP_WIDTH, MAP_HEIGHT, scale * innerRadius - INNER_PADDING));

    let scaleFactor = scale / PAINT_SCALE_FACTOR;

    let ax = MAP_WIDTH / 2;
    let ay = MAP_HEIGHT / 2;

    for (let [id, star] of Object.entries(stars)) {
        star.x = -scale * star.x + ax;
        star.y = scale * star.y + ay
    }

    let map = getMap(stars, hyperlanes, scaleFactor, sizeX, sizeY);

    if (SMOOTH_BORDERS) map = smoothMap(map);

    let values = [];
    for (let i = 0; i < RES_X; i++) {
        let column = [];
        for (let j = 0; j < RES_Y; j++) {

            let value = {id: UNOWNED_ID, value: 0};
            for (let [id, val] of Object.entries(map[i][j])) {
                if (val > value.value) {
                    value.id = id;
                    value.value = val;
                }
            }

            column.push(value);
        }
        values.push(column);
    }

    let [
        blocks,
        blockRun,
        blockOwner,
        blockSize,
        blockMaximalRectangle,
        blockCount
    ] = getBlocksAndMapNames(ctx, gamestate, values, DRAW_MAP_NAMES, sizeX, sizeY);

    // Draw map

    canvas.width = MAP_WIDTH;
    canvas.height = MAP_HEIGHT;

    canvas.style.width = '1100px';
    canvas.style.height = '1100px';

    ctx.filter = 'none';

    ctx.fillStyle = 'rgba(0,0,0,0)';
    ctx.globalCompositeOperation = 'copy';
    ctx.beginPath();
    ctx.rect(0, 0, MAP_WIDTH, MAP_HEIGHT);
    ctx.fill();

    drawCountryFill(ctx, colors, map, values, sizeX, sizeY);

    drawEdgeBorders(ctx, map, values, sizeX, sizeY);

    drawCountryBorders(ctx, map, values, sizeX, sizeY);

    drawGeography(ctx, colors, stars, hyperlanes);

    if (DRAW_MAP_NAMES) drawMapNames(ctx, blockMaximalRectangle);
    
    innerRadius -= scaleFactor * (SYSTEM_RADIUS - UNOWNED_VALUE / 2) / 1.5;
    innerRadius = Math.max(100, innerRadius);

    if (DRAW_MAP_MIDDLE) drawMapMiddle(ctx, gamestate, innerRadius);

    ctx.globalCompositeOperation = 'destination-over';

    if (USE_HUBBLE) {
        ctx.fillStyle = BACKGROUND_COLOR;
        ctx.beginPath();
        ctx.rect(0, 0, MAP_WIDTH, MAP_HEIGHT);
        ctx.fill();

        ctx.filter = BACKGROUND_FILTER;
        ctx.drawImage(BACKGROUND_IMAGE, 0, 0, MAP_WIDTH, MAP_HEIGHT);
        ctx.filter = 'none';
    } else {
        /*
        ctx.fillStyle = SUBSTITUTE_BACKGROUND;
        ctx.beginPath();
        ctx.rect(0, 0, MAP_WIDTH, MAP_HEIGHT);
        ctx.fill();
        */
    }

}

function drawMap(e) {

    document.getElementById('mapStatus').innerHTML = 'Working...';
    sleepUntilTrue(() => (saveGame != null && !lock)).then(() => {

        lock = true;

        try {

            generateMap();
            document.getElementById('mapStatus').innerHTML = '';

        } catch (e) {
            lock = false;
            console.log(e);
            document.getElementById('mapStatus').innerHTML = 'Map failed to generate.';
        }


        lock = false;

    });

}
