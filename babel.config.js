module.exports =  {
    "exclude": ["./node_modules/**"],
    "presets": [
        [
            ["@babel/preset-env"],
            {
                "loose": true,
                "modules": "commonjs",
                "targets": {
                "esmodules": true
                },
            }
        ],
        "@babel/preset-typescript", 
        "@babel/preset-react",
        "@linaria"
    ]   
}

