const path = require('path');
const { copyDirectory } = require('./copyDirectory');

const targetPath = path.join(__dirname, 'files');
const newFilesPath = path.join(__dirname, 'files-copy');

copyDirectory(targetPath, newFilesPath);
