import { useEffect, useState } from 'react'

export const useMountTransition = (isMounted, unmountDelay) => {
	const [showComponent, setShowComponent] = useState(false)

	useEffect(() => {
		let timeoutId

		if (isMounted && !showComponent) {
			setShowComponent(true)
		} else if (!isMounted && showComponent) {
			timeoutId = setTimeout(() => setShowComponent(false), unmountDelay)
		}

		return () => clearTimeout(timeoutId)
	}, [unmountDelay, isMounted, showComponent])

	return showComponent
}
