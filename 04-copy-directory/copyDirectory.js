const fs = require('fs/promises');
const path = require('path');


const copyDirectory = async (currentPath, resultPath) => {
  await fs.mkdir(resultPath, { recursive: true });
  const files = await fs.readdir(currentPath, { withFileTypes: true });

  const newFiles = await fs.readdir(resultPath, { withFileTypes: true });

  if (newFiles.length) {
    await Promise.all(newFiles.map(file => {      
      return fs.rm(path.join(resultPath, file.name), { recursive: true });
    }));
  }

  await Promise.all(files.map(file => {
    if (file.isDirectory()) {
      return copyDirectory(path.join(currentPath, file.name), path.join(resultPath, file.name));
    }
    return fs.copyFile(path.join(currentPath, file.name), path.join(resultPath, file.name));
  }))
}

exports.copyDirectory = copyDirectory;