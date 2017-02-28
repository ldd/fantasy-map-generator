var path = require('path');
var webpack = require('webpack');

var definePlugin = new webpack.DefinePlugin({
    __DEV__: false
});

module.exports = {
    devtool: 'source-map',
    entry: {
        app: [path.resolve(__dirname, 'src/terrain/terrain.js')]
    },
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: './dist/',
        filename: 'main.js',
        libraryTarget: 'umd'
    },
    plugins: [
        definePlugin,
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],
    module: {
    },
    resolve: {
        extensions: ['.js']
    },
    externals: {
        'd3-voronoi': 'd3-voronoi',
        'd3-array': 'd3-array',
        'seedrandom/seedrandom': 'seedrandom'
    }
};
