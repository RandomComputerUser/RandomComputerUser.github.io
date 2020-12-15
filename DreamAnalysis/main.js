totalEl = document.getElementById('totalTrials');
avgEl = document.getElementById('meanPearls');
maxEl = document.getElementById('maxPearls');

TRIAL_SIZE = 262;
THRESHOLD = 42;
PROBABILITY = 20/423;

distribution = [];
distEl = [];
for (let i = 0; i <= TRIAL_SIZE; i++) {
    distribution.push(0n);
    let el = document.createElement('span');
    if (i < 10) {
        el.innerText = `${i} ..... `;
    } else if (i < 100) {
        el.innerText = `${i} .... `;
    } else {
        el.innerText = `${i} ... `;
    }

    document.body.appendChild(el);
    el = document.createElement('span');
    document.body.appendChild(el);
    distEl.push(el);
    document.body.appendChild(document.createElement('br'));
}

threads = 4;
try {
    threads = navigator.hardwareConcurrency;
    if (threads == null) {
        threads = 4;
    }
} catch (error) {

}

document.getElementById('threads').innerText = `${threads}`;

workers = [];

for (let i = 0; i < threads; i++) {
    let worker = new Worker('worker.js');
    worker.addEventListener('message', updateDistribution);
    worker.postMessage(distribution);
    workers.push(worker);
}

function trial() {
    let pearls = 0;
    for (let i = 0; i < TRIAL_SIZE; i++) {
        pearls += (Math.random() < PROBABILITY);
    }
    return pearls;
}

function simulateForTime(time) {
    let finalTime = Date.now() + time;
    do {
        let batchPearls = 0;
        for (let i = 0; i < 1000; i++) {
            let pearls = trial();
            batchPearls += pearls;
            distribution[pearls]++;
        }
        trials += 1000n;
        totalPearls += BigInt(batchPearls);
    } while (Date.now() < finalTime);
}


function updateDisplay() {

    /*
    let numTrials = 0n;
    maxPearls = 0;
    for (let i = TRIAL_SIZE; i >= 0; i--) {
        if (maxPearls === 0 && distribution[i] > 0) {
            maxPearls = i;
        }
        numTrials += distribution[i];
        distEl[i].innerText = `${numTrials}`;
    }
    */

    let numTrials = 0n;
    let maxPearls = 0;
    let totalPearls = 0n;
    for (let i = TRIAL_SIZE; i >= 0; i--) {
        if (maxPearls === 0 && distribution[i] > 0) {
            maxPearls = i;
        }
        numTrials += distribution[i];
        totalPearls += BigInt(i) * distribution[i];
        distEl[i].innerText = `${numTrials}`;
    }

    totalEl.innerText = `${numTrials}`;
    avgEl.innerText = `${(Number(totalPearls) / Number(numTrials)).toFixed(2)}`;
    maxEl.innerText = `${maxPearls}`;
}

function updateDistribution(e) {
    workerData = e.data;
    for (let i = 0; i <= workerData[workerData.length - 1]; i++) {
        distribution[i] += BigInt(workerData[i]);
    }
}


function run() {
    updateDisplay();
}

setInterval(run, 1000/60);
