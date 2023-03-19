#!/usr/bin/env node

import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

test.each([
  ['file1.json', 'file2.json', 'stylish', 'trueResultStylish.txt'],
  ['file1.yml', 'file2.yml', 'stylish', 'trueResultStylish.txt'],
  ['file1.yaml', 'file2.yaml', 'stylish', 'trueResultStylish.txt'],
  ['file1.json', 'file2.json', 'plain', 'trueResultPlain.txt'],
  ['file1.yml', 'file2.yml', 'plain', 'trueResultPlain.txt'],
  ['file1.yaml', 'file2.yaml', 'plain', 'trueResultPlain.txt'],
  ['file1.yml', 'file2.yml', 'json', 'trueResultJson.txt'],
])('compare %p %p %p', (file1, file2, format, result) => {
  const received = genDiff(getFixturePath(file1), getFixturePath(file2), format);
  const expected = readFileSync(getFixturePath(result), { encoding: 'utf-8' });
  expect(received).toEqual(expected);
});

test('default format', () => {
  const received = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  const expected = readFileSync(getFixturePath('trueResultStylish.txt'), { encoding: 'utf-8' });
  expect(received).toEqual(expected);
});

test('Error while ext is unknown format', () => {
  expect(() => {
    genDiff(getFixturePath('file1.ext'), getFixturePath('file2.ext'));
  }).toThrow('Unknown format - .ext');
});

test('Error while format incorrect or not supported', () => {
  expect(() => {
    genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stilish');
  }).toThrow('stilish format is incorrect or not supported.');
});
