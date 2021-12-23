const webpack = require('webpack');
const path = require('path');
const fs = require('fs-extra');
const { config } = require('./package.json');

const removeClientFolder = () => fs.removeSync(pathToFolder);
const copyClientPublicFolder = () => fs.copySync('./src/client/public', './build/client');
const pathToFolder = path.resolve(__dirname, 'build/client');

Promise.resolve()
    .then(() => { removeClientFolder(); })
    .then(() => {
        return new Promise((resolve, reject) => {
            webpack({
                mode: 'none',
                entry: './src/client/main.ts',
                resolve: {
                    extensions: ['.tsx', '.ts']
                },
                output: {
                    path: pathToFolder,
                    filename: 'bundle.js',
                },
                module: {
                    rules: [
                        {
                            test: /\.tsx?$/,
                            use: 'ts-loader',
                            exclude: /node_modules/,
                        }
                    ]
                },
                plugins:[
                    new webpack.DefinePlugin({
                        HOST: JSON.stringify(config.HOST),
                        PORT: JSON.stringify(config.PORT)
                    })
                ],
            }, (err, stats) => {
                if (err) {
                    console.error(err.stack || err);
                    if (err.details) {
                        console.error(err.details);
                    }
                    reject();
                }

                const info = stats.toJson();
                if (stats.hasErrors()) {
                    console.error(info.errors);
                }
                if (stats.hasWarnings()) {
                    console.warn(info.warnings);
                }

                resolve();
            });
        });
    })
    .then(() => { copyClientPublicFolder(); });



