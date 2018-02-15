"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var svgstore = require("gulp-svgstore");
var imagemin = require("gulp-imagemin");
var del = require("del");
var server = require("browser-sync").create();
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var runSequence = require("run-sequence");
var scssg = require("gulp-sass-glob");
var htmlmin = require("gulp-htmlmin");

gulp.task("style", function() {
  gulp.src("src/scss/style.scss")
    .pipe(plumber())
    .pipe(scssg())
    .pipe(sass({includePaths: require("node-normalize-scss").includePaths}))
    // .pipe(postcss([
    //   autoprefixer(["last 5 version", "> 1%", "ie 11", "ie 10"],{cascade: true},)
    // ]))
    .pipe(gulp.dest("src/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(server.stream());
});


gulp.task("html", function() {
  return gulp.src("src/**/*.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("dist"));
});


// gulp.task("sprite", function () {
//   return gulp.src("src/img/**/icon-*.svg")
//     .pipe(svgstore({
//       inlineSvg: true
//     }))
//     .pipe(rename("sprite.svg"))
//     .pipe(gulp.dest("src/img/sprite"));
// });


// gulp.task("images", function () {
//   return gulp.src([
//       "src/img/**/*.{png,jpg,svg}"
//       // "!src/img/**/icon-*.svg"
//     ])
//     .pipe(imagemin([
//       imagemin.optipng({optimizationLevel: 3}),
//       imagemin.jpegtran({progressive: true}),
//       imagemin.svgo()
//     ]))
//     .pipe(gulp.dest("dist/img"));
// });


gulp.task("copy", function () {
  return gulp.src([
      "src/fonts/**/*.{woff,woff2}",
      "src/img/**/**/*.{png,jpg,svg}"
    ], {
    base: "src"
  })
  .pipe(gulp.dest("dist"));
});

gulp.task("clean", function () {
    return del.sync("dist");
});

gulp.task("js", function() {
  return gulp.src(["src/js/**/*.js"])
    .pipe(plumber())
    // .pipe(concat("scripts.js"))
    // .pipe(gulp.dest("dist/js"))
    .pipe(uglify())
    .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest("dist/js"));
});

gulp.task("serv", ["style","js"], function() {
  server.init({
    server: {baseDir:"dist"},
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("src/scss/**/*.{scss,sass}", function(event) {
    setTimeout(function(){gulp.start("style");},10)
});
  gulp.watch("src/**/*.html", ["html"]).on("change", server.reload);
  gulp.watch("src/js/**/*.js", ["js"]).on("change", server.reload);
});

gulp.task("build", function (callback) {
  runSequence("clean", "copy", "style", "js", "html", callback);
});
