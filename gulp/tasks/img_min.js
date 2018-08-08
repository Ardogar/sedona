'use strict'

module.exports = function() {
  $.gulp.task("img", function() {
    return $.gulp.src([
      "./src/img/**/*.{png,jpg,svg}",
      "!./src/img/**/icon-*.svg"])
      .pipe($.gp.imagemin([
        $.gp.imagemin.optipng({optimizationLevel: 3}),
        $.gp.imagemin.jpegtran({progressive: true}),
        $.gp.imagemin.svgo()
      ]))
      .pipe($.gulp.dest("./build/img"));
  });
}