const fs = require('fs')
const readFile = fs.readFileSync
const writeFile = fs.writeFileSync
var rollup = require('rollup')
var uglify = require('uglify-js')
var babel = require('rollup-plugin-babel')
var package = require('../package.json')
var banner =
    "/*!\n" +
    " * vue-easyui v" + package.version + "\n" +
    " * https://github.com/wujiming/vue-easyui\n" +
    " * Released under the MIT License.\n" +
    " */\n"


const main = readFile('src/index.js', 'utf-8')
    .replace(/plugin\.version = '[\d\.]+'/, `plugin.version = '${package.version}'`)
writeFile('src/index.js', main)

rollup.rollup({
    entry: 'src/index.js',
    plugins: [
        babel()
    ]
})
    .then(function (bundle) {
        return write('dist/vue-easyui.js', bundle.generate({
            format: 'umd',
            banner: banner,
            moduleName: classify(package.name)
        }).code, bundle);
    })
    .then(function (bundle) {
        return write('dist/vue-easyui.min.js',
            banner + '\n' + uglify.minify('dist/vue-easyui.js').code,
            bundle);
    })
    .catch(logError);

function toUpper (_, c) { return c ? c.toUpperCase() : '' }
const classifyRE = /(?:^|[-_\/])(\w)/g
function classify(str) {
    return str.replace(classifyRE, toUpper)
}


function write(dest, code, bundle) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(dest, code, function (err) {
            if (err) return reject(err);
            console.log(blue(dest) + ' ' + getSize(code));
            resolve(bundle);
        });
    });
}

function getSize(code) {
    return (code.length / 1024).toFixed(2) + 'kb';
}

function logError(e) {
    console.log(e);
}

function blue(str) {
    return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m';
}