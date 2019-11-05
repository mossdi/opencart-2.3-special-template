var gulp = require("gulp"),
    sass = require("gulp-sass"),
    pug = require("gulp-pug"),
    autoprefixer = require("gulp-autoprefixer"),
    prettify = require("gulp-jsbeautifier"),
    sourcemaps = require("gulp-sourcemaps"),
    plumber = require("gulp-plumber"),
    browserify = require("browserify"),
    browserifyshim = require("browserify-shim"),
    source = require("vinyl-source-stream"),
    jslint = require("gulp-jslint"),
    svgmin = require("gulp-svgmin"),
    buffer = require("vinyl-buffer"),
    uglify = require("gulp-uglify"),
    babelify = require("babelify");

gulp.task("css", function() {
    return gulp
        .src("dev/stylesheets/style.scss")
        .pipe(sourcemaps.init())
        .pipe(
            sass({
                "include css": true,
                outputStyle: "compressed"
            }).on("error", sass.logError)
        )
        .pipe(autoprefixer({ browsers: ["last 5 versions"] }))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("assets/css"));
});

gulp.task("pug", function() {
    return gulp
        .src("dev/pug/pages/*.pug")
        .pipe(
            plumber({
                errorHandler: function(error, file) {
                    console.log(error.message);
                    return this.emit("end");
                }
            })
        )
        .pipe(pug({ pretty: true }))
        .pipe(prettify())
        .pipe(prettify.reporter())
        .pipe(gulp.dest("assets"));
});
gulp.task("json", function() {
    return gulp.src("./dev/json/*.json").pipe(gulp.dest("assets/json"));
});
gulp.task("fonts", function() {
    return gulp.src("./dev/fonts/*.*").pipe(gulp.dest("assets/fonts"));
});
gulp.task("jslint", function() {
    return gulp
        .src(["source.js"])
        .pipe(jslint())
        .pipe(jslint.reporter("default"))
        .pipe(jslint.reporter("stylish"));
});
gulp.task("browserify", function() {
    return browserify("./dev/js/main.js")
        .transform("babelify", { presets: ["@babel/preset-env"] })
        .bundle()
        .on("error", function(err) {
            console.log(err.toString());
            this.emit("end");
        })
        .pipe(source("bundle.js"))

        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest("assets/js"));
});
gulp.task("images", function() {
    gulp.src("./dev/images/**/*").pipe(gulp.dest("./assets/images"));
    gulp.src("./dev/media/**/*").pipe(gulp.dest("./assets/media"));
});
gulp.task("php", function() {
    gulp.src("./dev/*.php").pipe(gulp.dest("./assets/"));
});
gulp.task("pdf", function() {
    gulp.src("./dev/pdf/*.pdf").pipe(gulp.dest("./assets/pdf/"));
});
gulp.task("svg", function() {
    gulp.src("./dev/images/*.svg")
        .pipe(
            svgmin({
                plugins: [
                    {
                        removeDoctype: false
                    },
                    {
                        removeHiddenElems: true
                    },
                    {
                        removeComments: false
                    },
                    {
                        cleanupNumericValues: {
                            floatPrecision: 2
                        }
                    },
                    {
                        convertColors: {
                            names2hex: false,
                            rgb2hex: false
                        }
                    }
                ]
            })
        )
        .pipe(gulp.dest("./dev/images"));
});
// Watch
gulp.task("watch", function() {
    // Watch .scss files
    gulp.watch("dev/stylesheets/**/*.scss", ["css"]);
    // Watch .js files
    gulp.watch(
        ["dev/js/**/*.js", "!dev/js/bundle.js"],
        ["browserify", "jslint"]
    );
    // Watch .pug files
    gulp.watch("dev/pug/**/*.pug", ["pug"]);
});
// Default task
gulp.task("default", [
    "css",
    "json",
    "fonts",
    "browserify",
    "jslint",
    "pug",
    "images",
    "php",
    "pdf",
    "watch"
]);
