gameLuckyCharm = false;
gameTime = 600;
gameLuck = 0.2 * Math.random() - 0.1 + (0.025 * gameLuckyCharm);
gameLuckLevel = 0;
collectTime = 700;
sleepTime = 2400;
rodCount = 20;
lightningRods = [];
struck = 0;
stormyDays = 0;
stormTomorrow = false;
batteryPacks = 0;

festivals = {
    '0,13': true,
    '0,24': true,
    '1,11': true,
    '1,28': true,
    '2,16': true,
    '2,27': true
};

function getTimeFromInput(name) {
    let value = document.getElementById(name).value;
    value = +value;
    value = 10 * Math.floor(value / 10);
    while (value % 100 >= 60) {
        value += 10;
    }
    if (value < 600) {
        value = 600;
    }
    if (value > 2600) {
        value = 2600;
    }
    document.getElementById(name).value = value;
    return value;
}

function getIntegerFromInput(name) {
    let value = document.getElementById(name).value;
    value = +value;
    value = Math.round(value);
    if (value < 0) {
        value = 0;
    }
    document.getElementById(name).value = value;
    return value;
}


function simulate(rods=null) {

    initialize(rods);

    let strikes = 0;
    let yearsWithStrike = 0;
    let seasonsWithStrike = 0;
    let daysWithStrike = 0;

    let strikeThisYear = false;
    let strikeThisSeason = false;

    let totalDays = Math.round(112 * getIntegerFromInput('years'));

    for (let date = 0; date < totalDays; date++) {

        if (date % 112 === 0) {
            strikeThisYear = false;
        }
        if (date % 28 === 0) {
            strikeThisSeason = false;
        }

        let daily = simulateDay(date);
        strikes += daily;
        if (daily > 0) {
            daysWithStrike++;
            if (!strikeThisYear) {
                yearsWithStrike++;
                strikeThisYear = true;
            }
            if (!strikeThisSeason) {
                seasonsWithStrike++;
                strikeThisSeason = true;
            }
        }
    }
    
    document.getElementById('totalStrikes').innerText = strikes;
    document.getElementById('batteriesPerYear').innerText = `${(batteryPacks / (totalDays / 112)).toFixed(6)}`;
    document.getElementById('strikesPerYear').innerText = `${(strikes / (totalDays / 112)).toFixed(6)}`;
    document.getElementById('strikesPerSeason').innerText = `${(strikes / (3 * totalDays / 112)).toFixed(6)}`;
    document.getElementById('strikesPerDay').innerText = `${(strikes / (totalDays)).toFixed(6)}`;
    document.getElementById('strikesPerStorm').innerText = `${(strikes / (stormyDays)).toFixed(6)}`;
    document.getElementById('stormsPerYear').innerText = `${(stormyDays / (totalDays / 112)).toFixed(6)}`;
    document.getElementById('percentYear').innerText = `${(100 * yearsWithStrike / (totalDays / 112)).toFixed(6)}%`;
    document.getElementById('percentSeason').innerText = `${(100 * seasonsWithStrike / (3 * totalDays / 112)).toFixed(6)}%`;
    document.getElementById('percentDay').innerText = `${(100 * daysWithStrike / (totalDays)).toFixed(6)}%`;
    document.getElementById('percentStrike').innerText = `${(100 * daysWithStrike / (stormyDays)).toFixed(6)}%`;
    document.getElementById('percentStorm').innerText = `${(100 * stormyDays / (totalDays)).toFixed(6)}%`;

}

function csv() {

    function getLine(numRods) {
        simulate(rods=numRods);
        let line = '';
        line += `${numRods},`;
        line += `${document.getElementById('totalStrikes').innerText},`;
        line += `${document.getElementById('batteriesPerYear').innerText},`;
        line += `${document.getElementById('strikesPerYear').innerText},`;
        line += `${document.getElementById('strikesPerSeason').innerText},`;
        line += `${document.getElementById('strikesPerDay').innerText},`;
        line += `${document.getElementById('strikesPerStorm').innerText},`;
        line += `${document.getElementById('stormsPerYear').innerText},`;
        line += `${document.getElementById('percentYear').innerText},`;
        line += `${document.getElementById('percentSeason').innerText},`;
        line += `${document.getElementById('percentDay').innerText},`;
        line += `${document.getElementById('percentStrike').innerText},`;
        line += `${document.getElementById('percentStorm').innerText}\n`;
        console.log(numRods);
        return line;
    }

    let output = '"Number of Lightning Rods","Total Number of Strikes","Expected Battery Packs per Year","Expected Strikes per Year","Expected Strikes per Season","Expected Strikes per Day","Expected Strikes per Storm","Expected Storms per Year","% of Years with a Strike","% of Seasons with a Strike","% of Days with a Strike","% of Storms with a Strike","% of Days with Storm"\n';

    for (let i = 0; i < 50; i++) {
        output += getLine(i);
    }
    for (let i = 50; i < 100; i += 5) {
        output += getLine(i);
    }
    for (let i = 100; i < 500; i += 50) {
        output += getLine(i);
    }
    for (let i = 500; i <= 1000; i += 100) {
        output += getLine(i);
    }

    document.getElementById('csv').innerText = output;

}

function initialize(rods=null) {
    gameLuckyCharm = document.getElementById('specialCharm').checked;
    sleepTime = getTimeFromInput('sleepTime');
    collectTime = getTimeFromInput('collectTime');
    if (rods == null) {
        rodCount = getIntegerFromInput('rods');
    } else {
        rodCount = rods;
    }
    lightningRods = [];
    for (let i = 0; i < rodCount; i++) {
        lightningRods.push(0);
    }
    stormyDays = 0;
    stormTomorrow = false;
    batteryPacks = 0;
}

function incrementTime() {
    gameTime += 10;
    if (gameTime % 100 === 60) {
        gameTime += 40;
    }
}

function simulateDay(date) {
    gameLuck = 0.2 * Math.random() - 0.1 + (0.025 * gameLuckyCharm);
    gameLuckLevel = 0;
    let struck = 0;
    let collected = false;

    let season = Math.floor((date % 112) / 28);
    let dayOfSeason = date % 28 + 1;

    let storm = false;

    if (season === 3) {
        storm = false;
    } else if (dayOfSeason === 1) {
        storm = false;
    } else if ((season === 1) && (dayOfSeason % 13 === 0)) {
        storm = true;
    } else if (festivals.hasOwnProperty(`${season},${dayOfSeason}`)) {
        storm = false;
    } else if (stormTomorrow) {
        storm = true;
    }

    stormTomorrow = false;
    let rainChance = 0.0;
    if (season === 1) {
        if (dayOfSeason > 1) {
            rainChance = 0.12 + dayOfSeason * 0.003;
        } else {
            rainChance = 0.0;
        }
    } else {
        rainChance = 0.183;
    }
    if (Math.random() < rainChance) {
        if ((season === 1) && (Math.random() < 0.85)) {
            stormTomorrow = true;
        } else if ((season < 3) && (Math.random() < 0.25) && (dayOfSeason > 2)) {
            stormTomorrow = true;
        }
    }

    if (storm) {
        stormyDays++;

        for (let i = 0; i < rodCount; i++) {
            if (lightningRods[i] === 1) {
                lightningRods[i] = 2;
            }
        }

        for (gameTime = 600; gameTime <= sleepTime; incrementTime()) {
            struck += updateLightning();
            if (!collected && (gameTime >= collectTime)) {
                for (let i = 0; i < rodCount; i++) {
                    if (lightningRods[i] === 2) {
                        lightningRods[i] = 0;
                        batteryPacks++;
                    }
                }
                collected = true;
            }
        }
        
        struck += lightningWhileSleeping();
    
    } else {
        for (let i = 0; i < rodCount; i++) {
            if (lightningRods[i] > 0) {
                lightningRods[i] = 0;
                batteryPacks++;
            }  
        }
    }

    return struck;
}

function updateLightning()
{
    if (Math.random() < 0.125 + gameLuck + gameLuckLevel / 100.0) {
        if (rodCount > 0) {
            for (let i = 0; i < 2; i++) {
                let idx = Math.floor(rodCount * Math.random());
                if (lightningRods[idx] === 0) {
                    lightningRods[idx] = 1;
                    return 0;
                }
            }
        }
        if (Math.random() < 0.25 - gameLuck - gameLuckLevel / 100.0) {
            return 1;
        }
    }
    else if (Math.random() < 0.1) {
        // do nothing
    }
    return 0;
}

function lightningWhileSleeping() {
    let struck = 0;
    let updates = Math.floor((2400 - gameTime) / 100);
    for (let i = 0; i < updates; i++)
    {
        struck += updateLightning();
    }
    return struck;
}