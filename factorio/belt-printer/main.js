BELT = 'express-transport-belt';
TUNNEL = 'express-underground-belt';
SPLITTER = 'express-splitter';

INPUT = 'input';
OUTPUT = 'output';

NORTH = 0;
EAST = 2;
SOUTH = 4;
WEST = 6;

bitmap = [];
bitmapWidth = 0;
bitmapHeight = 0;

function openImage(e) {
    var reader = new FileReader();
    reader.onload = function () {
        processImage(createImageBitmap(reader.result));
    }

    let file = document.getElementById("imageInput").files[0];
    document.getElementById("fileDisplay").innerHTML = file.name;
    
    createImageBitmap(file).then(
        (image) => {processImage(image);}
    );
    //reader.readAsArrayBuffer(file);
}

function processImage(image) {

    if ((image.width > 128) || (image.height > 20)) {
        alert(`The image given is too big\nThe max size allowed is 128px wide and 20px tall\nThe image given is ${image.width}px wide and ${image.height}px tall`);
        return;
    }

    let newWidth = 4;
    while (newWidth < image.width) {
        newWidth *= 2;
    }

    let newHeight = 2 * Math.ceil(image.height / 2);
    if (newHeight < 4) {
        newHeight = 4;
    }

    let preview = document.getElementById("preview");
    preview.height = newHeight;
    preview.style.height = `${6 * newHeight}px`;
    preview.width = newWidth;
    preview.style.width = `${3 * newWidth}px`;

    let ctx = preview.getContext('2d');
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, preview.width, preview.height);
    ctx.drawImage(image, Math.floor((newWidth - image.width) / 2), 0);

    let imageData = ctx.getImageData(0, 0, preview.width, preview.height);

    let minBrightness = 1.0;
    let maxBrightness = 0.0;

    for (let i = 0; i < imageData.data.length; i += 4) {
        
        let r = imageData.data[i] / 255.0;
        let g = imageData.data[i + 1] / 255.0;
        let b = imageData.data[i + 2] / 255.0;

        let brightness = 0.2126*r + 0.7152*g + 0.0722*b;
        minBrightness = Math.min(minBrightness, brightness);
        maxBrightness = Math.max(maxBrightness, brightness);

    }

    let middleBrightness = (minBrightness + maxBrightness) / 2;

    let width = preview.width;
    let height = preview.height;
    bitmap = [];
    for (let i = 0; i < height; i++) {
        bitmap.push([]);
    }

    let x = 0;
    let y = 0;
    for (let i = 0; i < imageData.data.length; i += 4) {
        
        let r = imageData.data[i] / 255.0;
        let g = imageData.data[i + 1] / 255.0;
        let b = imageData.data[i + 2] / 255.0;

        let brightness = 0.2126*r + 0.7152*g + 0.0722*b;
        if (brightness > middleBrightness) {
            imageData.data[i] = 255;
            imageData.data[i + 1] = 255;
            imageData.data[i + 2] = 255;
            bitmap[y][x] = false;
        } else {
            imageData.data[i] = 0;
            imageData.data[i + 1] = 0;
            imageData.data[i + 2] = 0;
            bitmap[y][x] = true;
        }

        imageData.data[i + 3] = 255;

        if (++x >= width) {
            x = 0;
            y++;
        }

    }

    bitmapWidth = width;
    bitmapHeight = height;

    ctx.putImageData(imageData, 0, 0);

}


class Blueprint {

    constructor(name) {

        if (name == null) name = "Unnamed Blueprint";

        this.bp = {
            item: 'blueprint',
            label: name,
            entities: [],
            icons: [
                {
                    index: 1,
                    signal: {
                        name: BELT,
                        type: 'item'
                    }
                },
                {
                    index: 2,
                    signal: {
                        name: BELT,
                        type: 'item'
                    }
                },
                {
                    index: 3,
                    signal: {
                        name: BELT,
                        type: 'item'
                    }
                },
                {
                    index: 4,
                    signal: {
                        name: BELT,
                        type: 'item'
                    }
                }
            ],
            schedules: [],
            version: 281479274692608
        };

        this.xmin = Infinity;
        this.xmax = -Infinity;
        this.ymin = Infinity;
        this.ymax = -Infinity;

        this.occupied = new Map();
        
    }

    addBelt(x, y, rot) {

        x = Math.round(2 * x) / 2;
        y = Math.round(2 * y) / 2;

        let key = `${x},${y}`;
        if (this.occupied.has(key)) {
            return;
        }

        let entity = {
            entity_number: this.bp.entities.length + 1,
            name: BELT,
            position: {
                x: x + 0.5,
                y: y + 0.5
            },
            direction: rot,
        };
        this.bp.entities.push(entity);

        this.xmin = Math.min(this.xmin, x);
        this.xmax = Math.max(this.xmax, x);
        this.ymin = Math.min(this.ymin, y);
        this.ymax = Math.max(this.ymax, y);
    }

    addCircuitBelts(x0, y0, rot0, x1, y1, rot1) {

        x0 = Math.round(2 * x0) / 2;
        y0 = Math.round(2 * y0) / 2;

        x1 = Math.round(2 * x1) / 2;
        y1 = Math.round(2 * y1) / 2;

        this.occupied.set(`${x0},${y0}`, true);
        this.occupied.set(`${x1},${y1}`, true);

        let entity0 = {
            entity_number: this.bp.entities.length + 1,
            name: BELT,
            position: {
                x: x0 + 0.5,
                y: y0 + 0.5
            },
            direction: rot0,
            control_behavior: {
                circuit_condition: {
                    first_signal: {
                        type: "virtual",
                        name: "signal-A"
                    },
                    constant: 1,
                    comparator: "<"
                },
                circuit_enable_disable: true,
                circuit_read_hand_contents: false,
                circuit_contents_read_mode: 0
            },
            connections: {}
        };
        entity0.connections[1] = {
            green: [
                {
                    entity_id: this.bp.entities.length + 2
                }
            ]
        };

        let entity1 = {
            entity_number: this.bp.entities.length + 2,
            name: BELT,
            position: {
                x: x1 + 0.5,
                y: y1 + 0.5
            },
            direction: rot1,
            control_behavior: {
                circuit_condition: {
                    first_signal: {
                        type: "virtual",
                        name: "signal-A"
                    },
                    constant: 1,
                    comparator: "<"
                },
                circuit_enable_disable: true,
                circuit_read_hand_contents: false,
                circuit_contents_read_mode: 0
            },
            connections: {}
        };
        entity1.connections[1] = {
            green: [
                {
                    entity_id: this.bp.entities.length + 1
                }
            ]
        };

        this.bp.entities.push(entity0);
        this.bp.entities.push(entity1);

        this.xmin = Math.min(this.xmin, x0, x1);
        this.xmax = Math.max(this.xmax, x0, x1);
        this.ymin = Math.min(this.ymin, y0, y1);
        this.ymax = Math.max(this.ymax, y0, y1);



    }

    addTunnel(x, y, rot, type) {

        x = Math.round(2 * x) / 2;
        y = Math.round(2 * y) / 2;

        let entity = {
            entity_number: this.bp.entities.length + 1,
            name: TUNNEL,
            position: {
                x: x + 0.5,
                y: y + 0.5
            },
            direction: rot,
            type: type
        };
        this.bp.entities.push(entity);

        this.xmin = Math.min(this.xmin, x);
        this.xmax = Math.max(this.xmax, x);
        this.ymin = Math.min(this.ymin, y);
        this.ymax = Math.max(this.ymax, y);
    }

    addSplitter(x, y, rot) {

        x = Math.round(2 * x) / 2;
        y = Math.round(2 * y) / 2;

        let entity = {
            entity_number: this.bp.entities.length + 1,
            name: SPLITTER,
            position: {
                x: x + 0.5,
                y: y + 0.5
            },
            direction: rot,
        };
        this.bp.entities.push(entity);

        this.xmin = Math.min(this.xmin, Math.floor(x));
        this.xmax = Math.max(this.xmax, Math.floor(x) + 1);
        this.ymin = Math.min(this.ymin, Math.floor(y));
        this.ymax = Math.max(this.ymax, Math.floor(y) + 1);
    }

    addOtherBlueprint(bp, x, y) {

        x = Math.round(x);
        y = Math.round(y);

        let offset = this.bp.entities.length;

        for (let entity of bp.bp.entities) {

            let newEntity = {
                entity_number: entity.entity_number + offset,
                name: entity.name,
                position: {
                    x: entity.position.x + x,
                    y: entity.position.y + y
                },
                direction: entity.direction
            };

            if (entity.type != null) {
                newEntity.type = entity.type;
            }

            if (entity.control_behavior != null) {
                newEntity.control_behavior = entity.control_behavior;
            }

            if (entity.connections != null) {
                newEntity.connections = {};
                newEntity.connections[1] = {
                    green: [
                        {
                            entity_id: entity.connections[1].green[0].entity_id + offset
                        }
                    ]
                };
            }

            this.bp.entities.push(newEntity);

        }

        this.xmin = Math.min(this.xmin, bp.xmin + x);
        this.xmax = Math.max(this.xmax, bp.xmax + x);
        this.ymin = Math.min(this.ymin, bp.ymin + y);
        this.ymax = Math.max(this.ymax, bp.ymax + y);

    }

    serialize() {
        return '0' + fromByteArray(pako.deflate(JSON.stringify({
            blueprint: this.bp
        }), {level: 9}));
    }


}


function calculateBeltDelay(arr, index, currentDelay, currentBelts, belts) {

    if (currentBelts >= belts) {
        arr.push(currentDelay);
        return arr;
    }

    let l = currentDelay + currentBelts;
    let r = currentDelay;

    let l_i = 2 * index;
    let r_i = l_i + 1;

    currentBelts *= 2;

    if (currentBelts < belts) {

        l += 4 * l_i;
        r += 4 * r_i;

        calculateBeltDelay(arr, l_i, l, currentBelts, belts);
        calculateBeltDelay(arr, r_i, r, currentBelts, belts);

    } else {

        l += 4 * (belts - 1 - l_i);
        r += 4 * (belts - 1 - r_i);
        
        arr.push(l / 4);
        arr.push(r / 4);
    }

    return arr;

}

function calculateDelayCorrection(belts) {

    if (belts < 4) { // Invalid case
        return [[0], [0]];
    }

    let delays = calculateBeltDelay([], 0, 0, 1, belts);
    let correction = [];
    let correctedDelay = [];

    for (i = 0; i < 4; i++) {

        let fraction = [0.75, 0.25, 0.50, 0.00][i];

        let values = delays.slice(i * belts / 4, (i + 1) * belts / 4);

        let ordinals = [];

        for (let i = 0; i < values.length; i++) {

            let value = values[i];
            let position = 0;

            for (let j = 0; j < i; j++) {
                if ((Math.floor(values[j]) % 2) !== (Math.floor(value) % 2)) continue;
                if (values[j] < value) position++;
            }

            for (let j = i + 1; j < values.length; j++) {
                if ((Math.floor(values[j]) % 2) !== (Math.floor(value) % 2)) continue;
                if (values[j] <= value) position++;
            }

            ordinals.push(position);

        }

        values.forEach(function (v, i) {
            if (Math.floor(v) % 2 === 0) {
                correction.push(2 * ordinals[i] + fraction - v);  
                correctedDelay.push(2 * ordinals[i] + fraction);
            } else {
                correction.push(2 * ordinals[i] + 1 + fraction - v);
                correctedDelay.push(2 * ordinals[i] + 1 + fraction);
            }
        });

    }

    let sorted = correctedDelay.slice();
    sorted.sort((a, b) => (a - b));
    let order = sorted.map((v) => (correctedDelay.indexOf(v)));

    let minimum = Math.min.apply(null, correction);
    correction.forEach(function (v, i) {
        correction[i] = v - minimum;
    });

    // console.log(correctedDelay.map((v, i) => ((v + i - (correction[i] % 2)) % (belts / 4))));

    return [correction, order];

}

function createUnit(belts) {

    let bp = new Blueprint();
    bp.belts = belts;

    let x = 0;
    let currentBelts = 1;

    while (currentBelts < belts) {

        for (let i = 0; i < currentBelts; i++) {
            bp.addSplitter(x, -2 * i - 0.5, WEST);
        }

        currentBelts *= 2;
        x -= 1;
        if (currentBelts < belts) {

            let j = currentBelts;
            for (let i = 0; i < currentBelts; i++) {

                j--;

                let currX = x;
                let currY = -i;

                for (let w = 0; w < j; w++) {
                    bp.addBelt(currX, currY, WEST);
                    currX--;
                }
                bp.addBelt(currX, currY, NORTH);
                for (let h = 0; h < i; h++) {
                    currY--;
                    bp.addBelt(currX, currY, NORTH);
                }
                currY--;
                bp.addBelt(currX, currY, WEST);
                for (let w = 0; w < i; w++) {
                    currX--;
                    bp.addBelt(currX, currY, WEST);
                }

            }


            x -= currentBelts;

        }

    }

    let [correction, order] = calculateDelayCorrection(belts);
    bp.correction = correction;
    bp.order = order;

    let numToComplete = belts;
    let completed = [];
    for (let i = 0; i < belts; i++) {
        completed.push(false);
    }

    while (numToComplete > 0) {
        
        y = belts - 1;
        while (y >= 0) {

            if (completed[y]) {

                bp.addBelt(x, -y, WEST);
                bp.addBelt(x - 1, -y, WEST);
                bp.addBelt(x - 2, -y, WEST);
                bp.addBelt(x - 3, -y, WEST);

                y--;

            } else {

                let bottomY = y - 1 - Math.floor(correction[y] / 2);

                bp.addBelt(x, -y, WEST);
                bp.addBelt(x - 1, -y, SOUTH);
                bp.addBelt(x - 1, -bottomY, WEST);
                bp.addBelt(x - 2, -bottomY, NORTH);
                bp.addBelt(x - 2, -y, WEST);
                bp.addBelt(x - 3, -y, WEST);

                for (let h = y - 1; h > bottomY; h--) {
                    bp.addBelt(x - 1, -h, SOUTH);
                    bp.addBelt(x - 2, -h, NORTH);
                    if (h >= 0) {
                        bp.addTunnel(x, -h, WEST, INPUT);
                        bp.addTunnel(x - 3, -h, WEST, OUTPUT);
                    }
                }

                if (bottomY >= 0) {
                    bp.addTunnel(x, -bottomY, WEST, INPUT);
                    bp.addTunnel(x - 3, -bottomY, WEST, OUTPUT);
                }

                completed[y] = true;
                numToComplete--;

                y = bottomY - 1;

            }

        }

        x -= 4;
    }

    bp.outputX = x;

    return bp;

}

function createPrinterUnit(unit, pixels) {

    let belts = unit.belts;
    let order = unit.order;
    let x = unit.outputX;

    let bp = new Blueprint();
    bp.addOtherBlueprint(unit, 0, 0);

    for (let i = 0; i < belts; i++) {

        let y = order[i];

        if (pixels[i]) {

            bp.addCircuitBelts(x, -y, WEST, x - 1, -y, NORTH);

        } else {

            bp.addTunnel(x, -y, WEST, INPUT);
            bp.addTunnel(x - 2, -y, WEST, OUTPUT);
            bp.addCircuitBelts(x - 3, -y, WEST, x - 4, -y, NORTH);

        }

    }

    for (let j = -1; j < belts; j++) {
        bp.addBelt(x - 1, -j, NORTH);
        bp.addBelt(x - 4, -j, NORTH);
    }

    let topY = -belts;
    bp.addBelt(x - 4, topY, NORTH);
    bp.addBelt(x - 4, topY - 1, NORTH);
    bp.addCircuitBelts(x - 1, topY, NORTH, x - 1, topY - 1, WEST);
    bp.addCircuitBelts(x - 4, topY - 2, NORTH, x - 4, topY - 3, WEST);
    bp.addBelt(x, topY - 1, WEST);
    bp.addBelt(x - 2, topY - 1, WEST);
    bp.addTunnel(x - 3, topY - 1, WEST, INPUT);
    bp.addTunnel(x - 5, topY - 1, WEST, OUTPUT);
    bp.addBelt(x - 3, topY - 3, WEST);
    bp.addBelt(x - 5, topY - 3, WEST);

    return bp;

}

function addRow(bp, row, unit, unitWidth, unitHeight) {

    let x = 0;
    let y = 5 * row;

    bp.addBelt(x, y, WEST);
    bp.addBelt(x - 1, y, WEST);
    bp.addBelt(x - 2, y, SOUTH);
    bp.addBelt(x, y + 2, WEST);
    bp.addBelt(x - 1, y + 2, WEST);
    bp.addBelt(x - 2, y + 2, SOUTH);
    bp.addBelt(x - 1, y + 1, WEST);
    bp.addBelt(x - 2, y + 1, WEST);
    bp.addBelt(x - 1, y + 3, WEST);
    bp.addBelt(x - 2, y + 3, WEST);
    bp.addBelt(x, y + 4, WEST);
    bp.addBelt(x - 1, y + 4, WEST);
    bp.addBelt(x - 2, y + 4, WEST);

    x = -3;
    y += 1;
    for (let i = 0; i < row; i++) {
        bp.addBelt(x, y, WEST);
        x--;
    }
    bp.addBelt(x, y, NORTH);
    if (row === 0) {
        y -= 1;
    } else {
        for (y -= 1; y > 0; y -= 5) {
            bp.addTunnel(x, y, NORTH, INPUT);
            bp.addTunnel(x, y - 4, NORTH, OUTPUT);
        }
    }

    let height = (bitmapHeight / 2) - 1 - row;
    height *= (unitHeight + 4);
    height += 1;

    for (let i = 0; i < height; i++) {
        bp.addBelt(x, y, NORTH);
        y--;
    }
    
    for (let i = unit.ymax; i > 0; i--) {
        bp.addBelt(x, y, NORTH);
        y--;
    }
    bp.addBelt(x, y, WEST);
    let printerUnit = createPrinterUnit(unit, bitmap[2 * row])
    bp.addOtherBlueprint(printerUnit, x - 1, y);

    x = printerUnit.xmin + x - 1;
    y = printerUnit.ymin + y;
    for (let i = 0; i < unitWidth + bitmapHeight + 4; i++) {
        x--;
        bp.addBelt(x, y, WEST);
        bp.addBelt(x, y + 2, WEST);
    }

    x = -3;
    y = 5 * row + 3;
    for (let i = 0; i < row + (bitmapHeight / 2) + unitWidth + 2; i++) {
        bp.addBelt(x, y, WEST);
        x--;
    }
    bp.addBelt(x, y, NORTH);
    if (row === 0) {
        y -= 1;
    } else {
        for (y -= 1; y > 2; y -=5) {
            bp.addTunnel(x, y, NORTH, INPUT);
            bp.addTunnel(x, y - 4, NORTH, OUTPUT);
        }
    }

    height = (bitmapHeight / 2) - 1 - row;

    for (let i = 0; i < height; i++) {
        for (let j = 0; j < unitHeight - 1; j++) {    
            bp.addBelt(x, y, NORTH);
            y--;
        }
        bp.addTunnel(x, y, NORTH, INPUT);
        bp.addTunnel(x, y - 4, NORTH, OUTPUT);
        y -= 5;
    }
    
    for (let i = unit.ymax - 1; i > 0; i--) {
        bp.addBelt(x, y, NORTH);
        y--;
    }
    bp.addBelt(x, y, WEST);
    printerUnit = createPrinterUnit(unit, bitmap[2 * row + 1])
    bp.addOtherBlueprint(printerUnit, x - 1, y);

    x = printerUnit.xmin + x - 1;
    y = printerUnit.ymin + y;
    for (let i = 0; i < 4 + (bitmapHeight / 2); i++) {
        x--;
        bp.addBelt(x, y, WEST);
        bp.addBelt(x, y + 2, WEST);
    }

    x = -3;
    y = 5 * row + 4;
    for (let i = 0; i < 2 * ((bitmapHeight / 2) + unitWidth + 2) + row - 3; i++) {
        bp.addBelt(x, y, WEST);
        x--;
    }

    bp.addBelt(x, y, NORTH);
    for (y -= 1; y > 2; y--) {
        bp.addBelt(x, y, NORTH);
    }

    height = (bitmapHeight / 2) - 1 - row;

    for (let i = 0; i < height; i++) {
        for (let j = 0; j < unitHeight - 5; j++) {    
            bp.addBelt(x, y, NORTH);
            y--;
        }
        bp.addTunnel(x, y, NORTH, INPUT);
        bp.addTunnel(x, y - 8, NORTH, OUTPUT);
        y -= 9;
    }
    
    for (let i = unit.ymax - 1; i > unit.ymin + 2; i--) {
        bp.addBelt(x, y, NORTH);
        y--;
    }

    bp.addSplitter(x - 0.5, y, NORTH);
    bp.addSplitter(x - 0.5, y - 2, NORTH);
    bp.addSplitter(x - 2.5, y - 2, NORTH);
    bp.addBelt(x, y - 1, NORTH);
    bp.addBelt(x - 1, y - 1, WEST);
    bp.addBelt(x - 2, y - 1, NORTH);


    bp.addTunnel(x - 1, y - 3, NORTH, INPUT);
    bp.addTunnel(x - 1, y - 9, NORTH, OUTPUT);
    bp.addTunnel(x, y - 3, NORTH, INPUT);
    bp.addTunnel(x, y - 7, NORTH, OUTPUT);
    bp.addTunnel(x - 3, y - 3, NORTH, INPUT);
    bp.addTunnel(x - 3, y - 5, NORTH, OUTPUT);
    bp.addBelt(x - 2, y - 3, NORTH);

    x -= 3;
    y -= 4;
    for (let i = 0; i < 7 * row; i++) {
        bp.addBelt(x - 2, y, WEST);
        bp.addBelt(x - 2, y - 2, WEST);
        bp.addBelt(x, y - 4, WEST);
        bp.addBelt(x, y - 6, WEST);
        x--;
    }

    bp.addBelt(x - 2, y, WEST);
    bp.addBelt(x, y - 4, WEST);

    for (let i = 0; i < (row * (unitHeight + 3) + 1); i++) {
        bp.addBelt(x - 3, y, NORTH);
        bp.addBelt(x - 2, y - 2, NORTH);
        bp.addBelt(x - 1, y - 4, NORTH);
        bp.addBelt(x, y - 6, NORTH);
        y--;
    }

    bp.addBelt(x - 3, y, NORTH);
    bp.addBelt(x - 3, y - 1, NORTH);
    bp.addTunnel(x - 3, y - 2, NORTH, INPUT);
    bp.addTunnel(x - 3, y - 7, NORTH, OUTPUT);
    bp.addBelt(x - 3, y - 8, NORTH);

    bp.addTunnel(x - 1, y - 4, NORTH, INPUT);
    bp.addTunnel(x - 1, y - 7, NORTH, OUTPUT);
    bp.addBelt(x - 1, y - 8, NORTH);
    bp.addBelt(x - 1, y - 9, NORTH);
    bp.addBelt(x - 1, y - 10, NORTH);

    for (let i = 1; i <= (bitmapHeight / 2); i++) {
        if (i === (bitmapHeight / 2)) {
            bp.addBelt(x - 3, y - 8 - i, WEST);
        } else {    
            bp.addBelt(x - 3, y - 8 - i, NORTH);
        }
        bp.addBelt(x - 1, y - 10 - i, NORTH);
    }

    bp.addBelt(x - 2, y - 2, NORTH);
    bp.addBelt(x - 2, y - 3, WEST);

    function generateMerge() {
        bp.addBelt(x - 3, y - 3, NORTH);
        bp.addBelt(x - 3, y - 4, WEST);
        bp.addBelt(x - 4, y - 4, WEST);
        bp.addBelt(x - 5, y - 4, WEST);

        bp.addBelt(x, y - 6, WEST);
        bp.addBelt(x - 1, y - 6, WEST);
        bp.addBelt(x - 2, y - 6, WEST);
        bp.addBelt(x - 3, y - 6, WEST);
        bp.addBelt(x - 4, y - 6, WEST);
        bp.addBelt(x - 5, y - 6, WEST);


        bp.addBelt(x - 6, y - 3, NORTH);
        bp.addBelt(x - 6, y - 4, NORTH);
        bp.addBelt(x - 6, y - 7, SOUTH);
        bp.addBelt(x - 6, y - 6, SOUTH);
        bp.addBelt(x - 6, y - 5, WEST);

        bp.addTunnel(x - 7, y - 5, WEST, INPUT);
        bp.addTunnel(x - 15, y - 5, WEST, OUTPUT);
        x -= 16;
        y -= 5;
        for (let i = 0; i < ((bitmapHeight / 2) - 1 - row); i++) {
            bp.addTunnel(x, y, WEST, INPUT);
            bp.addTunnel(x - 7, y, WEST, OUTPUT);
            x -= 8;
        }
    }

    let oldX = x;
    let oldY = y;
    generateMerge();

    for (let i = 0; i < 51; i++) {
        bp.addBelt(x, y, WEST);
        x--;
    }

    x = oldX - 1;
    y = oldY - 5 - bitmapHeight / 2;
    if ((bitmapHeight / 2) % 2 === 1) {
        y--;
    }
    generateMerge();

    for (let i = 0; i < 50; i++) {
        bp.addBelt(x, y, WEST);
        x--;
    }


    x = 1;
    y = 5 * row;

    for (let i = 0; i < 4 * ((bitmapHeight / 2) - row); i++) {
        bp.addBelt(x, y, WEST);
        bp.addBelt(x, y + 2, WEST);
        bp.addBelt(x, y + 4, WEST);
        x++;
    }

}

function createPrinter() {

    if (bitmapWidth == 0 || bitmapHeight == 0) return;
    
    let unit = createUnit(bitmapWidth);
    let printerUnit = createPrinterUnit(unit, bitmap[0]);
    let unitWidth = printerUnit.xmax - printerUnit.xmin + 1;
    let unitHeight = printerUnit.ymax - printerUnit.ymin + 1;
    console.log(unitWidth);
    console.log(unitHeight);

    let bp = new Blueprint("Belt Printer");

    for (let i = 0; i < (bitmapHeight / 2); i++) {
        addRow(bp, i, unit, unitWidth, unitHeight);
    }

    let bpString = bp.serialize();
    document.getElementById("blueprintOutput").value = bpString;
    document.getElementById("sizeDisplay").innerHTML = `${bpString.length} bytes`;

}