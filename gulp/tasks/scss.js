'use strict'

module.exports = function () {
  $.gulp.task('scss', function () {
    return $.gulp.src('./src/scss/style.scss')
      .pipe($.gp.plumber())
      .pipe($.gp.sourcemaps.init())
      .pipe($.gp.sass({
        includePaths: require('node-normalize-scss').includePaths
      })).on('error', $.gp.notify.onError({ title: 'Style' }))
      .pipe($.gp.postcss([
        $.autoprefixer({
          browsers: [
            "last 2 versions",
            "IE 11",
            "Firefox ESR"
          ]
        })]))
      .pipe($.gp.sourcemaps.write())
      .pipe($.gulp.dest('./src/css'))
      .pipe($.gp.csso())
      .pipe($.gp.rename('style.min.css'))
      .pipe($.gulp.dest('./build/css'))
      .pipe($.browserSync.stream());
  })
}