'use strict'

module.exports = function() {
  $.gulp.task("js", function() {
    return $.gulp.src("./src/js/**/*.js")
    .pipe($.gp.sourcemaps.init())
      .pipe($.gp.uglify())
      .pipe($.gp.rename({
        suffix: ".min"
      }))
      .pipe($.gp.sourcemaps.write())
      .pipe($.gulp.dest("./build/js"))
      .pipe($.browserSync.stream());
  });
}