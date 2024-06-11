const {src, dest, series, watch} = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const csso = require('gulp-csso')
const include = require('gulp-file-include')
const htmlmin = require('gulp-htmlmin')
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer')
const sync = require('browser-sync').create()
const clean = require('gulp-clean')
const uglify = require('gulp-uglify-es').default

function html() {
    return src('src/**/*.html')
        .pipe(include({
            prefix: '@@',
        }))
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(dest('dist'))
}

function scss() {
    return src('src/styles/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(csso())
        .pipe(concat('index.css'))
        .pipe(dest('dist/styles'))
}

async function convertScss(folder, block) {
    return src(`src/styles/${folder}/${block}.scss`)
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(csso())
        .pipe(concat('style.css'))
}

function scripts() {
    return src('src/scripts/**.js')
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('dist/scripts'))
}

function img() {
    return src('src/images/**')
        .pipe(dest('dist/images'))
}

function fonts() {
    return src('./src/styles/fonts/**')
        .pipe(dest('./dist/styles/fonts'))
}

async function imgReplace(block) {
    return src(`dist/images/${block}/**`)
}

function clear() {
    return src('dist')
        .pipe(clean())
}

async function generator(folder, block) {
    await convertScss(folder, block)
    await imgReplace(folder, block)
}

function serve() {
    sync.init({
        server: './dist'
    })
    watch('src/**/*.html', series(html)).on('change', sync.reload)
    watch('src/styles/**/*.scss', series(scss)).on('change', sync.reload)
    watch('src/scripts/**.js', series(scripts)).on('change', sync.reload)
}

exports.build = series(
    html,
    clear,
    scss,
    html,
    scripts,
    img,
    () => generator('blocks', 'header'),
    () => generator('blocks', 'cover'),
)

exports.serve = series(
    scss,
    html,
    scripts,
    img,
    fonts,
    () => generator('blocks', 'header'),
    () => generator('blocks', 'cover'),

    serve
)
