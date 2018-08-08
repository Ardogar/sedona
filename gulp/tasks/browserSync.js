'use strict';

module.exports = function () {
  $.gulp.task('serv', function () {
    $.browserSync.init({
      server: './build',
      notify: false,
      open: true,
      cors: true,
    });

    $.browserSync.watch(['./build/**/**/*.*', '!./build/**/*.css'], $.browserSync.reload);
  });
};
