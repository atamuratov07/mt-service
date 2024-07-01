import { useEffect, useState } from 'react'

export const useMountTransition = (isMounted, unmountDelay) => {
	const [showComponent, setShowComponent] = useState(false)
	const mount = isMounted || showComponent
	const show = isMounted && showComponent
	const hide = !isMounted && showComponent

	useEffect(() => {
		let timeoutId

		if (isMounted && !showComponent) {
			setShowComponent(true)
		} else if (!isMounted && showComponent) {
			timeoutId = setTimeout(() => setShowComponent(false), unmountDelay)
		}

		return () => clearTimeout(timeoutId)
	}, [unmountDelay, isMounted, showComponent])

	return { mount, show, hide }
}
