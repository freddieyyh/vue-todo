'use strict'
const path = require('path')
module.exports = {
    baseUrl: process.env.NODE_ENV === 'production' ? '/frontend/' : '/',
    productionSourceMap: true,
    devServer: {
        proxy: {
            '/apis': {
                target: 'http://localhost:8888',
                changeOrigin: true
            }
        }
    },
}