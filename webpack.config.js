const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const DotEnvPlugin = require('dotenv-webpack');
const webpack = require('webpack');
const path = require('path');
const PATH_SOURCE = path.resolve('./src');
const PATH_BUILD = path.resolve('./dist');
const pjson = require('./package.json');
const port = 3000;

const NODE_ENV = process.env.NODE_ENV;

module.exports = (env) => {
    return {
        mode: NODE_ENV !== 'production' ? 'development' : NODE_ENV,
        entry: {
            index: PATH_SOURCE + '/index.tsx'
        },
        output: {
            path: PATH_BUILD,
            filename: '[name].js?[hash]',
            publicPath: '/'
        },
        resolve: {
            modules: [PATH_SOURCE, 'node_modules'],
            extensions: ['.ts', '.tsx', '.js', 'jsx'],
            alias: {
                '@': PATH_SOURCE,
            },
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader?minimize&sourceMap'],
                },
                {
                    test: /\.(png|jpe?g|gif)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'assets/[name].[ext]?[hash]',
                                context: '../images'
                            }
                        },
                    ],
                }
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: 'public/index.html',
                favicon: 'public/favicon.ico'
            }),
            new DotEnvPlugin({
                path: path.resolve('./env',`.env.${NODE_ENV}`),
                safe: false,
                defaults: path.resolve('./env',`/.env`),
            }),
            new webpack.DefinePlugin({
                "process.env.FIREBASE_API_KEY": JSON.stringify(env.FIREBASE_API_KEY),
                "process.env.FIREBASE_AUTH_DOMAIN": JSON.stringify(env.FIREBASE_AUTH_DOMAIN),
                "process.env.FIREBASE_DATABASE_URL": JSON.stringify(env.FIREBASE_DATABASE_URL),
                "process.env.FIREBASE_PROJECT_ID": JSON.stringify(env.FIREBASE_PROJECT_ID),
                "process.env.FIREBASE_STORAGE_BUCKET": JSON.stringify(env.FIREBASE_STORAGE_BUCKET),
                "process.env.FIREBASE_MESSAGING_SENDER_ID": JSON.stringify(env.FIREBASE_MESSAGING_SENDER_ID),
                "process.env.version": JSON.stringify(pjson.version),
            }),
            new CleanWebpackPlugin(),
        ],
        devtool: 'source-map',
        devServer: {
            host: 'localhost',
            port: port,
            historyApiFallback: true,
            inline: true,
            hot: true,
            publicPath: '/',
        },
    }
}
;
