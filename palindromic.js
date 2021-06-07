function searchLongestPalindromic(str) {
	let longest="";

	for(let i=0; i < str.length; i++) {
		for(let j=i + 1; j < i + 2; j++) {
			let left=i;
			let right=j;
			while(left >= 0 && right < str.length &&
			(str[left] === str[right] || str[left - 1] === str[right])) {
				let value=str.substr(left, 1 + right - left);
				if(value[0] !== value[value.length - 1])
					value=str.substr(left - 1, 2 + right - left);

				if(value.length > longest.length) longest=value;
				left--;
				right++;
			}
		}
	}

	return longest.length > 2 ? longest : "none";
}

module.exports = {
	searchLongestPalindromic: searchLongestPalindromic
}
