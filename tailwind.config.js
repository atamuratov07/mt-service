/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss'
import * as defaultTheme from 'tailwindcss/defaultTheme'

export default {
	content: [
		'./pages/**/*.{js,jsx}',
		'./components/**/*.{js,jsx}',
		'./app/**/*.{js,jsx}',
		'./src/**/*.{js,jsx}',
	],
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '0.5rem',
				sm: '2rem',
				lg: '4rem',
				xl: '5rem',
				'2xl': '6rem',
			},
		},
		extend: {
			transitionProperty: {
				backdrop: 'backdrop',
			},

			textShadow: {
				sm: '0 1px 2px var(--tw-shadow-color)',
				DEFAULT: '0 2px 4px var(--tw-shadow-color)',
				lg: '0 8px 16px var(--tw-shadow-color)',
			},
			backgroundImage: {
				'hero-pattern': "url('/src/assets/images/hero-image.jpg')",
			},
			fontFamily: {
				sans: ['var(--font-primary)', defaultTheme.fontFamily.sans],
				condensed: 'var(--font-secondary)',
				heavy: 'var(--font-ternary)',
			},
			colors: {
				primary: { DEFAULT: 'var(--color-dark)', alt: 'var(--color-gray)' },
				secondary: {
					DEFAULT: 'var(--color-purple)',
					alt: 'var(--color-purple-light)',
				},
				ternary: 'var(--color-white)',
				hover: 'var(--color-purple-dark)',
				active: 'var(--color-blue-dark)',
				accent: 'var(--color-blue)',
				'accent-secondary': 'var(--color-orange)',

				bg: {
					DEFAULT: 'var(--color-bg-white)',
					blue: 'var(--color-bg-purple-dark)',
					gray: 'var(--color-bg-gray-light)',
				},
				'dark-blue': 'var(--color-icon)',
			},
		},
	},
	future: {
		hoverOnlyWhenSupported: true,
	},
	plugins: [
		plugin(({ matchUtilities, theme }) => {
			matchUtilities(
				{
					'text-shadow': value => ({
						textShadow: value,
					}),
				},
				{ values: theme('textShadow') }
			)
		}),
		plugin(({ matchUtilities, theme }) => {
			matchUtilities({
				'animate-duration': value => ({
					animationDuration: value,
				}),
			})
		}),
	],
}
