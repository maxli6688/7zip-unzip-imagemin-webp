// const imagemin = require('imagemin');
// const webp = require('imagemin-webp');
import imagemin from 'imagemin';
import webp from 'imagemin-webp';

imagemin(['home/*.{jpg,png}'], {
  destination: 'home',
  plugins: [webp({ quality: 60 })],
});
