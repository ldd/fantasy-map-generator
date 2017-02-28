/* globals d3,terrain,saveSvgAsPng */

var demo = (function(api){
    api._currentMap = null;
    api.n = Math.pow(2, 12);

    function makeMap(n){
        const nextIndex = (api.currentIndex + 1) % api.maps.length;
        if(api.maps[nextIndex]){
            api.visited[api.currentIndex] = true;
            api.worker.postMessage({n});
            api.currentIndex = nextIndex;
        }
        else{
            api.currentIndex = 0;
        }
        return api.maps[api.currentIndex];
    }
    api.addMap = function tacoMap(nId, svgId) {
        api._currentMap = api.maps[api.currentIndex];
        if(api._currentMap){
            api._currentMap.points.mesh = api._currentMap.mesh;
            const {points, coast, rivers} = api._currentMap;

            api.n = +document.getElementById(nId).value || api.n;
            // if old n and new n are different, you could potentially reset the cache here
            // resetMapCache();
            makeMap(api.n);
            const svg = d3.select(svgId);

            d3.selectAll('svg > *').remove();
            terrain.drawMap(svg, points, coast, rivers);
        }
    };

    api.loadMap = function loadMap(svgId, key){
        api._currentMap = JSON.parse(localStorage.getItem(key));
        api._currentMap.points.mesh = api._currentMap.mesh;
        const {points, coast, rivers} = api._currentMap;

        const svg = d3.select(svgId);
        terrain.drawMap(svg, points, coast, rivers);
    };

    api.saveMap = function saveMap(map, key){
        localStorage.setItem(key, JSON.stringify(map));
    };

    api.downloadMap = function downloadMap(text, name) {
        const a = document.createElement('a');
        const file = new Blob([text], {type: 'text/plain'});
        a.href = URL.createObjectURL(file);
        a.download = name;
        a.click();
    };

    api.downloadPicture = function downloadPicture(svgId, pictureName){
        saveSvgAsPng(document.getElementById(svgId), pictureName, {left: -500, top: -500});
    };

    api.colorMap = function colorMap(svgId, seaColorId, landColorStartId, landColorEndId){
        if(api._currentMap) {
            // make sure to match a map to what the terrain.colorMap expects
            api._currentMap.points.mesh = api._currentMap.mesh;

            const {points} = api._currentMap;

            // we get the svg, and the colors
            const svg = d3.select(svgId);
            const seaColor = document.getElementById(seaColorId).value;
            const landColorStart = document.getElementById(landColorStartId).value;
            const landColorEnd = document.getElementById(landColorEndId).value;

            // the normalized height goes from 0(low) to 1 (high).
            terrain.colorMap(svg, points, normalizedHeight => {
                if (normalizedHeight === 0) {
                    return seaColor;
                }
                else {
                    return d3.scaleLinear()
                        .range([landColorStart, landColorEnd])(normalizedHeight);
                }
            });
        }
    };
    return api;
}(demo || {}));

