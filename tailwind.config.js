/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			keyframes: {
				scrollRight: {
					to: { right: '-300px' }
				}
			},
			animation: {
				infScroll: 'scrollRight 5s linear infinity'
			}
		}
	},
	plugins: [
		plugin(function ({ matchUtilities, theme }) {
			matchUtilities(
				{ 'animate-delay': (value) => ({ animationDelay: value }) },
				{ value: theme('transitionDelay') }
			);
		})
	]
};
