all: lint test

lint:
	@node_modules/.bin/jshint \
		--reporter node_modules/jshint-stylish/stylish.js \
		fundash.js tests/*.js

test:
	@node_modules/.bin/mocha \
		--reporter spec \
		tests/*.js

.PHONY: all
