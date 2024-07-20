/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			keyframes: {
				scrollRight: {
					'0%, 100%': { right: '-500px' }
				}
			},
			animation: {
				infScroll: 'scrollRight 45s linear infinity'
			}
		}
	},
	plugins: []
};
