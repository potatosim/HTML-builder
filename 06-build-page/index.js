const { copyDirectory } = require('../04-copy-directory/copyDirectory');
const { mergeStyles } = require('../05-merge-styles/mergeStyles');
const path = require('path');
const fs = require('fs/promises');

const stylesPath = path.join(__dirname, 'styles');
const componentsPath = path.join(__dirname, 'components');
const assetsPath = path.join(__dirname, 'assets');
const templatePath = path.join(__dirname, 'template.html');
const distPath = path.join(__dirname, 'project-dist');

const buildHTML = async () => {
  const componentsFiles = (await fs.readdir(componentsPath, { withFileTypes: true }))
    .filter(file => path.extname(path.join(componentsPath, file.name)) === '.html')
    .map(file => file.name);
  const filesContent = await Promise.all(componentsFiles.map(name => {return fs.readFile(path.join(componentsPath, name), 'utf-8')}));
  
  const content = componentsFiles.reduce((acc, cur, i) => {
    const fileName = cur.replace(path.extname(path.join(componentsPath, cur)), '');
    acc[fileName] = filesContent[i];
    return acc; 
  }, {});

  const templateContent = await fs.readFile(templatePath, 'utf-8');
  console.log(templateContent);
  let temlateCopy = templateContent;

  Object.entries(content).forEach(([key, value]) => {
    temlateCopy = temlateCopy.replace(`{{${key}}}`, value);
  });

  await fs.mkdir(distPath, {recursive: true});

  await fs.writeFile(path.join(distPath, 'index.html'), temlateCopy);
   
}

buildHTML().then(() => mergeStyles(stylesPath, distPath, 'style.css')).then(() => copyDirectory(assetsPath, path.join(distPath, 'assets')))

