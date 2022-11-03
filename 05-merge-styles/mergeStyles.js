const fs = require('fs/promises');
const path = require('path');

const mergeStyles = async (currentPath, resultPath, fileName) => {
  const files = await fs.readdir(currentPath, { withFileTypes: true })
  const filtredFiles = files.filter(item => path.extname(item.name) === '.css' && item.isFile());

  const filesContent = await Promise.all(filtredFiles.map(file => fs.readFile(path.join(currentPath, file.name), 'utf-8')));
  
  await fs.writeFile(path.join(resultPath, fileName), filesContent.join('\n'));
  
}

exports.mergeStyles = mergeStyles;