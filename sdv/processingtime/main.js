MINUTES_IN_DAY = 20 * 60 + 4 * 100; // 100 minutes pass for each hour from 2 AM - 6 AM
MINUTES_AWAKE = 20 * 60;

VALID_OBJECTS = new Set();

(function () {
    let valid = [
        "Bee House",
        "Cask",
        "Cheese Press",
        "Keg",
        "Loom",
        "Mayonnaise Machine",
        "Oil Maker",
        "Preserves Jar",
        "Fish Smoker",
        "Dehydrator",

        "Charcoal Kiln",
        "Crystalarium",
        "Furnace",
        "Heavy Furnace",
        "Lightning Rod",
        "Solar Panel",
        "Recycling Machine",
        "Seed Maker",
        "Slime Incubator",
        "Ostrich Incubator",
        "Slime Egg-Press",
        "Tapper",
        "Heavy Tapper",
        "Worm Bin",
        "Deluxe Worm Bin",
        "Bone Mill",
        "Geode Crusher",
        "Mushroom Log",
        "Bait Maker",
    ];
    for (let i = 0; i < valid.length; i++) {
        VALID_OBJECTS.add(valid[i]);
    }
})();

function openSave() {
    var reader = new FileReader();
    reader.onload = function () {
        analyzeData(reader.result);
    };

    let file = document.getElementById("saveInput").files[0];
    document.getElementById("fileDisplay").innerHTML = file.name;

    reader.readAsText(file);
}

function analyzeData(data) {
    data = xmlToJson(parseXml(data));

    gameDate = 112 * (data.SaveGame.year - 1);
    let season = ("" + data.SaveGame.currentSeason).toLowerCase();
    if (season === "spring") {
        gameDate += 0 * 28;
    } else if (season === "summer") {
        gameDate += 1 * 28;
    } else if (season === "fall") {
        gameDate += 2 * 28;
    } else {
        gameDate += 3 * 28;
    }
    gameDate += data.SaveGame.dayOfMonth - 1;

    let objects = getAllObjects(data);
    // console.log(objects);

    let toProcess = [];

    for (let i = 0; i < objects.length; i++) {
        let processing = getProcessingTime(objects[i]);
        if (processing != null) {
            toProcess.push(processing);
        }
    }

    toProcess.sort(compareObjects);

    // console.log(toProcess);

    dataToDisplay = generateSummary(toProcess, gameDate);

    setDisplay(dataToDisplay, document.getElementById("mainDisplay"));
}

function getProcessingTime(obj, gameDate) {
    let contents = obj.heldObject;
    if (contents == null) return null;
    let objName = getName(obj);
    if (objName == null) return null;
    if (!VALID_OBJECTS.has(objName)) return null;
    let contentsName = getName(contents);
    if (contentsName == null) return null;

    let timeUntilReady = null;
    if (obj.daysToMature != null) {
        timeUntilReady = MINUTES_IN_DAY * obj.daysToMature;
    } else if (obj.minutesUntilReady != null) {
        timeUntilReady = obj.minutesUntilReady;
    }

    if (timeUntilReady == null) {
        return null;
    }

    if (timeUntilReady % MINUTES_IN_DAY >= MINUTES_AWAKE) {
        timeUntilReady =
            MINUTES_IN_DAY * Math.floor(timeUntilReady / MINUTES_IN_DAY) + MINUTES_AWAKE;
    }

    return {
        name: objName,
        contents: contentsName,
        time: timeUntilReady,
    };
}

function getDateString(currentDate, gameDate) {
    let year = Math.floor(currentDate / 112) + 1;
    currentDay = currentDate % 112;
    let season = ["Spring", "Summer", "Fall", "Winter"][Math.floor(currentDay / 28)];
    let day = (currentDay % 28) + 1;

    let extraString = "(today)";
    if (currentDate > gameDate) {
        if (currentDate - gameDate === 1) {
            extraString = `(in 1 day)`;
        } else {
            extraString = `(in ${currentDate - gameDate} days)`;
        }
    } else if (currentDate < gameDate) {
        if (gameDate - currentDate === 1) {
            extraString = `(1 day ago)`;
        } else {
            extraString = `(${gameDate - currentDate} days ago)`;
        }
    }

    return `${season} ${day}, Year ${year} ${extraString}`;
}

function getTimeString(time) {
    time = time % MINUTES_IN_DAY;
    time = Math.round(time / 10);

    if (time >= 20 * 6) {
        return "After 2:00 AM";
    }

    let hour = [
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "1",
    ][Math.floor(time / 6)];
    let minute = `${Math.min(time % 6, 5)}0`;
    let ampm = [
        "A",
        "A",
        "A",
        "A",
        "A",
        "A",
        "P",
        "P",
        "P",
        "P",
        "P",
        "P",
        "P",
        "P",
        "P",
        "P",
        "P",
        "P",
        "A",
        "A",
    ][Math.floor(time / 6)];
    return `${hour}:${minute} ${ampm}M`;
}

function compareObjects(a, b) {
    if (a.time < b.time) {
        return -1;
    }

    if (a.time > b.time) {
        return 1;
    }

    if (a.name < b.name) {
        return -1;
    }

    if (a.name > b.name) {
        return 1;
    }

    if (a.contents < b.contents) {
        return -1;
    }

    return 1;
}

function getName(thing) {
    return thing.DisplayName || thing.Name || thing.name || null;
}

function generateSummary(data, gameDate) {
    if (data.length < 1) {
        return [];
    }

    let summary = [];

    let currentDay = [];
    let currentMinute = [];
    let currentTime = data[0].time;
    let currentDateOffset = Math.floor(data[0].time / MINUTES_IN_DAY);

    let currentSequence = {
        name: "",
        contents: "",
        time: "",
        number: 0,
    };

    for (let i = 0; i < data.length; i++) {
        let item = data[i];

        let itemOffset = Math.floor(item.time / MINUTES_IN_DAY);

        if (item.time > currentTime) {
            if (currentSequence.number > 0) {
                currentMinute.push(sequenceToLine(currentSequence));
            }
            if (currentMinute.length > 0) {
                currentDay.push({
                    titleSmall: getTimeString(currentTime),
                    data: currentMinute,
                });
            }
            currentTime = item.time;
            currentMinute = [];

            currentSequence = {
                name: "",
                contents: "",
                time: "",
                number: 0,
            };
        }

        if (itemOffset > currentDateOffset) {
            if (currentDay.length > 0) {
                summary.push({
                    title: getDateString(currentDateOffset + gameDate, gameDate),
                    data: currentDay,
                });
            }
            currentDateOffset = itemOffset;
            currentDay = [];
        }

        if (
            item.name === currentSequence.name &&
            item.contents === currentSequence.contents &&
            item.time === currentSequence.time
        ) {
            currentSequence.number++;
        } else {
            if (currentSequence.number > 0) {
                currentMinute.push(sequenceToLine(currentSequence));
            }
            currentSequence = {
                name: item.name,
                contents: item.contents,
                time: item.time,
                number: 1,
            };
        }
    }

    if (currentSequence.number > 0) {
        currentMinute.push(sequenceToLine(currentSequence));
    }
    if (currentMinute.length > 0) {
        currentDay.push({
            titleSmall: getTimeString(currentTime),
            data: currentMinute,
        });
    }
    if (currentDay.length > 0) {
        summary.push({
            title: getDateString(currentDateOffset + gameDate, gameDate),
            data: currentDay,
        });
    }

    return summary;

    function sequenceToLine(seq) {
        return `<span style="font-weight:bold">${seq.number}x</span>&#09;${seq.name} (${seq.contents})<span>`;
    }
}

function setDisplay(data, displayEl) {
    displayEl.innerHTML = "";

    if (data.length < 1) {
        displayEl.innerHTML = "Nothing found";
        return;
    }

    if (typeof data[0] === "string") {
        let list = document.createElement("ul");

        for (let i = 0; i < data.length; i++) {
            let item = document.createElement("li");
            item.classList.add("disable-calt");
            item.innerHTML = data[i];
            list.appendChild(item);
        }

        displayEl.appendChild(list);
    } else if (typeof data[0] === "object" && !Array.isArray(data[0])) {
        for (let i = 0; i < data.length; i++) {
            let item = data[i];

            if (item.hasOwnProperty("title")) {
                let header = document.createElement("h5");
                header.innerText = item.title;
                displayEl.appendChild(header);
            }

            if (item.hasOwnProperty("titleSmall")) {
                let header = document.createElement("h6");
                header.innerText = item.titleSmall;
                displayEl.appendChild(header);
            }

            if (item.hasOwnProperty("data")) {
                let contentEl = document.createElement("div");
                contentEl.className = "display";
                setDisplay(item.data, contentEl);
                displayEl.appendChild(contentEl);
            }
        }
    }
}

function parseXml(textData) {
    return new DOMParser().parseFromString(textData, "text/xml");
}

function xmlToJson(xmlData) {
    if (xmlData.childNodes.length === 1 && xmlData.childNodes[0].nodeName === "#text") {
        const value = xmlData.childNodes[0].data;

        if (value === "false") {
            return false;
        } else if (value === "true") {
            return true;
        } else if (value === "null") {
            return null;
        }

        if (isNaN(+value)) {
            return value;
        } else {
            return +value;
        }
    }

    const elements = {};
    const children = xmlData.childNodes;
    for (let i = 0; i < children.length; i++) {
        var node = children[i];
        var name = node.nodeName;
        if (elements[name] === void 0) {
            elements[name] = xmlToJson(node);
        } else if (Array.isArray(elements[name])) {
            elements[name].push(xmlToJson(node));
        } else {
            elements[name] = [elements[name], xmlToJson(node)];
        }
    }

    const elementNames = Object.keys(elements);

    for (let i = 0; i < elementNames.length; i++) {
        child = elements[elementNames[i]];
        if (Array.isArray(child)) {
            var isObject = true;
            var isMap = true;
            for (let j = 0; j < child.length && isMap; j++) {
                var element = child[j];
                if (typeof element === "object") {
                    var keys = Object.keys(element);
                    if (
                        keys.length !== 2 ||
                        (keys[0] !== "key" && keys[0] !== "value") ||
                        (keys[1] !== "key" && keys[1] !== "value")
                    ) {
                        isMap = false;
                        isObject = false;
                    } else if (typeof element.key === "object") {
                        isObject = false;
                    }
                } else {
                    isMap = false;
                    isObject = false;
                }
            }

            if (isObject) {
                var newChild = {};
                for (let j = 0; j < child.length; j++) {
                    newChild[child[j].key] = child[j].value;
                }
                elements[elementNames[i]] = newChild;
            } else if (isMap) {
                var newChild = new Map();
                for (let j = 0; j < child.length; j++) {
                    newChild.set(child[j].key, child[j].value);
                }
                elements[elementNames[i]] = newChild;
            }
        }
    }

    if (elementNames.length === 1) {
        var name = elementNames[0];
        const primitiveNames = {
            boolean: true,
            float: true,
            int: true,
            number: true,
            string: true,
        };

        const arrayNames = {
            ArrayOfBoolean: true,
            ArrayOfInt: true,
            item: true,
        };

        if (primitiveNames[name] !== void 0 || arrayNames[name] !== void 0) {
            return elements[name];
        }
    }

    return elements;
}

function getAllObjects(data) {
    if (typeof data === "object" && data !== null) {
        var objects = [data];
        if (data instanceof Map) {
            data = Array.from(data.values());
        } else if (!Array.isArray(data)) {
            data = Object.values(data);
        }
        for (let i = 0; i < data.length; i++) {
            objects = objects.concat(getAllObjects(data[i]));
        }
        return objects;
    } else {
        return [];
    }
}
