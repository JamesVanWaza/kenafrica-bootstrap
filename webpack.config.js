const path = require("path");

const HtmlWebpackPlugin = require('html-webpack-plugin');

const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: {
        index: './src/js/index.js',
        app: './src/js/app.js'
    },
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "[name].js",
    },
    target: 'web',
    devServer: {
        open: {
            app: 'Google Chrome'
        },
        watchFiles: {
            paths: ['src/']
        },
        port: 2010
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()]
    },
    module: {
        rules: [{
            // Whenever a javascript file is found, babel should run and do not compile node_module files
            test: /\js$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        },
        {
            test: /\.s[ac]ss$/i,
            use: [
                // Creates `style` nodes from JS Strings
                { loader: 'style-loader' },

                // Translates CSS into CommonJS
                { loader: 'css-loader' },

                // Compiles Sass to CSS
                { loader: 'sass-loader' },
            ]
        },
        {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
        },
        {
            test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
            type: 'asset/resource',
        }
        ]
    },
    plugins: [
        // Home Page
        new HtmlWebpackPlugin({
            title: 'Responsive Navigation',
            filename: 'index.html',
            template: './src/html-templates/index-template.html'
        }),
        new HtmlWebpackPlugin({
            title: 'OH OH',
            filename: '404.html',
            template: './src/html-templates/404-template.html'
        }),
        new HtmlWebpackPlugin({
            title: 'Sign In',
            filename: 'signin.html',
            template: './src/html-templates/signin-template.html'
        }),
        // Favicon
        new FaviconsWebpackPlugin({
            logo: './src/images/S-FaviconBackgroundColor@4x.png'
        })
    ]
};