var demo = (function(api){

    window.onload = addClickListeners;
    function addClickListeners(){
        const actionMap = {
            addMap: () => api.addMap('n', '#mesh'),
            loadMap: () => api.loadMap('#mesh', 'map'),
            saveMap: () => api.saveMap(api._currentMap, 'map'),
            downloadMap: () => api.downloadMap(api._currentMap, 'map.json'),
            downloadPicture: () => api.downloadPicture('mesh', 'map.png'),
            colorMap: () => api.colorMap('#mesh', 'seaColor', 'landColorStart', 'landColorEnd')
        };
        const actions = document.getElementById('actions');
        // we loop through the actions' children, which is an array-like object
        for (let i =0; i< actions.children.length; i++){
            let c = actions.children[i];
            if(actionMap[c.id]){
                c.onclick = actionMap[c.id];
            }
        }
    }

    api.worker = new Worker('demo/worker.js');
    function setup(){
        api.maps = [];
        api.visited = [];
        api.maps.length = 8;
        api.visited.length = 8;
        resetMapCache();
        api.currentIndex = 0;
    }
    setup();
    function resetMapCache(){
        api.visited.fill(false);
        api.maps.fill(undefined);
    }
    api.worker.postMessage({n: api.n});

    // we find a suitable index in our map cache
    // update the map in there with the received rawMap
    // and if necessary, ask the worker for more maps
    api.worker.addEventListener('message', function(rawMap){
        let index = api.maps.findIndex(el => el === undefined);
        if(index === -1){
            index = api.visited.findIndex(el => el);
            if (index !== -1){
                api.maps[index] = JSON.parse(rawMap.data);
                api.visited[index] = false;
                if(api.visited.some(el => el)){
                    api.worker.postMessage({n: api.n});
                }
            }
        }
        else{
            api.maps[index] = JSON.parse(rawMap.data);
            if(api.maps.some(el => el === undefined)){
                api.worker.postMessage({n: api.n});
            }
        }
    }, false);
    return api;
}(demo || {}));
