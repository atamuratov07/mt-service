import { useEffect, useState } from 'react'

function highlight(current, dir, options) {
	const max = options.length - 1
	let option = null
	let i = -1
	let newHighlighted = current

	while (i++ <= max && (!option || option.disabled)) {
		newHighlighted = dir === 'down' ? newHighlighted + 1 : newHighlighted - 1

		if (newHighlighted < 0) {
			newHighlighted = max
		} else if (newHighlighted > max) {
			newHighlighted = 0
		}

		option = options[newHighlighted]
	}

	return newHighlighted
}

export function useHighlight(options, onSelect, ref, focused) {
	const [highlighted, setHighlighted] = useState(-1)

	useEffect(() => {
		if (focused) setHighlighted(0)
	}, [focused])

	return [
		{
			onKeyDown: e => {
				const key = e.key.replace('Arrow', '').toLowerCase()

				if (key === 'down' || key === 'up') {
					e.preventDefault()
					setHighlighted(highlight(highlighted, key, options))
				}
			},
			onKeyUp: e => {
				if (e.key === 'Escape') {
					e.preventDefault()
					ref.current.blur()
				} else if (e.key === 'Enter') {
					e.preventDefault()

					if (options[highlighted]) onSelect(options[highlighted].value)
				}
			},
		},
		highlighted,
		setHighlighted,
	]
}
