let mix = require('laravel-mix')
let SXFileGenerator = require('./modules/sx-form-generator/file-generator')

//Disable Mix Manifest
Mix.manifest.refresh = _ => void 0

// set desired file names and set watchers for beatify watcher output
let formFiles = new SXFileGenerator({
  files: [
    'traspaso-1',
    'traspaso-3',
    'traspaso-6',
  ],
  srcPath: 'src', //change this if your source file have another location
  indexFileName: 'index' // to track and beautify you index file
})

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

mix
  .setPublicPath('dist')
  .js('src/js/script.js', 'dist/js')

  // combine js files
  .combine([
    'node_modules/jquery/dist/jquery.slim.min.js',
    'node_modules/air-datepicker/dist/js/datepicker.min.js',
    'node_modules/air-datepicker/dist/js/i18n/datepicker.es.js'
  ], 'dist/js/libs.js')

  //combine css files
  .combine([
    'node_modules/flexboxgrid/dist/flexboxgrid.min.css',
    'src/css/turret.css',
    'node_modules/air-datepicker/dist/css/datepicker.min.css'
  ], 'dist/css/libs.css')

  //copy image files
  .copy('src/images', 'dist/images')

  // generate custom styles
  .stylus('src/styl/style.styl', 'dist/css')

  //generate turret framework
  .postCss('src/turret/turret.css', '../src/css', [
    require('postcss-import'),
    require('postcss-preset-env')({
      stage: 1,
      sourceMap: 'inline',
      features: {
        'color-mod-function': {
          unresolved: 'warn'
        },
        'custom-properties': {
          preserve: false
        },
        'nesting-rules': true
      }
    }),
    require('cssnano')({
      autoprefixer: false
    })
  ])
  .browserSync({
    host: 'localhost',
    open: 'external',
    proxy: false,
    server: './dist',
    files: [
      // sources
      'src/styl/*.styl',
      'src/js/*.js',
      'src/*.html',

      // dist
      'dist/css/*.css',
      'dist/js/*.js',
      'dist/*.html',
    ]
  })
  .webpackConfig({
    plugins: formFiles.getFilesToWatch()
  })

// Full API
// mix.js(src, output);
// mix.react(src, output); <-- Identical to mix.js(), but registers React Babel compilation.
// mix.preact(src, output); <-- Identical to mix.js(), but registers Preact compilation.
// mix.coffee(src, output); <-- Identical to mix.js(), but registers CoffeeScript compilation.
// mix.ts(src, output); <-- TypeScript support. Requires tsconfig.json to exist in the same folder as webpack.mix.js
// mix.extract(vendorLibs);
// mix.sass(src, output);
// mix.less(src, output);
// mix.stylus(src, output);
// mix.postCss(src, output, [require('postcss-some-plugin')()]);
// mix.browserSync('my-site.test');
// mix.combine(files, destination);
// mix.babel(files, destination); <-- Identical to mix.combine(), but also includes Babel compilation.
// mix.copy(from, to);
// mix.copyDirectory(fromDir, toDir);
// mix.minify(file);
// mix.sourceMaps(); // Enable sourcemaps
// mix.version(); // Enable versioning.
// mix.disableNotifications();
// mix.setPublicPath('path/to/public');
// mix.setResourceRoot('prefix/for/resource/locators');
// mix.autoload({}); <-- Will be passed to Webpack's ProvidePlugin.
// mix.webpackConfig({}); <-- Override webpack.config.js, without editing the file directly.
// mix.babelConfig({}); <-- Merge extra Babel configuration (plugins, etc.) with Mix's default.
// mix.then(function () {}) <-- Will be triggered each time Webpack finishes building.
// mix.dump(); <-- Dump the generated webpack config object t the console.
// mix.extend(name, handler) <-- Extend Mix's API with your own components.
// mix.options({
//   extractVueStyles: false, // Extract .vue component styling to file, rather than inline.
//   globalVueStyles: file, // Variables file to be imported in every component.
//   processCssUrls: true, // Process/optimize relative stylesheet url()'s. Set to false, if you don't want them touched.
//   purifyCss: false, // Remove unused CSS selectors.
//   terser: {}, // Terser-specific options. https://github.com/webpack-contrib/terser-webpack-plugin#options
//   postCss: [] // Post-CSS options: https://github.com/postcss/postcss/blob/master/docs/plugins.md
// });


