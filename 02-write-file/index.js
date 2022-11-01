const { stdin, stdout } = process;
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'text.txt')
const writeStream = fs.createWriteStream(filePath, 'utf-8');

stdout.write('Please, enter some text\n');
process.on('exit', () => {
  stdout.write('Thank you. Good bye!');
});

stdin.on('data', (data) => {
  if(data.toString().trim() === 'exit') {
    process.exit();
  }
  writeStream.write(data.toString());
});

process.on('SIGINT', () => process.exit());
