const proxy = require("http-proxy-middleware")

module.export = function (app) {
    app.use(
        proxy('api1', {
            target: "https://jsonplaceholder.typicode.com",
            changeOrigin: true,
            pathRewrite: {'^/api1': ''}
        })
    )
}