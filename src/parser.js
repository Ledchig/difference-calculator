import yaml from 'js-yaml';

const parsers = (ext) => {
  switch (ext) {
    case '.json':
      return JSON.parse;
    case '.yml': case '.yaml':
      return yaml.load;
    default:
      throw new Error(`Unknown format - ${ext}`);
  }
};

export default (data, ext) => parsers(ext)(data);
