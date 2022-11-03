const fs = require('fs/promises');
const path = require('path');

const filesPath = path.join(__dirname, 'styles');
const newFilePath = path.join(__dirname, 'project-dist');

const createBundle = async (currentPath, resultPath, fileName) => {
  const files = await fs.readdir(currentPath, { withFileTypes: true })
  const filtredFiles = files.filter(item => path.extname(item.name) === '.css' && item.isFile());

  const filesContent = await Promise.all(filtredFiles.map(file => fs.readFile(path.join(currentPath, file.name), 'utf-8')));
  
  await fs.writeFile(path.join(resultPath, fileName), filesContent.join('\n'));
  
}

createBundle(filesPath, newFilePath, 'bundle.css');

exports.createBundle = createBundle;