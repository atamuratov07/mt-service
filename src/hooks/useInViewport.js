import { useEffect, useState } from 'react'

export function useInViewport(ref, callback = () => {}, options = {}) {
	const [inViewport, setInViewport] = useState(false)

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			callback(entry)
			setInViewport(entry.isIntersecting)
		}, options)

		const currentRef = ref.current
		if (currentRef) observer.observe(currentRef)

		return () => {
			if (currentRef) observer.unobserve(currentRef)
		}
	}, [options, ref])

	return inViewport
}
