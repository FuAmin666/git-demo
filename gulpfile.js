/**
 * Created by Amin on 2017/5/2.
 */
'use strict';

//在gulpfile中先载入gulp包，因为这个包提供了一些API
var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');//js合并
var uglify = require('gulp-uglify');//js压缩
var htmlmin = require('gulp-htmlmin');//html压缩
var browserSync = require('browser-sync');//创建服务
var reload = browserSync.reload;



//1.LESS编译 压缩 ---合并(没必要，一般预处理CSS都可以导包)
gulp.task('style',function(){
    //这里是在执行style任务时自动执行的
    gulp.src(['src/styles/*.less','!src/styles/_*.less'])
        .pipe(less())
        .pipe(cssnano())
        .pipe(gulp.dest('dist/styles'))
        .pipe(reload({stream: true}));
});



//2 JS合并 压缩 混淆

gulp.task('script',function(){
    gulp.src('src/script/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/script'))
        .pipe(reload({stream: true}))
});


//3图片复制
gulp.task('image',function(){
    gulp.src('src/images/*.*')
        .pipe(gulp.dest('dist/images'))
        .pipe(reload({stream: true}));
});

//4Html的处理
gulp.task('html',function(){
    gulp.src('src/*.html')
        .pipe(htmlmin({
            collapseWhitespace:true,//去除空白
            removeComments:true//去除注释
        }))//此处有参数
        .pipe(gulp.dest('dist'))
        .pipe(reload({stream: true}));
});


gulp.task('serve',function(){
    browserSync({
        server:{
            baseDir:['dist']
        }},
        function(err,bs){
            console.log(bs.option.getIn(["urls","local"]));
        });

    gulp.watch('src/styles/*.less',['style']);
    gulp.watch('src/script/*.js',['script']);
    gulp.watch('src/images/*.*',['image']);
    gulp.watch('src/*.html',['html']);
});