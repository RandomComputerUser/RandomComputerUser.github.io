function trial() {
    let pearls = 0;
    for (let i = 0; i < 262; i++) {
        pearls += (Math.random() < 20/423);
    }
    return pearls;
}

onmessage = function(e) {
    while (true) {
        let dist = [];
        for (let i = 0; i <= 262; i++) {
            dist.push(0);
        }
        for (let i = 0; i < 10000; i++) {
            dist[trial()]++;
        }
        self.postMessage(dist);
    }
}