/* eslint-disable import/extensions */
import fs from 'fs';
import compareData from './src/compareData.js';
import genPath from './src/genPath.js';

const genDiff = (filepath1, filepath2) => {
  const data1 = JSON.parse(fs.readFileSync(genPath(filepath1), { encoding: 'utf-8' }));
  const data2 = JSON.parse(fs.readFileSync(genPath(filepath2), { encoding: 'utf-8' }));

  const difference = compareData(data1, data2);
  return difference;
};

export default genDiff;
