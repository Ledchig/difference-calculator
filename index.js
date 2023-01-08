import fs from 'fs';
import compareData from './src/compareData.js';
import getPath from './src/getPath.js';

const genDiff = (filepath1, filepath2) => {
  const data1 = JSON.parse(fs.readFileSync(getPath(filepath1)));
  const data2 = JSON.parse(fs.readFileSync(getPath(filepath2)));
  
  const difference = compareData(data1, data2);
  return difference;
};

export default genDiff;