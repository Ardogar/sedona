'use strict'
module.exports = function() {
  $.gulp.task("html", function() {
  return $.gulp.src("./src/*.html")
    .pipe($.gp.posthtml([
      $.posthtmlInclude()
    ]))
    .pipe($.gp.htmlmin({collapseWhitespace: true}))
    .pipe($.gulp.dest("./build"))
});
}
