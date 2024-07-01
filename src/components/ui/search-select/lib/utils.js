export function groupOptions(options) {
	const nextOptions = []

	options.forEach(option => {
		if (option.group) {
			const group = nextOptions.findIndex(
				o => o.items && o.name === option.group
			)

			if (group >= 0) {
				nextOptions[group].items.push(option)
			} else {
				nextOptions.push({
					items: [option],
					name: option.group,
				})
			}
		} else {
			nextOptions.push(option)
		}
	})

	return nextOptions
}

export function flattenOptions(options) {
	let index = 0

	return options
		.map(option => {
			if (option.items) {
				return option.items.map(o => ({
					...o,
					group: option.name,
					index: index++,
				}))
			}

			return { ...option, index: index++ }
		})
		.flat()
}

function search(q, text) {
	const searchLength = q.length
	const textLength = text.length

	if (searchLength > textLength) return false

	if (text.indexOf(q) >= 0) return true

	mainLoop: for (let i = 0, j = 0; i < searchLength; i++) {
		const ch = q.charCodeAt(i)

		while (j < textLength) {
			if (text.charCodeAt(j++) === ch) {
				continue mainLoop
			}
		}

		return false
	}

	return true
}
export function fuzzySearch(options, query) {
	return !query.length
		? []
		: options.filter(o =>
				search(
					query.toLowerCase(),
					`${o.name} ${o.group || ''}`.trim().toLowerCase()
				)
		  )
}
