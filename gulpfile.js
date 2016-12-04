'use strict';

var DEBUG_OPTION = true;    // indique le mode de production

// Cleaning de la dist /////////////////////////////////////////////////////////////////////////////////////////////////

var src = './src/';
var dst = './dist/';

var htmlMinify = ! DEBUG_OPTION;
var URLWebSite = DEBUG_OPTION ? 'file://D:/PHPSTORM/avocats-mba.fr/dist/' : 'http://www.avocats-mba.fr';

var gulp = require('gulp');

// Cleaning de la dist /////////////////////////////////////////////////////////////////////////////////////////////////

var del = require('del');
gulp.task('clean:dist', function () {
    return del.sync('dist');
});

// Gestion des HTML ////////////////////////////////////////////////////////////////////////////////////////////////////

var urlPrefix = require('gulp-html-url-prefix');
var template = require('gulp-template-html');
var htmlmin = require('gulp-html-minifier');

gulp.task('htmlcompile', function () {
    return gulp.src(src + 'template/content/**/*.html')
        .pipe(template(src + 'template/layout.html'))
        .pipe(htmlmin({
            collapseWhitespace: htmlMinify,
            conservativeCollapse: htmlMinify
        }))
        .pipe(urlPrefix({
            prefix: URLWebSite
        }))
        .pipe(gulp.dest(dst));
});
gulp.task('htmlcompile:watch', function () {
    gulp.watch(src + 'templates-html/**/*.html', ['htmlcompile']);
});

// Gestion des CSS /////////////////////////////////////////////////////////////////////////////////////////////////////

var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var postcss = require('gulp-postcss');

gulp.task('csscompile', function () {
    var processors = [
        autoprefixer({browsers: ['last 2 version', '> 1%']})
    ];

    return gulp.src(src + 'sass/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(postcss(processors))
        .pipe(gulp.dest(dst + 'css'));
});
gulp.task('csscompile:watch', function () {
    gulp.watch(src + 'sass/**/*.scss', ['csscompile']);
});

// Gestion des JS //////////////////////////////////////////////////////////////////////////////////////////////////////

var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('jscompile', function () {
    // Les fichiers en copie directe

    gulp.src(src + 'js/vendor/*.js')
        .pipe(gulp.dest(dst + 'js/vendor'));

    // Les fichiers avec un post traitement

    return gulp.src([src + 'js/plugins/**/*.js', src + 'js/app/**/*.js'])
        .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(gulp.dest(dst + 'js'));
});
gulp.task('watch:jscompile', function () {
    gulp.watch(src + 'js/**/*.js', ['compress']);
});

// Gestion des images //////////////////////////////////////////////////////////////////////////////////////////////////

var cache = require('gulp-cache');
var imagemin = require('gulp-imagemin');
gulp.task('imageoptimize', function () {
    return gulp.src(src + 'img/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest(dst + '/img'))
});
gulp.task('watch:imageoptimize', function () {
    gulp.watch(src + 'img/**/*.+(png|jpg|jpeg|gif|svg)', ['imageoptimize']);
});

// Copie de tous les fichiers non gérés ////////////////////////////////////////////////////////////////////////////////

gulp.task('filecopy', function () {
    gulp.src(src + '+(fonts)/**/*')
        .pipe(gulp.dest(dst));
    gulp.src(src + '\.htaccess')
        .pipe(gulp.dest(dst));

    gulp.src(src + '*.+(htaccess|png|ico|xml|txt)')
        .pipe(gulp.dest(dst));
});
gulp.task('watch:filecopy', function () {
    gulp.watch(src + '+(fonts)/**/*', ['filecopy']);
    gulp.watch(src + '*.+(htaccess|png|ico|xml|txt)', ['filecopy']);
});

// gZip ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var gzip = require('gulp-gzip');

gulp.task('gzipdist', function () {
    return gulp.src(dst + '**/*.+(html|css|js')
        .pipe(gzip({
            append: true,
            extension: 'zip'
        }))
        .pipe(gulp.dest(dst));
});

// sitemap /////////////////////////////////////////////////////////////////////////////////////////////////////////////

var sitemap = require('gulp-sitemap');

gulp.task('makesitemap', function () {
    return gulp.src(src + '/template/content/**/*', { read: false })
        .pipe(sitemap({
            siteUrl: 'http://www.avocats-mba.fr',
            fileName: 'sitemap.xml',
            getLoc: function(siteUrl, loc) {
                return loc.substr(0, loc.lastIndexOf('.')).replace(/[_]/, '/') || 'null-'+loc;
            },
            lastmod: new Date()
        })).pipe(gulp.dest(dst));
});

// sitemap /////////////////////////////////////////////////////////////////////////////////////////////////////////////

var robots = require('gulp-robots');

gulp.task('makerobots', function() {
    return gulp.src(src + 'template/content/index.html')
        .pipe(robots({
            useragent: '*',
            allow: ['img/'],
            disallow: ['css/', 'fonts/', 'js/']
        }))
        .pipe(gulp.dest(dst));
});

// Défault /////////////////////////////////////////////////////////////////////////////////////////////////////////////

var runSequence = require('run-sequence');

gulp.task('default', function (callback) {
    runSequence(
        ['clean:dist', 'filecopy', 'imageoptimize', 'htmlcompile', 'csscompile', 'jscompile', 'gzipdist', 'makesitemap', 'makerobots']
        , callback
    );
});