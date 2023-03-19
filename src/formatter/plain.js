import _ from 'lodash';

const stringify = (node) => {
  if (_.isObject(node)) {
    return '[complex value]';
  }
  return _.isString(node) ? `'${node}'` : String(node);
};

export default (data) => {
  const iter = (tree, acc) => {
    const result = tree.flatMap((node) => {
      const path = [...acc, node.name].join('.');
      if (node.type === 'added') {
        return `Property '${path}' was added with value: ${stringify(node.value)}`;
      }
      if (node.type === 'deleted') {
        return `Property '${path}' was removed`;
      }
      if (node.type === 'changed') {
        return `Property '${path}' was updated. From ${stringify(node.value)} to ${stringify(node.newValue)}`;
      }
      if (node.type === 'nested') {
        return `${iter(node.value, [path])}`;
      }
      return [];
    });
    return [...result].join('\n');
  };
  return iter(data, '');
};
