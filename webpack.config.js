/* eslint-env node */
var path = require('path');
var webpack = require('webpack');

var definePlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true'))
});

module.exports = {
    entry: {
        app: [path.resolve(__dirname, 'src/main.js')]
    },
    devtool: 'cheap-source-map',
    output: {
        pathinfo: true,
        path: path.resolve(__dirname, 'dist'),
        publicPath: './dist/',
        filename: 'terrain.min.js',
        library: 'terrain'
    },
    watch: true,
    plugins: [definePlugin],
    module: {
        rules: [
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
    externals: {
        'd3': 'd3',
        'd3-voronoi': 'd3',
        'd3-array': 'd3'
    }
};
