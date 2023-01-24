#!/usr/bin/env node

import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

test.each([
  ['file1.json', 'file2.json', 'trueResult.txt'],
  ['file1.yml', 'file2.yml', 'trueResult.txt'],
  ['file1.yaml', 'file2.yaml', 'trueResult.txt'],
])('compare %p %p %p', (file1, file2, result) => {
  const received = genDiff(getFixturePath(file1), getFixturePath(file2));
  const expected = readFileSync(getFixturePath(result), { encoding: 'utf-8' });
  expect(received).toEqual(expected);
});

test('Error while ext is unknown format', () => {
  expect(() => {
    genDiff(getFixturePath('file1.ext'), getFixturePath('file2.ext'));
  }).toThrow('Unknown format - .ext');
});
