const webpack = require('webpack');
const path = require('path');
const { version } = require('./package.json');


webpack({
    mode: 'none',
    entry: [
        './src/main.ts',
        './src/style.css'
    ],
    resolve: {
        extensions: ['.tsx', '.ts']
    },
    output: {
        path: path.resolve(__dirname, 'build', String(version)),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }
                ],
            },
            {
                test: /\.(jpeg|jpg)$/i,
                type: 'asset/inline'
            }
        ]
    }
}, (err, stats) => {
    if (err) {
        console.error(err.stack || err);
        if (err.details) {
            console.error(err.details);
        }
        return;
    }

    const info = stats.toJson();
    if (stats.hasErrors()) {
        console.error(info.errors);
    }
    if (stats.hasWarnings()) {
        console.warn(info.warnings);
    }
});
