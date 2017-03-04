/* globals d3,terrain,noise */

var demo = (function(api){
    var midPoint = ([x1, y1], [x2, y2]) => [(x1 + x2) / 2, (y1 + y2) / 2];
    var addMidpoints = arr => {
        var tempArr = [];
        for(var i = 0; i < arr.length * 2 - 1; i++){
            tempArr[i] = (i % 2) === 0 ? arr[i / 2] : midPoint(arr[~~(i / 2)], arr[~~(i / 2) + 1]);
        }
        return tempArr;
    };
    var noiseByOctave = (x, y, {frequency = 100, amplitude = 0.01, octaves = 3, persistence = 0.25}) => {
        var total = 0;
        for (var i = 0; i < octaves; i++){
            total += noise.perlin2(x * frequency, y * frequency) * amplitude;
            amplitude *= persistence;
            frequency *= 2;
        }
        return total;
    };
    api.addNoiseToCoast = function addNoiseToCoast(svgId, coast, noiseOptions){
        var canvas = d3.select(svgId);
        var extendedCoast = coast.map(addMidpoints).map(addMidpoints);

        terrain.drawPaths(canvas, 'coast', extendedCoast.map(el => el.map((l, i) => [
            l[0],
            l[1] + noiseByOctave(l[0], l[1], noiseOptions || {})
        ])));
    };
    api.parseNumber = function parseNumber(n){
        // attempt to evaluate n in the form 'n^m'
        if(isNaN(n)){
            n = n.split('^').reduce((a, b) => Math.pow(a, b));
        }
        // either n is an actual number now, so return it
        // or it is not, so return a default value
        return isNaN(n) ? api.n : (+n);
    };

    return api;
}(demo || {}));

