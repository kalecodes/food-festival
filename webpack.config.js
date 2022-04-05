const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    // which file should be bundled
    entry: {
        app: './assets/js/script.js',
        events: './assets/js/event.js',
        schedule: './assets/js/schedule.js',
        tickets: './assets/js/tickets.js'
    },
    // where the bundled file should be output to, and its name
    output: {
        filename: '[name].bundle.js',
        path: __dirname + '/dist'
    },
    module: {
        rules: [
            {
                test: /\.jpg$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                            name (file) {
                                return "[path][name].[ext]"
                            },
                            publicPath: function(url) {
                                return url.replace("../", "/assets")
                            }
                        }
                    },
                    {
                        loader: 'image-webpack-loader'
                    }
                ]
            }
        ]
    },
    // ability for webpack to understand jQuery
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        // 
        new BundleAnalyzerPlugin({
            analyzerMode: "static", // the report outputs to a report.html file in the dist folder
            // we can also set this value to 'disable' to temporarily stop the reporting and automatic opening of this report in the browser
        })
    ],
    mode: `development`
};