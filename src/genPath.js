import path from 'path';

const genPath = (filePath) => {
  const newPath = path.resolve(process.cwd(), filePath);
  return newPath;
};
export default genPath;
