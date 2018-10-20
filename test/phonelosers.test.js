var assert = require("assert");
var fs = require("fs");
var path = require("path");
var request = require("request");

var parse = require("../parse");

describe("Parse file", function() {

	var parsedFile;
	
	before(function(done) {

		fs.readFile(path.resolve(__dirname, "./phonelosers.org.xml"), "utf8", function (err, data) {
			if (err) throw err;
			parse(data, function(err, parsedData) {
				if (err) throw err;
				parsedFile = parsedData;	
				done();
			});
		});
	});

	it("description long", function() {
		assert.equal(parsedFile.description.long, "home of The Snow Plow Show wacky morning podcast");
	});

	it("description short", function() {
		assert.equal(parsedFile.description.short, "Prank phone calls and other wacky morning humor by the people at Phone Losers of America");
	});

	it("episode count", function() {
		assert.equal(parsedFile.episodes.length, 100);
	});

	it("title", function() {
		assert.equal(parsedFile.title, "Phone Losers of America");
	});
});
/*
describe('Parse URL', function() {

	var parsedFeed;
	
	before(function(done) {

		request('http://www.phonelosers.org/feed/', (err, res, data) => {
			if (err) {
				console.error('Network error', err);
				return;
			}

			parser.parse(data, (err, parsedData) => {
				if (err) {
					console.error('Parsing error', err);
					return;
				}


				parsedFeed = parsedData;	
				done();
			});
		});
	});

	describe('#parse()', function() {

		it('should find 100 episodes', function() {
			assert.equal(parsedFeed.episodes.length, 100);
		});
	});
});
*/
