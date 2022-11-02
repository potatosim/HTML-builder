const fs = require('fs/promises');
const path = require('path');

const filesPath = path.join(__dirname, 'files');
const newFilesPath = path.join(__dirname, 'files-copy');

const copyDirectory = async () => {
  await fs.mkdir(newFilesPath, { recursive: true });
  const files = await fs.readdir(filesPath, { withFileTypes: true });
  const filenames = files.map(file => {return file.name});

  const newFiles = await fs.readdir(newFilesPath, { withFileTypes: true });
  const newFilenames = newFiles.map(file => {return file.name});

  await Promise.all(newFilenames.map(filename => fs.unlink(path.join(newFilesPath, filename))));

  filenames.forEach(filename => {fs.copyFile(path.join(filesPath, filename), path.join(newFilesPath, filename))}); 
}

copyDirectory();
