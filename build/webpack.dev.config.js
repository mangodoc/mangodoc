const path = require('path');

module.exports = {
    //devtool: 'cheap-module-eval-source-map'
    devServer: {
        static: [
            {
                directory: path.join(__dirname, '../ctx'),
                publicPath: '/'
            },
            {
                directory: path.join(__dirname, '../dist'),
                publicPath: '/dist'
            }
        ]
    }
}
