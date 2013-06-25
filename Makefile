
build: components index.js boxes.css template.js
	@component build --dev

template.js: template.html
	@component convert $<

template.html: template.jade
	@jade -P $<

components: component.json
	@component install --dev

clean:
	rm -fr build components template.js

example:
	@open test/example.html

test:
	@testem test/testem.json

.PHONY: clean example test
