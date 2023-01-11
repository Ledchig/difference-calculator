#!/usr/bin/env node
/* eslint-disable import/no-extraneous-dependencies */

import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

test('', () => {
  const filePath1 = getFixturePath('file1.json');
  const filePath2 = getFixturePath('file2.json');
  const received = genDiff(filePath1, filePath2);
  const expected = readFileSync(getFixturePath('trueResult.json'), { encoding: 'utf-8' });
  expect(received).toEqual(expected);
});
