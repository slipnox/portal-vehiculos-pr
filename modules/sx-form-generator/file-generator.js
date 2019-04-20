let fs = require('fs')

let fileGenerator = function (files) {

  if (files.length === 0) {
    console.log('Must especify an array of file names.');
    return
  }

  console.log('Checking files!')

  files.forEach(file => {
    createFiles(`${file}.html`)
  })

  console.log('Done !')
}

function createFiles (filename) {

  let path = `./src/${filename}`

  fs.access(path, fs.F_OK, (err) => {
    if (err) {

      fs.readFile(__dirname + '/template/bootstrap.html', 'utf8', function (err, data) {
        let htmlContent = data.replace(/{{fileName}}/g, filename)
        fs.writeFile(path, htmlContent, err => {
          err ? console.log(err) : false
          console.log(`${filename} file created!`)
        })
      })

      return
    }
    // console.log(`File ${filename} exist!`)
  })
}

module.exports = fileGenerator
