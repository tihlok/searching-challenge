const https=require("https");
const sha1=require("crypto")
	.createHash("sha1");
const fs=require("fs");

const file="output.txt";
const regex=/key=[a-zA-Z0-9]*, age=[0-9]*/gm;
const filter=(f) => f.value === 32;

function _parse(data) {
	const parsed=[];
	data=JSON.parse(data).data;

	let sub;
	while((sub=regex.exec(data)) !== null) {
		if(sub.index === regex.lastIndex) regex.lastIndex++;
		sub.forEach((match) => {
			const split=match.split(", ");
			parsed.push({ key: split[0].substr(4), value: parseInt(split[1].substr(4)) });
		});
	}

	return parsed;
}

function _generateText(list) {
	return `${list.map((f) => f.key)
	              .join("\n")}\n`;
}

function _process(data) {
	const parsed=_parse(data);
	const filtered=parsed.filter(filter);
	const text=_generateText(filtered);
	fs.writeFileSync(file, text);
	return sha1.update(fs.readFileSync(file))
	           .digest("hex");
}

async function calculateDataSHA1(url, filter) {
	return new Promise((resolve, reject) => {
		try {
			https.get(url, (res) => {
				let data="";
				res.on("data", (chunk) => data+=chunk);
				res.on("end", () => {
					try {
						const processedData=_process(data);
						return resolve(processedData);
					} catch(e) {
						return reject(e);
					}
				});
			});
		} catch(e) {
			return reject(e);
		}
	})

}

const url="https://coderbyte.com/api/challenges/json/age-counting";

module.exports={
	calculateDataSHA1: calculateDataSHA1
};
