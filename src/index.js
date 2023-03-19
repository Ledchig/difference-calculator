import fs from 'fs';
import path from 'path';
import compareData from './compareData.js';
import parse from './parser.js';
import formatter from './formatter/index.js';

const getData = (filePath) => fs.readFileSync(path.resolve(process.cwd(), filePath), 'utf8');
const getFileExt = (filePath) => path.extname(filePath);
const genPath = (filePath) => path.resolve(process.cwd(), filePath);

export default (filepath1, filepath2, format = 'stylish') => {
  const data1 = parse(getData(genPath(filepath1)), getFileExt(filepath1));
  const data2 = parse(getData(genPath(filepath2)), getFileExt(filepath2));

  const difference = compareData(data1, data2);
  return formatter(difference, format);
};
