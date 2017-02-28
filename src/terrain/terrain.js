import seedrandom from 'seedrandom/seedrandom';
import {defaultExtent} from './step1';
import {generateCoast, doErosion, cleanCoast} from './step5';
import {getRivers} from './step6';
import {contour} from './step7';
import {setSeaLevel, fillSinks} from './step3';

function seed(seedString, isUsingSeed){
    seedrandom(seedString, {
        global: isUsingSeed
    });
}

export function generateMap(n, seedString, isUsingSeed){
    n = n || Math.pow(2, 10);
    seedString = seedString || 'map';
   seed(seedString, isUsingSeed);

   var points = generateCoast({npts: n, extent: defaultExtent});
   return {
       points: points,
       coast: contour(points, 0),
       rivers: getRivers(points, 0.03),
       mesh: points.mesh
   };
}

function setDefault(value, defaultValue){
    if(value === undefined || value === null){
        return defaultValue;
    }
    else{
        return value;
    }
}

export function erodeMap(originalPoints, erosionRate, seaRate, coastRate){
    erosionRate = setDefault(erosionRate, 0.1);
    seaRate = setDefault(seaRate, 0.5);
    coastRate = setDefault(coastRate, 1);

    var points = doErosion(originalPoints, erosionRate);
    points= setSeaLevel(points, seaRate);
    points= cleanCoast(points, coastRate);
    points= fillSinks(points);

    var coast = contour(points, 0);
    var rivers = getRivers(points, 0.01);
    return {
        points: points,
        coast: coast,
        rivers: rivers,
        mesh: points.mesh
    };
}
