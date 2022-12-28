import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log("directory-name 👉️", __dirname);
import rimraf from "rimraf";
import imagemin from "imagemin";
// import imageminPngquant from "imagemin-pngquant";

import ImageMinimizerPlugin from "image-minimizer-webpack-plugin";

const { imageminNormalizeConfig } = ImageMinimizerPlugin;
const OUTPUT_DIR = "dist/images";
const INPUT_DIRS = [
  "src/images",
  // ADD NEW FOLDERS HERE
  // ...
];
const { lstatSync, readdirSync } = fs;
const { join } = path;
const isDirectory = (source) => lstatSync(source).isDirectory();
const getDirectories = (source) =>
  readdirSync(source)
    .map((name) => join(source, name))
    .filter(isDirectory);
const getDirectoriesRecursive = (source) => [
  source,
  ...getDirectories(source)
    .map(getDirectoriesRecursive)
    .reduce((a, b) => a.concat(b), []),
];

const imageminHandle = async () => {
  let imageDirs = [];

  INPUT_DIRS.map(
    (dirname) =>
      (imageDirs = imageDirs.concat(getDirectoriesRecursive(dirname)))
  );
  const imageminConfig = await imageminNormalizeConfig({
    plugins: [
      // "jpegtran",
      ["pngquant", { quality: [0.6, 0.8] }],
    ],
  });
  for (let i in imageDirs) {
    const dir = imageDirs[i];
    const dest = join(OUTPUT_DIR,dir).replace('\\src\\images','').replace('/src/images','')
    // windows '\\src\\images'
    console.log(dest);
    await imagemin([`${dir}/*.{jpg,png,svg,gif}`], {
      destination: dest,
      plugins: imageminConfig.plugins,
    });
    console.log(`...${(((+i + 1) / imageDirs.length) * 100).toFixed(0)}%`);
  }
  // console.log(files);
  // => [{data: <Buffer 89 50 4e …>, path: 'build/images/foo.jpg'}, …]
};

rimraf(path.join(__dirname, "./dist/*"), (err) => {
  console.log("clean dist done...");
  imageminHandle();
});
