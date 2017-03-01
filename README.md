terrain.js
=============

Minimal JavaScript fantasy map generator.

Author: Leonardo FLorez

Can be used as a plain script, or a Node.js module.


Script tag usage
----------------
In the browser, include `d3` and `terrain.min.js`:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/4.5.0/d3.min.js">
</script>
<script src="terrain.min.js">
</script>
```

Optionally, a web worker may include `terrain.worker.min.js`, which attempts to be as tiny as possible, and does not include drawing functions (`drawMap`, `colorMap`)

```js
// Generate a Map.
// terrain.generateMap(numberOfPoints, seedString, useSeed);
var aMap = terrain.generateMap(512, 'map!', false);

// Draw a map to a svg element.
// terrain.drawMap(svgElement, points, coast, rivers);
var svgElement = d3.select('#mesh');
terrain.drawMap(svgElement, aMap.points, aMap.coast, aMap.rivers);

// Color a map inside a svg element.
// terrain.drawMap(svgElement, points, colorFn);
terrain.colorMap(svgElement, aMap.points, function(normalizedHeight){
    return 'gray';
});
```

Node.js usage
-------------

```
npm install fantasy-map-generator
```

```js
// Generate a Map.
var terrain = require('fantasy-map-generator');
terrain.generateMap(512, 'map!', false);
```

Version notes
-------------

* Version 0.0.2 
  * Add getting svg example in the `README`
  * Save to png in the demo (`gh-pages` branch)
  * Add `web` and `webWorker` builds (`npm-module` branch)

* Version 0.0.1 initial release
 
License: MIT

Copyright 2017 Leonardo Florez.