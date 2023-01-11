import _ from 'lodash';

const compareData = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const sortedKeys = _.sortBy(_.union(keys1, keys2));
  const difference = sortedKeys.reduce((acc, key) => {
    if (keys1.includes(key) && keys2.includes(key)) {
      return data1[key] === data2[key] ? [...acc, `    ${key}: ${data1[key]}`]
        : [...acc, `  - ${key}: ${data1[key]}`, `  + ${key}: ${data2[key]}`];
    }
    return keys1.includes(key) ? [...acc, `  - ${key}: ${data1[key]}`]
      : [...acc, `  + ${key}: ${data2[key]}`];
  }, []);
  const result = `{\n${difference.join('\n')}\n}`;
  return result;
};

export default compareData;
