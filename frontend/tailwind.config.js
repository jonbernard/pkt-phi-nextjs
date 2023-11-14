/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ['var(--font-gillSans)'],
			},
			colors: {
				brand: {
					primary: '#A6192E',
					secondary: '#D9D9D6',
					tertiary: '#5B6770',
					'accent-primary': '#F2A900',
					'accent-secondary': '#D50032',
					'gray-100': '#D0D0CE',
					'gray-400': '#63666A',
					'black': '#27251F',
				},
			}
		},
	},
	plugins: [],
}