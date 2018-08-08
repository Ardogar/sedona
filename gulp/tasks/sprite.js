'use strict'

module.exports = function () {
  $.gulp.task("sprite", function () {
    return $.gulp.src("./src/img/**/icon-*.svg")
      .pipe($.gp.svgstore({
        inlineSvg: true
      }))
      
      .pipe($.gp.cheerio({
        run: function ($) {
          $('[fill]').removeAttr('fill');
          $('[stroke]').removeAttr('stroke');
          $('[style]').removeAttr('style');
        },
        parserOptions: { xmlMode: true }
      }))
      .pipe($.gp.rename("sprite.svg"))
      .pipe($.gulp.dest("./build/img"));
  });
}