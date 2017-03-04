/* globals d3,terrain,saveSvgAsPng */

var demo = (function(api){
    api.parseNumber = function parseNumber(n){
        // attempt to evaluate n in the form 'n^m'
        if(isNaN(n)){
            n = n.split('^').reduce((a, b) => Math.pow(a, b));
        }
        // either n is an actual number now, so return it
        // or it is not, so return a default value
        return isNaN(n)? api.n: (+n);
    };

    return api;
}(demo || {}));

