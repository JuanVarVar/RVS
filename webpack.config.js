module.exports = {
    mode: 'development',
    entry: __dirname + '/frontend/src/index.jsx',
    output: {
        filename: 'bundle.js',
        path: '/'
    },
    module:{
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                options:{
                    presets:['es2015','react']
                    
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                    }
                ]
                
            },
            {
                test: /\.(png|jp(e*)g|svg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[hash].[ext]',
                            publicpath:'resources'
                        },
                    },
        
                ],
            },
        ]
        
    }
}