var path = require('path');
var webpack = require('webpack');

module.exports = function (env) {
    env = env || {};
    var externals = {
        'd3': 'd3',
        'd3-voronoi': 'd3',
        'd3-array': 'd3'
    };
    var entryString = 'src/main.js';
    var outputFilename = 'terrain.min.js';
    if(env.webWorker){
        externals = {};
        entryString = 'src/terrain/terrain.js';
        outputFilename = 'terrain.worker.min.js';
    }
    console.log(externals, entryString);
    var definePlugin = new webpack.DefinePlugin({
        __DEV__: false
    });
    return {
        devtool: 'cheap-module-source-map',
        entry: {
            app: [path.resolve(__dirname, entryString)]
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            publicPath: './dist/',
            filename: outputFilename,
            library: 'terrain'
        },
        plugins: [
            definePlugin,
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            new webpack.optimize.UglifyJsPlugin({
                drop_console: true,
                sourceMap: false,
                minimize: true,
                output: {
                    comments: false
                },
                compress: {
                    warnings: false
                }
            })
        ],
        module: {
            loaders: [
                {
                    test: /\.js[x]?$/,
                    loader: 'babel-loader',
                    include: path.join(__dirname, 'src'),
                    query: {cacheDirectory: true}
                }
            ]
        },
        node: {
            fs: 'empty',
            net: 'empty',
            tls: 'empty',
            crypto: 'empty'
        },
        resolve: {
            extensions: ['.js']
        },
        externals: externals
    };
};
