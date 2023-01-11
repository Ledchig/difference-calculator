install:
	npm ci;
	npm link;
gendiff:
	node bin/gendiff.js;
lint:
	npx eslint .;
test:
	npm run test-coverage;
