import { Archive } from 'libarchive.js/main.js';

Archive.init({
  workerUrl: 'libarchive.js/dist/worker-bundle.js',
});

/* document.getElementById('file').addEventListener('change', async e => {
  const file = e.currentTarget.files[0];

  const archive = await Archive.open(file);
  let obj = await archive.extractFiles();

  console.log(obj);
});
 */

const fileUrl = '/home.7z';
const fileHandle = async () => {
  const data = await fetch(fileUrl, {
    // mode: 'no-cors',
  });
  const raw = await data.blob();
  console.log(raw);
  const archive = await Archive.open(raw);
  const obj = await archive.extractFiles();
  console.log(obj);
  Object.entries(obj).forEach(item => {
    console.log(item[0]);
    if (item[0] == 'F001.jpg') {
      const img = new Image();
      img.src = URL.createObjectURL(item[1]);
      document.body.append(img);
    }
  });
};

fileHandle();
