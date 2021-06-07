require("mocha");
const chai=require("chai");
chai.should();
chai.config.includeStack=true;
chai.config.truncateThreshold=0;

const palindromic=require("./palindromic");

function _testPalindromic(str, correct="none") {
	const searched=palindromic.searchLongestPalindromic(str);
	searched.should.be.equals(correct, `${str} is wrong, right value is ${correct}`);
}

describe("SearchingChallenge", () => {
	it("should test [hellosannasmith] palindromic", (done) => {
		_testPalindromic("hellosannasmith", "sannas");
		done();
	});

	it("should test [abcdefgg] palindromic", (done) => {
		_testPalindromic("abcdefgg");
		done();
	});

	it("should test [wwwwwraceecar] palindromic", (done) => {
		_testPalindromic("wwwwwraceecar", "raceecar");
		done();
	});

	it("should test [raceecar] palindromic", (done) => {
		_testPalindromic("raceecar", "raceecar");
		done();
	});

	it("should test [racecar] palindromic", (done) => {
		_testPalindromic("racecar", "racecar");
		done();
	});

	it("should test [racxecar] palindromic", (done) => {
		_testPalindromic("racxecar");
		done();
	});

	it("should test [xxxxracecarwww] palindromic", (done) => {
		_testPalindromic("xxxxracecarwww", "racecar");
		done();
	});
});
