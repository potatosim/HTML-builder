const fs = require('fs/promises');
const path = require('path');

const filesPath = path.join(__dirname, 'secret-folder');

const readDirectory = async () => {
  const result = await fs.readdir(filesPath, { withFileTypes: true });
  const filtredResult = result.filter(item => item.isFile());
  const stat = await Promise.all(filtredResult.map(item => fs.stat(path.join(filesPath, item.name))));
  const output = filtredResult.map((item, i) => {
    const filename = item.name.replace(path.extname(item.name), '')
    return `${filename} - ${path.extname(item.name).slice(1)} - ${stat[i].size/1000}kb`;
  });
  output.forEach(item => console.log(item));
}

readDirectory();
