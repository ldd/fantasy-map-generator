import {visualizeVoronoi, drawPaths, visualizeSlopes} from './view';
import {scaleLinear} from 'd3';

function colorFn(value){
    if(value === 0){
        return '#1E3167';
    }
    else{
        return scaleLinear()
            .range(['#d79d56', '#ca852f'])(value);
    }
}

export function drawMap(canvas, points, coast, rivers){
    drawPaths(canvas, 'coast', coast);
    drawPaths(canvas, 'river', rivers);
    visualizeSlopes(canvas, {h: points});
}

export function colorMap(canvas, points, pColorFn){
    visualizeVoronoi(canvas, points, 0, undefined, pColorFn || colorFn);
}
