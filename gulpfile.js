// VARIABLES & PATHS
let preprocessor = 'sass', // Preprocessor (sass, scss)
    fileswatch = 'html, htm, txt, json, md, woff2', // List of files extensions for watching & hard reload (comma separated)
    imageswatch = 'jpg, jpeg, png, webp, svg', // List of images extensions for watching & compression (comma separated)
    baseDir = 'src' // Base directory path without «/» at the end

let paths = {
	styles: {
		src: baseDir + '/' + preprocessor + '/*.*',
		dest: baseDir + '/css',
    },
    scripts: {
		src: [
            'node_modules/swiper/swiper-bundle.min.js',
            'node_modules/inputmask/dist/inputmask.min.js',
			baseDir + '/js/app.js'
		],
		dest: baseDir + '/js',
	},
	images: {
		src: baseDir + '/img/src/**/*',
		dest: baseDir + '/img/dist',
    },
    jsOutputName:  'app.min.js'
}

// LOGIC
const { src, dest, parallel, series, watch } = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify-es').default;
const newer = require('gulp-newer');
const imagemin = require('gulp-imagemin');
const del = require('del');
const browserSync = require('browser-sync').create();

function browsersync() {
	browserSync.init({
        server: { baseDir: baseDir + '/' },
        browser: "google chrome",
		notify: false
	})
}

function styles() {
	return src(paths.styles.src)
        .pipe(eval(preprocessor)({ outputStyle: 'compressed' }))
        .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest(paths.styles.dest))
        .pipe(browserSync.stream())
}

function scripts() {
	return src(paths.scripts.src)
        .pipe(concat(paths.jsOutputName))
        .pipe(uglify())
        .pipe(dest(paths.scripts.dest))
        .pipe(browserSync.stream())
}

function images() {
	return src(paths.images.src)
        .pipe(newer(paths.images.dest))
        .pipe(imagemin())
        .pipe(dest(paths.images.dest))
}

function cleaningimages() {
	return del('' + paths.images.dest + '/**/*', { force: true })
}

function startwatch() {
    watch(baseDir  + '/**/*.{' + fileswatch + '}').on('change', browserSync.reload);
	watch(baseDir  + '/**/' + preprocessor + '/**/*', styles);
    watch([baseDir + '/**/*.js', '!' + paths.scripts.dest + '/*.min.js'], scripts);
    watch(baseDir  + '/img/src/**/*.{' + imageswatch + '}', images);
}

exports.cleaningimages = cleaningimages;
exports.images = images;
exports.scripts = scripts;
exports.styles = styles;
exports.browsersync = browsersync;
exports.default = parallel(styles, scripts, images, browsersync, startwatch);