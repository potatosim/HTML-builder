const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'text.txt');
const readStream = fs.createReadStream(filePath, 'utf-8');

const { stdout } = process;

let data = '';

readStream.on('data', chunk => data += chunk);
readStream.on('end', () => stdout.write(data));