let fs = require('fs')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let HtmlBeautifyPlugin = require('html-beautify-webpack-plugin')
let mergeWith = require('lodash').mergeWith;

class SXFormGenerator {

  constructor (options) {
    this.options = {
      files: [],
      srcPath: 'src',
      indexFileName: 'index'
    }

    mergeWith(this.options, options, (objValue, srcValue) => {
      if (Array.isArray(objValue)) {
        return objValue.concat(srcValue);
      }
    })

    this.fileNames = this.options.files
    this.filesToWatch = null

    this.checkFiles()
  }


  checkFiles () {
    console.log('Checking files!')

    this.fileNames.forEach(file => {
      this.createFiles(`${file}.html`)
    })

    this.setHtmlFilesPlugins()
  }

  createFiles(filename) {
    let filePath = `./${this.options.srcPath}/${filename}`

    fs.access(filePath, fs.F_OK, (err) => {
      if (err) {
        fs.readFile(__dirname + '/template/bootstrap.html', 'utf8', function (err, data) {
          let htmlContent = data.replace(/{{fileName}}/g, filename)
          fs.writeFile(filePath, htmlContent, err => {
            err ? console.log(err) : false
            console.log(`${filename} file created!`)
          })
        })
      }
    })
  }

  getFilesToWatch() {
    return this.filesToWatch
  }

  setHtmlFilesPlugins () {
    let webPackPlugins = []
    let options = {
      filename: `${this.options.indexFileName}.html`,
      template: `${this.options.srcPath}/${this.options.indexFileName}.html`,
      minify: {
        collapseWhitespace: false,
        removeComments: false,
        removeRedundantAttributes: false,
        removeScriptTypeAttributes: false,
        removeStyleLinkTypeAttributes: false,
        removeEmptyElements: false,
        useShortDoctype: false
      },
      inject: false
    }

    webPackPlugins.push(new HtmlWebpackPlugin(options))

    this.fileNames.forEach(file => {

      options.filename = `${file}.html`
      options.template = `${this.options.srcPath}/${file}.html`

      webPackPlugins.push(
        new HtmlWebpackPlugin(options)
      )
    })

    webPackPlugins.push(new HtmlBeautifyPlugin())

    this.filesToWatch = webPackPlugins
  }

}

module.exports = SXFormGenerator
