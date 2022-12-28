http://localhost:8080/webpack-dev-server


https://developers.google.com/speed/webp

# 使用
```
// 7zip unzip
yarn dev


图片源文件拷贝到 src/images
压缩后的文件 dist/images
yarn imagemin


yarn webp
```



```
"type": "module",

"imagemin": "node ./imagemin.mjs "

const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  mode: 'production',
  module: {
    rules: [
      // You need this, if you are using `import file from "file.ext"`, for `new URL(...)` syntax you don't need it
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: "asset",
      },
    ],
  },
  optimization: {
    minimizer: [
      // Extend default minimizer, i.e. `terser-webpack-plugin` for JS
      // "...",
      // We recommend using only for the "production" mode
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              // "imagemin-gifsicle",
              "imagemin-mozjpeg",
              "imagemin-pngquant",
              // "imagemin-svgo",
            ],
          },
        },
        // Disable `loader`
        loader: false,
      }),
    ],
  },
};
```