// Minimal React Native shim for the Next.js server build.
// Avoid pulling in the full `react-native-web` package during SSR/build time.
const React = require('react');

function createElement(tag) {
	return function (props) {
		const { children, style, ...rest } = props || {};
		return React.createElement(tag, rest, children);
	};
}

module.exports = {
	View: createElement('div'),
	Text: createElement('span'),
	Pressable: createElement('button'),
	// basic placeholders for common RN exports
	StyleSheet: {
		create: (s) => s,
	},
	Platform: { OS: 'web' },
	Image: createElement('img'),
	// fall back to an empty object for anything else
};
