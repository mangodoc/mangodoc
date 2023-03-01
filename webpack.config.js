module.exports = {
    mode: "production",
    entry: "./src/mgdoc.js",
    output: {
        path: __dirname,
        filename: "lib/mgdoc.min.js"
    },
    module: {
        // loaders: [
        //     { test: /\.css$/, loader: "style-loader!css-loader" }
        // ]
    }
};