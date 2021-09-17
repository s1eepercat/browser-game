const path = require('path');
const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';

module.exports = {
    mode,
    entry: './src/index.ts',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname)
    },
    module: {
        rules: [
            {
                test: /\.(js|ts)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    devtool: 'source-map',
    devServer: {
        static: './dist'
    }
}
