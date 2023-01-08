import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import compareData from './compareData.js';

const genDiff = (filepath1, filepath2) => {
  const data1 = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), filepath1)));
  const data2 = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), filepath2)));
  
  const difference = compareData(data1, data2);
  return difference;
};

export default genDiff;