import GulpClient from "gulp";
import gulptSass from "gulp-sass";
import sassCompiler from "sass";
import pug from "gulp-pug";
import sourcemaps from "gulp-sourcemaps";
import data from "gulp-data";
import fs from "fs";
import browser_sync from "browser-sync";

const browserSync = browser_sync.create();
const { src, dest, watch, series } = GulpClient;
const sass = gulptSass(sassCompiler);
const FilesPath = {
  sassFiles: "dev/scss/main.scss",
  jsFiles: "dev/scripts/**/*",
  htmlFiles: "dev/pages/**/*.pug",
  assetsFiles: "dev/assets/**/*",
};

function htmlTask() {
  return src(FilesPath.htmlFiles)
    .pipe(
      data(function (file) {
        return JSON.parse(fs.readFileSync("dev/data/data.json"));
      })
    )
    .pipe(pug({ pretty: true }))
    .pipe(dest("dist"))
    .pipe(browserSync.stream());
}

function jsTask() {
  return src(FilesPath.jsFiles)
    .pipe(dest("dist/scripts"))
    .pipe(browserSync.stream());
}

function jsSubTask() {
  return src("dev/scripts/toggleAuthen/*.js")
    .pipe(dest("dist/scripts/toggleAuthen"))
    .pipe(browserSync.stream());
}

function sassTask() {
  return src(FilesPath.sassFiles)
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sass())
    .pipe(sourcemaps.write("."))
    .pipe(dest("dist/css"))
    .pipe(browserSync.stream());
}
function assetsTask() {
  return src(FilesPath.assetsFiles)
    .pipe(dest("dist/assets"))
    .pipe(browserSync.stream());
}

GulpClient.task("serve", function () {
  // assetsTask();
  // htmlTask();
  // jsTask();
  // sassTask();

  watch(FilesPath.sassFiles, sassTask);
  watch(FilesPath.jsFiles, series(jsTask, jsSubTask));
  watch(FilesPath.htmlFiles, htmlTask);
  watch(FilesPath.assetsFiles, assetsTask);
  browserSync.init({ server: { baseDir: "./dist" } });
});
