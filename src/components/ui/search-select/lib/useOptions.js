import { useEffect, useRef, useState } from 'react'
import { flattenOptions, fuzzySearch } from './utils'

export function useOptions(allOptions, debounceTime, search) {
	const allOptionsRef = useRef(flattenOptions(allOptions))

	const [options, setOptions] = useState(() => allOptionsRef.current)
	const [fetching, setFetching] = useState(false)

	useEffect(() => {
		setFetching(true)

		const timeout = setTimeout(() => {
			if (search === '') {
				setOptions(allOptionsRef.current)
			} else {
				setOptions(fuzzySearch(allOptionsRef.current, search))
			}
			setFetching(false)
		}, debounceTime)

		return () => {
			clearTimeout(timeout)
		}
	}, [search])

	useEffect(() => {
		allOptionsRef.current = flattenOptions(allOptions)
		setOptions(allOptionsRef.current)
	}, [allOptions])

	return [options, fetching]
}
