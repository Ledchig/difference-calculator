#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../src';

const program = new Command();

program
	.description(`Compares two configuration files and shows a difference.`)
	.version(`0.0.1`)
	.arguments('<filepath1>', '<filepath2>')
	.argument()
	.option('-f, --format <type>', 'output format')
	.action((filePath1, filePath2) => {
		console.log(genDiff(filePath1, filePath2));
	});


program.parse();