/* globals terrain */
self.importScripts('../dist/terrain.worker.min.js');

self.addEventListener('message', function(message){
    const {n, seedString} = message.data;
    self.postMessage(JSON.stringify(terrain.generateMap(n, null, false)));
}, false);
