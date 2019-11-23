const { src, dest, series, parallel, watch } = require('gulp'); // eslint-disable-line
const del = require('del');
const stylus = require('gulp-stylus');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cleanCss = require('gulp-clean-css');
const babel = require('gulp-babel');
const minify = require('gulp-minify'); // eslint-disable-line
const uglify = require('gulp-uglify'); // 經查與 uglify 幾乎一樣，較為推薦此
const rename = require('gulp-rename');

/** 練習使用資料夾重置處理 */
function delPublicFile() {
  return del(['public/**', '!public']);
}

/** CSS 檔案處理 */
function cssTranspile() {
  // 寫成陣列，方便之後執行多個 plugin
  const plugins = [autoprefixer()];
  return src('src/css/*.styl')
    .pipe(stylus())
    .pipe(postcss(plugins))
    .pipe(dest('public/css'));
}

function cssMinify() {
  return src(['public/css/*.css', '!public/css/*-min.css'])
    .pipe(cleanCss())
    .pipe(rename({ suffix: '-min' }))
    .pipe(dest('public/css'));
}

/** JS 檔案處理 */
function jsTranspile() {
  return src('src/js/*.js')
    .pipe(babel({
      presets: ['@babel/env'],
    }))
    .pipe(uglify())
    .pipe(rename({ suffix: '-min' }))
    .pipe(dest('public/js'));
}

exports.default = series(delPublicFile, cssTranspile, cssMinify, jsTranspile);
watch('src/css/*.styl', { ignoreInitial: false }, series(cssTranspile, cssMinify));
