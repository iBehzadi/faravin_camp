module.exports = {
	globDirectory: 'src/',
	globPatterns: [
		'**/*.{vue,css,eot,ttf,woff,woff2,svg,png,webp,ts,json,txt,scss,js}'
	],
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/,
		/^salam/
	],
	swDest: 'src/sw/sw.js'
};