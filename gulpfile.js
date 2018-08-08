'use strict'

global.$ = {
  path: {
    task: require('./gulp/paths/tasks.js')
  },
  gulp: require('gulp'),
  del: require('del'),
  autoprefixer: require('autoprefixer'),
  htmlInclude: require('posthtml-include'),
  nodeNormalize: require('node-normalize-scss'),
  browserSync: require('browser-sync').create(),
  posthtmlInclude: require('posthtml-include'),
  gp: require('gulp-load-plugins') ()
};

$.path.task.forEach(function(taskPath) {
  require(taskPath) ();
});

$.gulp.task('reBuild', $.gulp.series(
  'clean',
  $.gulp.parallel(
    'img',
    'imgWEBP',
    'sprite'
  ),
  $.gulp.parallel(
    'html',
    'scss',
    'js',
    'copy'
  )
  
));
$.gulp.task('serve', $.gulp.parallel(
  'serv',
  'watch'
));
$.gulp.task('build', $.gulp.series(
  'clean',
  $.gulp.parallel(
    'img',
    'imgWEBP',
    'sprite'
  ),
  $.gulp.parallel(
    'html',
    'scss',
    'js',
    'copy'
  ),
  
  $.gulp.parallel(
    'serv',
    'watch'
  )
))
