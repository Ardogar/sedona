"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var autoprefixer = require("autoprefixer");
var minify = require("gulp-csso");
var imagemin = require("gulp-imagemin");
var imgWebp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var uglify = require("gulp-uglify");
var htmlmin = require("gulp-htmlmin");
var rename = require("gulp-rename");
var server = require("browser-sync").create();
var run = require("run-sequence");
var del = require("del");

// CSS
gulp.task("style", function() {
  gulp.src("src/scss/style.scss")
    .pipe(plumber())
    .pipe(sass({includePaths: require("node-normalize-scss").includePaths}))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("src/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});


// HTML
gulp.task("html", function() {
  return gulp.src("src/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("build"))
    .pipe(server.stream());
});

// JS
gulp.task("js", function() {
  gulp.src("src/js/**/*.js")
    .pipe(uglify())
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest("build/js"))
    .pipe(server.stream());
});


// SPRITE
gulp.task("sprite", function() {
  return gulp.src("src/img/icon-*.svg")
    .pipe(svgstore({
        inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("src/img"));
});


// IMAGES
gulp.task("images", function() {
  return gulp.src([
    "src/img/**/*.{png,jpg,svg}",
    "!src/img/**/sprite.svg",
    "!src/img/**/icon-*.svg"])
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
});


// imgWEBP
gulp.task("image-webp", function() {
  return gulp.src("src/img/**/*.{png,jpg}")
    .pipe(imgWebp({quality: 80}))
    .pipe(gulp.dest("build/img"));
});

// BROWSER SYNC
gulp.task("serve", function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("src/scss/**/*.{scss,sass}", ["style"]);
  gulp.watch("src/*.html", ["html"]);
  gulp.watch("src/js/**/*.js", ["js"]);
});


// BUILD
gulp.task("build", function(done) {
  run(
    "clean",
    "sprite",
    "copy",
    "js",
    "style",
    "html",
    "image-webp",
    "images",
    done
  );
});


//COPY
gulp.task("copy", function() {
  return gulp.src([
    "src/fonts/**/*.{woff,woff2}"
  ], {
    base: "src"
  })
  .pipe(gulp.dest("build"));
});


//CLEAN
gulp.task("clean", function() {
  return del("build");
});
