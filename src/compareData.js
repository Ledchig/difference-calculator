import _ from "lodash";

const compareData = (file1, file2) => {
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const sortedKeys = _.sortBy(_.union(keys1, keys2));
  const difference = sortedKeys.reduce((acc, key) => {
    if (keys1.includes(key) && keys2.includes(key)) {
      return file1[key] === file2[key] ? [ ...acc, `    ${key}: ${file1[key]}` ] :
        [ ...acc, `  - ${key}: ${file1[key]}`, `  + ${key}: ${file2[key]}` ];
    }
    return keys1.includes(key) ? [ ...acc, `  - ${key}: ${file1[key]}` ] :
      [ ...acc, `  + ${key}: ${file2[key]}` ];
  }, []);
  const result = `{\n${difference.join('\n')}\n}`;;
  return result;
};

export default compareData;