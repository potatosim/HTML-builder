const path = require('path');
const { mergeStyles } = require('./mergeStyles');

const filesPath = path.join(__dirname, 'styles');
const newFilePath = path.join(__dirname, 'project-dist');

mergeStyles(filesPath, newFilePath, 'bundle.css');
