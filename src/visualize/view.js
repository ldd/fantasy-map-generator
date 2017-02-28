import {min, max} from 'd3-array';
import {path as d3Path, select} from 'd3';

import {add, generateGoodMesh, isnearedge, randomVector, runif, slope, rnorm} from '../terrain/step2';
import {cone, fillSinks, mountains, neighbours, peaky, setSeaLevel} from '../terrain/step3';
import {trislope} from '../terrain/step4';
import {contour} from '../terrain/step7';

// api.showImprovedPoints = function(){
//     api.meshPts = api.generatePoints(512);
//     // api.meshVxs = makeMesh(meshPts).vxs;
//     api.meshPts = api.improvePoints(api.meshPts);
//     visualizePoints(select('#mesh'), api.meshPts)
// };

// const addRandomSlope = (terrain, points) => {
//     points = terrain.add(points, terrain.slope(points.mesh, terrain.randomVector(4)));
//     terrain.visualizeVoronoi(select('#mesh'), points, -1, 1);
//     terrain.drawPaths(select('#mesh'), 'coast', terrain.contour(points, 0));
// };

function generateUneroded() {
    var mesh = generateGoodMesh(4096);
    var h = add(slope(mesh, randomVector(4)),
        cone(mesh, runif(-1, 1)),
        mountains(mesh, 50));
    h = peaky(h);
    h = fillSinks(h);
    h = setSeaLevel(h, 0.5);
    return h;
}

export function drawErode() {
    var points = generateUneroded();
    // visualizeVoronoi(erodeSVG, erosionRate(erodeH));
    visualizeVoronoi(select('#mesh'), points, 0, 1);
    drawPaths(select('#mesh'), 'coast', contour(points, 0));
}

export function visualizeSlopes(svg, render) {
    var h = render.h;
    var strokes = [];
    var r = 0.25 / Math.sqrt(h.length);
    for (var i = 0; i < h.length; i++) {
        if (h[i] <= 0 || isnearedge(h.mesh, i)) continue;
        var nbs = neighbours(h.mesh, i);
        nbs.push(i);
        var s = 0;
        var s2 = 0;
        for (var j = 0; j < nbs.length; j++) {
            var slopes = trislope(h, nbs[j]);
            s += slopes[0] / 10;
            s2 += slopes[1];
        }
        s /= nbs.length;
        s2 /= nbs.length;
        if (Math.abs(s) < runif(0.1, 0.4)) continue;
        var l = r * runif(1, 2) * (1 - 0.2 * Math.pow(Math.atan(s), 2)) * Math.exp(s2/100);
        var x = h.mesh.vxs[i][0];
        var y = h.mesh.vxs[i][1];
        if (Math.abs(l*s) > 2 * r) {
            var n = Math.floor(Math.abs(l*s/r));
            l /= n;
            if (n > 4) n = 4;
            for (var k = 0; k < n; k++) {
                var u = rnorm() * r;
                var v = rnorm() * r;
                strokes.push([[x+u-l, y+v+l*s], [x+u+l, y+v-l*s]]);
            }
        } else {
            strokes.push([[x-l, y+l*s], [x+l, y-l*s]]);
        }
    }
    var lines = svg.selectAll('line.slope').data(strokes);
    lines.enter()
        .append('line')
        .classed('slope', true);
    lines.exit()
        .remove();
    svg.selectAll('line.slope')
        .attr('x1', function (d) { return 1000*d[0][0] })
        .attr('y1', function (d) { return 1000*d[0][1] })
        .attr('x2', function (d) { return 1000*d[1][0] })
        .attr('y2', function (d) { return 1000*d[1][1] })
}

function makeD3Path (path) {
    var p = d3Path();
    p.moveTo(1000*path[0][0], 1000*path[0][1]);
    for (var i = 1; i < path.length; i++) {
        p.lineTo(1000*path[i][0], 1000*path[i][1]);
    }
    return p.toString();
}

export function visualizeVoronoi(svg, field, lo, hi, colorFn) {
    if (hi === undefined) hi = max(field) + 1e-9;
    if (lo === undefined) lo = min(field) - 1e-9;
    var mappedvals = field.map(function (x) { return x > hi ? 1 : x < lo ? 0 : (x - lo) / (hi - lo) });
    var tris = svg.selectAll('path.field').data(field.mesh.tris);
    tris.enter()
        .append('path')
        .classed('field', true);

    tris.exit()
        .remove();

    svg.selectAll('path.field')
        .attr('d', makeD3Path)
        .style('fill-opacity', '0.85')
        .style('fill', function (_, i) {
            return colorFn(mappedvals[i]);
        })
    ;
}

export function drawPaths(svg, cls, paths) {
    var svgPaths = svg.selectAll('path.' + cls).data(paths);
    svgPaths.enter()
        .append('path')
        .classed(cls, true);
    svgPaths.exit()
        .remove();
    svg.selectAll('path.' + cls)
        .attr('d', makeD3Path);
}
