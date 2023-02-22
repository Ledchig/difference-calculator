import _ from 'lodash';

const getIndent = (depth) => ' '.repeat(4 * depth);

const stringify = (node, depth) => {
  const indent = getIndent(depth);
  const closeIndent = getIndent(depth - 1);
  if (!_.isObject(node)) {
    return String(node);
  }
  const lines = Object.entries(node)
    .map(([name, value]) => `${indent}${name}: ${stringify(value, depth + 1)}`);
  return ['{', ...lines, `${closeIndent}}`].join('\n');
};

export default (data) => {
  const iter = (tree, depth) => {
    const indent = getIndent(depth);
    const keyIndent = indent.slice(2);
    const result = tree.map((node) => {
      if (node.type === 'added') {
        return `${keyIndent}+ ${node.name}: ${stringify(node.value, depth + 1)}`;
      }
      if (node.type === 'deleted') {
        return `${keyIndent}- ${node.name}: ${stringify(node.value, depth + 1)}`;
      }
      if (node.type === 'changed') {
        return (`${keyIndent}- ${node.name}: ${stringify(node.value, depth + 1)}\n`
        + `${keyIndent}+ ${node.name}: ${stringify(node.newValue, depth + 1)}`);
      }
      if (node.type === 'nested') {
        return `${keyIndent}  ${node.name}: {\n`
          + `${iter(node.value, depth + 1).join('\n')}\n${indent}}`;
      }
      return `${keyIndent}  ${node.name}: ${stringify(node.value, depth + 1)}`;
    });
    return result;
  };
  return ['{', ...iter(data, 1), '}'].join('\n');
};
