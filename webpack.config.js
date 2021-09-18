const path = require('path');
const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';

const config = {
    mode,
    target: 'node',
    module: {
        rules: [
            {
                test: /\.(js|ts)$/,
                exclude: [/node_modules/],
                loader: 'babel-loader'
            }
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    stats: 'errors-only'
};

const feConfig = Object.assign({}, config, {
    entry: './src/front-end/index.ts',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    devtool: 'source-map'
});

const beConfig = Object.assign({}, config, {
    entry: './src/back-end/server.ts',
    output: {
        path: path.resolve(__dirname, 'api'),
        filename: "server.js"
    }
});

module.exports = [feConfig, beConfig];


