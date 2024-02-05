/* craco.config.js */
const CracoLessPlugin = require('craco-less');
const path = require('path');

module.exports = {
    plugins: [{
        plugin: CracoLessPlugin,
        options: {
            lessLoaderOptions: {
                lessOptions: {
                    modifyVars: {
                        '@primary-color': '#993441',
                        '@hover-color': '#cb6774',
                        '@second-color': '#ffb8b1',
                        '@second-hover-color': '#ff8a80',
                    },
                    javascriptEnabled: true,
                },
            },
        },
    }, ],
    webpack: {
        alias: {
            "@": path.resolve("src"),
            "@utils": path.resolve("src/utils"),
            '@pages': path.resolve('src/pages'),
            '@common': path.resolve('src/common'),
            '@components': path.resolve('src/components'),
            '@features': path.resolve('src/features'),
            '@mock': path.resolve('src/__MOCK__'),
            '@data': path.resolve('src/data'),
        }
    },
};