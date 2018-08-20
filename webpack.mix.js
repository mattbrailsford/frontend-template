// Imports
let mix = require('laravel-mix');
let tailwindcss = require('tailwindcss');
let postimport = require('postcss-import');
let url = require("postcss-url")
let presetEnv = require('postcss-preset-env');
let fs = require('fs');

let CleanWebpackPlugin = require('clean-webpack-plugin');

require('laravel-mix-purgecss');

// Config
const cfg = {
    paths: {
        root: '.',
        src: './src',
        build: './build',
        umbraco: '../MyProject.Web'
    }
}

// Don't bother raising toast notifications
mix.disableNotifications();

// Additional webpack configuration
mix.webpackConfig({

    // Cleanup previous builds
    plugins: [ 
        new CleanWebpackPlugin([`${cfg.paths.build}/js`, `${cfg.paths.build}/css`, `${cfg.paths.build}/images`])
    ],

    // Configure chunking for async components
    output: { 
        publicPath: '/',
        chunkFilename: 'js/[name].js?cb=[chunkhash]',
    }

});

// Process JS files including VUE
mix.js(`${cfg.paths.src}/js/main.js`, `${cfg.paths.build}/js`)
    .extract([
        'vue'
    ])
    .sourceMaps();

// Process CSS files
mix.postCss(`${cfg.paths.src}/css/main.css`, `${cfg.paths.build}/css`, [
    postimport({ root: `${cfg.paths.src}/css/*.css` }),
    url({ url: 'rebase' }),
    tailwindcss(`${cfg.paths.root}/tailwind.js`),
    presetEnv({
        stage: 2,
        features: {
            'nesting-rules': true
        },
        browsers: 'last 2 versions'
    })
])
.purgeCss({
    enabled: mix.inProduction(),
    folders: [
        `${cfg.paths.src}/js/`,
        `${cfg.paths.umbraco}/views/`
    ],
    extensions: ['html', 'cshtml', 'js', 'vue']
});

// Copy build files to Umbraco folder
// mix.copyDirectory(`${cfg.paths.build}/js`, `${cfg.paths.umbraco}/js`)
//   .copyDirectory(`${cfg.paths.build}/css`, `${cfg.paths.umbraco}/css`)
//   .copyDirectory(`${cfg.paths.build}/images`, `${cfg.paths.umbraco}/images`);

// ================================================
// LARAVEL QUIRKS - DON'T DELETE
// ================================================
// As mix is designed for laravel projects we need 
// a couple of workarounds for some small issues:
// 1: setPublicPath is required otherwise the build
//    script stalls with message '95% emitting'
// 2: A mix-manifest.json file is generated which 
//    is used by Laravel, but we don't need it, 
//    so just delete it
mix.setPublicPath(cfg.paths.build).then(() => {
    fs.unlink(`${cfg.paths.build}/mix-manifest.json`);
})