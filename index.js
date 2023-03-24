const pug = require('pug')
const fs = require('fs');

const htmlFn = pug.compileFile('./src/index.pug', {
    pretty: true
})

const readJsonFromFile = (path)=>{
    let rawdata = fs.readFileSync(path);
    return JSON.parse(rawdata);
}

const readDataFromDir = (locals, path)=>{
    const temp = locals
    fs.readdirSync(path).forEach(file => {
        const [name, ext] = file.split('.')
        temp[name] = readJsonFromFile(path+file)
      });
    return temp
}

const locals = {
    pageTitle: 'Hello, there'
}

readDataFromDir(locals, "./pug-data/")

fs.writeFileSync('./build/index.html', htmlFn(locals));