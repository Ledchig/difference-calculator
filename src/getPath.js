import path from 'path';

const getPath = (filePath) => {
  const path = path.resolve(process.cwd(), filePath);
  return path;
};
export default getPath;