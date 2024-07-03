import { useEffect, useRef, useState } from 'react'
import { useAppContext } from '../../context/app-context'
import { cn } from '../../lib/utils'
import { HeroBottom } from './hero-bottom'
import { HeroTop } from './hero-top'

export function Hero({ duration = 3000 }) {
	const { hero: heroData } = useAppContext()
	const [isActive, setIsActive] = useState(false)
	const [stopped, setStopped] = useState(false)
	const ref = useRef(null)

	useEffect(() => {
		if (stopped) return

		let timeout = setTimeout(function timeoutCb() {
			setIsActive(isActive => !isActive)
			timeout = setTimeout(timeoutCb, duration)
		}, duration)

		return () => {
			clearTimeout(timeout)
		}
	}, [duration, stopped])

	if (!heroData) return null

	const className =
		'absolute opacity-0 invisible pointer-events-none scale-95 md:static md:opacity-100 md:visible md:pointer-events-auto md:scale-100'

	return (
		<div
			ref={ref}
			className='flex lg:flex-col'
			onMouseEnter={() => setStopped(true)}
			onMouseLeave={() => setStopped(false)}
			onTouchStart={() => setStopped(true)}
			onTouchEnd={() => setStopped(false)}
		>
			<div
				className={cn('basis-full md:basis-1/2 transition-all', {
					[className]: isActive,
				})}
			>
				<HeroTop />
			</div>
			<div
				className={cn('basis-full md:basis-1/2 transition-all', {
					[className]: !isActive,
				})}
			>
				<HeroBottom />
			</div>
		</div>
	)
}
