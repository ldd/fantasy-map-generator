(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("d3-array"), require("d3-voronoi"), require("seedrandom"));
	else if(typeof define === 'function' && define.amd)
		define(["d3-array", "d3-voronoi", "seedrandom"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("d3-array"), require("d3-voronoi"), require("seedrandom")) : factory(root["d3-array"], root["d3-voronoi"], root["seedrandom"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_10__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__step1__ = __webpack_require__(2);
/* harmony export (immutable) */ __webpack_exports__["a"] = zero;
/* harmony export (immutable) */ __webpack_exports__["c"] = generateGoodMesh;
/* unused harmony export generateGoodPoints */
/* harmony export (immutable) */ __webpack_exports__["e"] = slope;
/* harmony export (immutable) */ __webpack_exports__["g"] = runif;
/* harmony export (immutable) */ __webpack_exports__["f"] = randomVector;
/* harmony export (immutable) */ __webpack_exports__["d"] = add;
/* harmony export (immutable) */ __webpack_exports__["b"] = isnearedge;


function zero(mesh) {
    var z = [];
    for (var i = 0; i < mesh.vxs.length; i++) {
        z[i] = 0;
    }
    z.mesh = mesh;
    return z;
}
function generateGoodMesh(n, extent) {
    extent = extent || __WEBPACK_IMPORTED_MODULE_0__step1__["a" /* defaultExtent */];
    var pts = generateGoodPoints(n, extent);
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__step1__["b" /* makeMesh */])(pts, extent);
}

function generateGoodPoints(n, extent) {
    extent = extent || __WEBPACK_IMPORTED_MODULE_0__step1__["a" /* defaultExtent */];
    var pts = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__step1__["c" /* generatePoints */])(n, extent);
    pts = pts.sort(function (a, b) {
        return a[0] - b[0];
    });
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__step1__["d" /* improvePoints */])(pts, 1, extent);
}
function slope(mesh, direction) {
    return mesh.map(function (x) {
        return x[0] * direction[0] + x[1] * direction[1];
    });
}
function runif(lo, hi) {
    return lo + Math.random() * (hi - lo);
}
const rnorm = (function () {
    var z2 = null;
    function rnorm() {
        if (z2 != null) {
            var tmp = z2;
            z2 = null;
            return tmp;
        }
        var x1 = 0;
        var x2 = 0;
        var w = 2.0;
        while (w >= 1) {
            x1 = runif(-1, 1);
            x2 = runif(-1, 1);
            w = x1 * x1 + x2 * x2;
        }
        w = Math.sqrt(-2 * Math.log(w) / w);
        z2 = x2 * w;
        return x1 * w;
    }
    return rnorm;
})();
/* unused harmony export rnorm */

function randomVector(scale) {
    return [scale * rnorm(), scale * rnorm()];
}
function add() {
    var n = arguments[0].length;
    var newvals = zero(arguments[0].mesh);
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < arguments.length; j++) {
            newvals[i] += arguments[j][i];
        }
    }
    return newvals;
}

function isnearedge(mesh, i) {
    var x = mesh.vxs[i][0];
    var y = mesh.vxs[i][1];
    var w = mesh.extent.width;
    var h = mesh.extent.height;
    return x < -0.45 * w || x > 0.45 * w || y < -0.45 * h || y > 0.45 * h;
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_array__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_d3_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__step2__ = __webpack_require__(0);
/* harmony export (immutable) */ __webpack_exports__["d"] = cone;
/* harmony export (immutable) */ __webpack_exports__["e"] = mountains;
/* harmony export (immutable) */ __webpack_exports__["f"] = peaky;
/* harmony export (immutable) */ __webpack_exports__["c"] = neighbours;
/* harmony export (immutable) */ __webpack_exports__["b"] = fillSinks;
/* harmony export (immutable) */ __webpack_exports__["a"] = setSeaLevel;




function cone(mesh, slope) {
    return mesh.map(function (x) {
        return Math.pow(x[0] * x[0] + x[1] * x[1], 0.5) * slope;
    });
}
function mountains(mesh, n, r) {
    r = r || 0.05;
    var mounts = [];
    for (var i = 0; i < n; i++) {
        mounts.push([mesh.extent.width * (Math.random() - 0.5), mesh.extent.height * (Math.random() - 0.5)]);
    }
    var newvals = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__step2__["a" /* zero */])(mesh);
    for (var i = 0; i < mesh.vxs.length; i++) {
        var p = mesh.vxs[i];
        for (var j = 0; j < n; j++) {
            var m = mounts[j];
            newvals[i] += Math.exp(-((p[0] - m[0]) * (p[0] - m[0]) + (p[1] - m[1]) * (p[1] - m[1])) / (r * r));
        }
    }
    return newvals;
}
function map(h, f) {
    var newh = h.map(f);
    newh.mesh = h.mesh;
    return newh;
}

function normalize(h) {
    var lo = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_array__["min"])(h);
    var hi = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_array__["max"])(h);
    return map(h, function (x) {return (x - lo) / (hi - lo)});
}
function peaky(h) {
    return map(normalize(h), Math.sqrt);
}
function neighbours(mesh, i) {
    var onbs = mesh.adj[i];
    var nbs = [];
    for (var i = 0; i < onbs.length; i++) {
        nbs.push(onbs[i]);
    }
    return nbs;
}
function fillSinks(h, epsilon) {
    epsilon = epsilon || 1e-5;
    var infinity = 999999;
    var newh = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__step2__["a" /* zero */])(h.mesh);
    for (var i = 0; i < h.length; i++) {
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__step2__["b" /* isnearedge */])(h.mesh, i)) {
            newh[i] = h[i];
        } else {
            newh[i] = infinity;
        }
    }
    while (true) {
        var changed = false;
        for (var i = 0; i < h.length; i++) {
            if (newh[i] == h[i]) continue;
            var nbs = neighbours(h.mesh, i);
            for (var j = 0; j < nbs.length; j++) {
                if (h[i] >= newh[nbs[j]] + epsilon) {
                    newh[i] = h[i];
                    changed = true;
                    break;
                }
                var oh = newh[nbs[j]] + epsilon;
                if ((newh[i] > oh) && (oh > h[i])) {
                    newh[i] = oh;
                    changed = true;
                }
            }
        }
        if (!changed) return newh;
    }
}

function quantile(h, q) {
    var sortedh = [];
    for (var i = 0; i < h.length; i++) {
        sortedh[i] = h[i];
    }
    sortedh.sort(__WEBPACK_IMPORTED_MODULE_0_d3_array__["ascending"]);
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_array__["quantile"])(sortedh, q);
}
function setSeaLevel(h, q) {
    var newh = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__step2__["a" /* zero */])(h.mesh);
    var delta = quantile(h, q);
    for (var i = 0; i < h.length; i++) {
        newh[i] = h[i] - delta;
    }
    return newh;
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_voronoi__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_voronoi___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_d3_voronoi__);
/* harmony export (immutable) */ __webpack_exports__["c"] = generatePoints;
/* harmony export (immutable) */ __webpack_exports__["b"] = makeMesh;
/* harmony export (immutable) */ __webpack_exports__["d"] = improvePoints;


const defaultExtent = {width: 1, height: 1};
/* harmony export (immutable) */ __webpack_exports__["a"] = defaultExtent;


// code that exposes some functions goes here
function generatePoints(n, extent) {
    extent = extent || defaultExtent;
    var pts = [];
    for (var i = 0; i < n; i++) {
        pts.push([(Math.random() - 0.5) * extent.width, (Math.random() - 0.5) * extent.height]);
    }
    return pts;
}
function makeMesh(pts, extent) {
    extent = extent || defaultExtent;
    var vor = voronoi(pts, extent);
    var vxs = [];
    var vxids = {};
    var adj = [];
    var edges = [];
    var tris = [];
    for (var i = 0; i < vor.edges.length; i++) {
        var e = vor.edges[i];
        if (e == undefined) continue;
        var e0 = vxids[e[0]];
        var e1 = vxids[e[1]];
        if (e0 == undefined) {
            e0 = vxs.length;
            vxids[e[0]] = e0;
            vxs.push(e[0]);
        }
        if (e1 == undefined) {
            e1 = vxs.length;
            vxids[e[1]] = e1;
            vxs.push(e[1]);
        }
        adj[e0] = adj[e0] || [];
        adj[e0].push(e1);
        adj[e1] = adj[e1] || [];
        adj[e1].push(e0);
        edges.push([e0, e1, e.left, e.right]);
        tris[e0] = tris[e0] || [];
        if (!tris[e0].includes(e.left)) tris[e0].push(e.left);
        if (e.right && !tris[e0].includes(e.right)) tris[e0].push(e.right);
        tris[e1] = tris[e1] || [];
        if (!tris[e1].includes(e.left)) tris[e1].push(e.left);
        if (e.right && !tris[e1].includes(e.right)) tris[e1].push(e.right);
    }
    var mesh = {
        pts: pts,
        vor: vor,
        vxs: vxs,
        adj: adj,
        tris: tris,
        edges: edges,
        extent: extent
    };
    mesh.map = function (f) {
        var mapped = vxs.map(f);
        mapped.mesh = mesh;
        return mapped;
    };
    return mesh;
}

function voronoi(pts, extent) {
    extent = extent || defaultExtent;
    var w = extent.width/2;
    var h = extent.height/2;
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_voronoi__["voronoi"])().extent([[-w, -h], [w, h]])(pts);
}
function centroid(pts) {
    var x = 0;
    var y = 0;
    for (var i = 0; i < pts.length; i++) {
        x += pts[i][0];
        y += pts[i][1];
    }
    return [x/pts.length, y/pts.length];
}

function improvePoints(pts, n, extent) {
    n = n || 1;
    extent = extent || defaultExtent;
    for (var i = 0; i < n; i++) {
        pts = voronoi(pts, extent)
            .polygons(pts)
            .map(centroid);
    }
    return pts;
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__step2__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__step3__ = __webpack_require__(1);
/* harmony export (immutable) */ __webpack_exports__["b"] = downhill;
/* harmony export (immutable) */ __webpack_exports__["c"] = getFlux;
/* unused harmony export trislope */
/* harmony export (immutable) */ __webpack_exports__["a"] = erosionRate;



function isedge(mesh, i) {
    return (mesh.adj[i].length < 3);
}
function downhill(h) {
    if (h.downhill) return h.downhill;
    function downfrom(i) {
        if (isedge(h.mesh, i)) return -2;
        var best = -1;
        var besth = h[i];
        var nbs = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__step3__["c" /* neighbours */])(h.mesh, i);
        for (var j = 0; j < nbs.length; j++) {
            if (h[nbs[j]] < besth) {
                besth = h[nbs[j]];
                best = nbs[j];
            }
        }
        return best;
    }
    var downs = [];
    for (var i = 0; i < h.length; i++) {
        downs[i] = downfrom(i);
    }
    h.downhill = downs;
    return downs;
}
function getFlux(h) {
    var dh = downhill(h);
    var idxs = [];
    var flux = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__step2__["a" /* zero */])(h.mesh);
    for (var i = 0; i < h.length; i++) {
        idxs[i] = i;
        flux[i] = 1/h.length;
    }
    idxs.sort(function (a, b) {
        return h[b] - h[a];
    });
    for (var i = 0; i < h.length; i++) {
        var j = idxs[i];
        if (dh[j] >= 0) {
            flux[dh[j]] += flux[j];
        }
    }
    return flux;
}
function trislope(h, i) {
    var nbs = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__step3__["c" /* neighbours */])(h.mesh, i);
    if (nbs.length != 3) return [0, 0];
    var p0 = h.mesh.vxs[nbs[0]];
    var p1 = h.mesh.vxs[nbs[1]];
    var p2 = h.mesh.vxs[nbs[2]];

    var x1 = p1[0] - p0[0];
    var x2 = p2[0] - p0[0];
    var y1 = p1[1] - p0[1];
    var y2 = p2[1] - p0[1];

    var det = x1 * y2 - x2 * y1;
    var h1 = h[nbs[1]] - h[nbs[0]];
    var h2 = h[nbs[2]] - h[nbs[0]];

    return [(y2 * h1 - y1 * h2) / det,
        (-x2 * h1 + x1 * h2) / det];
}
function getSlope(h) {
    var dh = downhill(h);
    var slope = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__step2__["a" /* zero */])(h.mesh);
    for (var i = 0; i < h.length; i++) {
        var s = trislope(h, i);
        slope[i] = Math.sqrt(s[0] * s[0] + s[1] * s[1]);
    }
    return slope;
}
function erosionRate(h) {
    var flux = getFlux(h);
    var slope = getSlope(h);
    var newh = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__step2__["a" /* zero */])(h.mesh);
    for (var i = 0; i < h.length; i++) {
        var river = Math.sqrt(flux[i]) * slope[i];
        var creep = slope[i] * slope[i];
        var total = 1000 * river + creep;
        total = total > 200 ? 200 : total;
        newh[i] = total;
    }
    return newh;
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__step2__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__step4__ = __webpack_require__(3);
/* harmony export (immutable) */ __webpack_exports__["b"] = mergeSegments;
/* harmony export (immutable) */ __webpack_exports__["a"] = getRivers;



function mergeSegments(segs) {
    var adj = {};
    for (var i = 0; i < segs.length; i++) {
        var seg = segs[i];
        var a0 = adj[seg[0]] || [];
        var a1 = adj[seg[1]] || [];
        a0.push(seg[1]);
        a1.push(seg[0]);
        adj[seg[0]] = a0;
        adj[seg[1]] = a1;
    }
    var done = [];
    var paths = [];
    var path = null;
    while (true) {
        if (path == null) {
            for (var i = 0; i < segs.length; i++) {
                if (done[i]) continue;
                done[i] = true;
                path = [segs[i][0], segs[i][1]];
                break;
            }
            if (path == null) break;
        }
        var changed = false;
        for (var i = 0; i < segs.length; i++) {
            if (done[i]) continue;
            if (adj[path[0]].length == 2 && segs[i][0] == path[0]) {
                path.unshift(segs[i][1]);
            } else if (adj[path[0]].length == 2 && segs[i][1] == path[0]) {
                path.unshift(segs[i][0]);
            } else if (adj[path[path.length - 1]].length == 2 && segs[i][0] == path[path.length - 1]) {
                path.push(segs[i][1]);
            } else if (adj[path[path.length - 1]].length == 2 && segs[i][1] == path[path.length - 1]) {
                path.push(segs[i][0]);
            } else {
                continue;
            }
            done[i] = true;
            changed = true;
            break;
        }
        if (!changed) {
            paths.push(path);
            path = null;
        }
    }
    return paths;
}

function relaxPath(path) {
    var newpath = [path[0]];
    for (var i = 1; i < path.length - 1; i++) {
        var newpt = [0.25 * path[i-1][0] + 0.5 * path[i][0] + 0.25 * path[i+1][0],
            0.25 * path[i-1][1] + 0.5 * path[i][1] + 0.25 * path[i+1][1]];
        newpath.push(newpt);
    }
    newpath.push(path[path.length - 1]);
    return newpath;
}
function getRivers(h, limit) {
    var dh = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__step4__["b" /* downhill */])(h);
    var flux = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__step4__["c" /* getFlux */])(h);
    var links = [];
    var above = 0;
    for (var i = 0; i < h.length; i++) {
        if (h[i] > 0) above++;
    }
    limit *= above / h.length;
    for (var i = 0; i < dh.length; i++) {
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__step2__["b" /* isnearedge */])(h.mesh, i)) continue;
        if (flux[i] > limit && h[i] > 0 && dh[i] >= 0) {
            var up = h.mesh.vxs[i];
            var down = h.mesh.vxs[dh[i]];
            if (h[dh[i]] > 0) {
                links.push([up, down]);
            } else {
                links.push([up, [(up[0] + down[0])/2, (up[1] + down[1])/2]]);
            }
        }
    }
    return mergeSegments(links).map(relaxPath);
}


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_seedrandom_seedrandom__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_seedrandom_seedrandom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_seedrandom_seedrandom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__step1__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__step5__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__step6__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__step7__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__step3__ = __webpack_require__(1);
/* harmony export (immutable) */ __webpack_exports__["generateMap"] = generateMap;
/* harmony export (immutable) */ __webpack_exports__["erodeMap"] = erodeMap;







function seed(seedString, isUsingSeed){
    __WEBPACK_IMPORTED_MODULE_0_seedrandom_seedrandom___default()(seedString, {
        global: isUsingSeed
    });
}

function generateMap(n, seedString, isUsingSeed){
    n = n || Math.pow(2, 10);
    seedString = seedString || 'map';
   seed(seedString, isUsingSeed);

   var points = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__step5__["a" /* generateCoast */])({npts: n, extent: __WEBPACK_IMPORTED_MODULE_1__step1__["a" /* defaultExtent */]});
   return {
       points: points,
       coast: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__step7__["a" /* contour */])(points, 0),
       rivers: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__step6__["a" /* getRivers */])(points, 0.03),
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

function erodeMap(originalPoints, erosionRate, seaRate, coastRate){
    erosionRate = setDefault(erosionRate, 0.1);
    seaRate = setDefault(seaRate, 0.5);
    coastRate = setDefault(coastRate, 1);

    var points = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__step5__["b" /* doErosion */])(originalPoints, erosionRate);
    points= __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__step3__["a" /* setSeaLevel */])(points, seaRate);
    points= __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__step5__["c" /* cleanCoast */])(points, coastRate);
    points= __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__step3__["b" /* fillSinks */])(points);

    var coast = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__step7__["a" /* contour */])(points, 0);
    var rivers = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__step6__["a" /* getRivers */])(points, 0.01);
    return {
        points: points,
        coast: coast,
        rivers: rivers,
        mesh: points.mesh
    };
}


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__step2__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__step3__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__step4__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_d3_array__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_d3_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_d3_array__);
/* harmony export (immutable) */ __webpack_exports__["c"] = cleanCoast;
/* harmony export (immutable) */ __webpack_exports__["b"] = doErosion;
/* harmony export (immutable) */ __webpack_exports__["a"] = generateCoast;





function cleanCoast(h, iters) {
    for (var iter = 0; iter < iters; iter++) {
        var changed = 0;
        var newh = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__step2__["a" /* zero */])(h.mesh);
        for (var i = 0; i < h.length; i++) {
            newh[i] = h[i];
            var nbs = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__step3__["c" /* neighbours */])(h.mesh, i);
            if (h[i] <= 0 || nbs.length != 3) continue;
            var count = 0;
            var best = -999999;
            for (var j = 0; j < nbs.length; j++) {
                if (h[nbs[j]] > 0) {
                    count++;
                } else if (h[nbs[j]] > best) {
                    best = h[nbs[j]];
                }
            }
            if (count > 1) continue;
            newh[i] = best / 2;
            changed++;
        }
        h = newh;
        newh = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__step2__["a" /* zero */])(h.mesh);
        for (var i = 0; i < h.length; i++) {
            newh[i] = h[i];
            var nbs = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__step3__["c" /* neighbours */])(h.mesh, i);
            if (h[i] > 0 || nbs.length != 3) continue;
            var count = 0;
            var best = 999999;
            for (var j = 0; j < nbs.length; j++) {
                if (h[nbs[j]] <= 0) {
                    count++;
                } else if (h[nbs[j]] < best) {
                    best = h[nbs[j]];
                }
            }
            if (count > 1) continue;
            newh[i] = best / 2;
            changed++;
        }
        h = newh;
    }
    return h;
}
function relax(h) {
    var newh = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__step2__["a" /* zero */])(h.mesh);
    var innerFunction = function (j) {return h[j]};
    for (var i = 0; i < h.length; i++) {
        var nbs = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__step3__["c" /* neighbours */])(h.mesh, i);
        if (nbs.length < 3) {
            newh[i] = 0;
            continue;
        }
        newh[i] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_d3_array__["mean"])(nbs.map(innerFunction));
    }
    return newh;
}
function erode(h, amount) {
    var er = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__step4__["a" /* erosionRate */])(h);
    var newh = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__step2__["a" /* zero */])(h.mesh);
    var maxr = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_d3_array__["max"])(er);
    for (var i = 0; i < h.length; i++) {
        newh[i] = h[i] - amount * (er[i] / maxr);
    }
    return newh;
}
function doErosion(h, amount, n) {
    n = n || 1;
    h = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__step3__["b" /* fillSinks */])(h);
    for (var i = 0; i < n; i++) {
        h = erode(h, amount);
        h = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__step3__["b" /* fillSinks */])(h);
    }
    return h;
}
function generateCoast(params) {
    var mesh = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__step2__["c" /* generateGoodMesh */])(params.npts, params.extent);
    var h = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__step2__["d" /* add */])(
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__step2__["e" /* slope */])(mesh, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__step2__["f" /* randomVector */])(4)),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__step3__["d" /* cone */])(mesh, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__step2__["g" /* runif */])(-1, -1)),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__step3__["e" /* mountains */])(mesh, 50)
    );
    for (var i = 0; i < 10; i++) {
        h = relax(h);
    }
    h = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__step3__["f" /* peaky */])(h);
    h = doErosion(h, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__step2__["g" /* runif */])(0, 0.1), 5);
    h = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__step3__["a" /* setSeaLevel */])(h, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__step2__["g" /* runif */])(0.2, 0.6));
    h = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__step3__["b" /* fillSinks */])(h);
    h = cleanCoast(h, 3);
    return h;
}


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__step2__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__step6__ = __webpack_require__(4);
/* harmony export (immutable) */ __webpack_exports__["a"] = contour;



function contour(h, level) {
    level = level || 0;
    var edges = [];
    for (var i = 0; i < h.mesh.edges.length; i++) {
        var e = h.mesh.edges[i];
        if (e[3] == undefined) continue;
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__step2__["b" /* isnearedge */])(h.mesh, e[0]) || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__step2__["b" /* isnearedge */])(h.mesh, e[1])) continue;
        if ((h[e[0]] > level && h[e[1]] <= level) ||
            (h[e[1]] > level && h[e[0]] <= level)) {
            edges.push([e[2], e[3]]);
        }
    }
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__step6__["b" /* mergeSegments */])(edges);
}


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(6);


/***/ })
/******/ ]);
});
//# sourceMappingURL=main.js.map