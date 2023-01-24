import _ from 'lodash';

const compareData = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const sortedKeys = _.sortBy(_.union(keys1, keys2));
  const comparedData = sortedKeys.map((key) => {
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return ({ type: 'nested', name: key, value: compareData(data1[key], data2[key]) });
    }
    if (!_.has(data1, key)) {
      return ({ type: 'added', name: key, value: data2[key] });
    }
    if (!_.has(data2, key)) {
      return ({ type: 'deleted', name: key, value: data1[key] });
    }
    if (data1[key] !== data2[key]) {
      return ({
        type: 'changed', name: key, value: data1[key], newValue: data2[key],
      });
    }
    return ({ type: 'unchanged', name: key, value: data1[key] });
  });
  return comparedData;
};

export default compareData;
