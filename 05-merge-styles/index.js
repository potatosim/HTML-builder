const fs = require('fs/promises');
const path = require('path');

const filesPath = path.join(__dirname, 'styles');
const newFilePath = path.join(__dirname, 'project-dist');

const createBundle = async () => {
  const files = await fs.readdir(filesPath, { withFileTypes: true })
  const filtredFiles = files.filter(item => path.extname(item.name) === '.css' && item.isFile());

  const filesContent = await Promise.all(filtredFiles.map(file => fs.readFile(path.join(filesPath, file.name), 'utf-8')));
  
  await fs.writeFile(path.join(newFilePath, 'bundle.css'), filesContent.join('\n'));
  
}

createBundle();