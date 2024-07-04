import {
	forwardRef,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react'
import { cn } from '../../lib/utils'

const RenderMarquee = forwardRef(
	(
		{ length, items, animationDuration, pauseOnHover, isClicked, direction },
		ref
	) => {
		const itemsCount = items.length
		const [activeItem, setActiveItem] = useState(-1)
		const multiplyItems = number => {
			const multiplied = []

			for (let i = 0; i < number; i += itemsCount) {
				multiplied.push(
					...items.map((inner, index) => {
						const order = index + i
						return (
							<li
								key={order}
								onTouchStart={() => setActiveItem(order)}
								onTouchEnd={() => setActiveItem(-1)}
								className='flex items-center justify-center h-full px-5 md:px-10 group/marquee-item'
							>
								{inner({ isActive: activeItem === order })}
							</li>
						)
					})
				)
			}

			return multiplied
		}

		const className = 'flex-[0_0_auto] flex items-center'

		const listProps = {
			style: {
				animationDuration: `${animationDuration}s`,
			},
			className: cn(className, 'animate-duration animate-marquee', {
				'animation-reverse': direction === 'right',
				'animation-paused': isClicked,
				'group-hover/marquee:animation-paused': pauseOnHover,
			}),
		}

		return (
			<>
				<ul {...listProps}>
					<div ref={ref} className={className}>
						{multiplyItems(1)}
					</div>
					{multiplyItems(length - 1)}
				</ul>
				<ul {...listProps}>
					<div className={className}>{multiplyItems(1)}</div>
					{multiplyItems(length - 1)}
				</ul>
			</>
		)
	}
)

export function Marquee({
	className,
	pauseOnHover = true,
	speed = 100,
	items,
	direction = 'left',
}) {
	const [multiplier, setMultiplier] = useState(1)
	const [isClicked, setIsClicked] = useState(false)
	const [marqueeWidth, setMarqueeWidth] = useState(0)

	const containerRef = useRef(null)
	const marqueeRef = useRef(null)

	const duration = useMemo(() => {
		return (marqueeWidth * multiplier) / speed
	}, [marqueeWidth, multiplier, speed])

	const calculateWidth = useCallback(() => {
		if (!marqueeRef.current || !containerRef.current) return

		const { width: containerW } = containerRef.current.getBoundingClientRect()
		const { width: marqueeW } = marqueeRef.current.getBoundingClientRect()

		if (containerW && marqueeW) {
			setMultiplier(Math.ceil(containerW / marqueeW))
		}
		if (marqueeW) setMarqueeWidth(marqueeW)
	}, [containerRef])

	useEffect(() => {
		calculateWidth()

		if (marqueeRef.current && containerRef.current) {
			const resizeObserver = new ResizeObserver(() => calculateWidth())

			resizeObserver.observe(containerRef.current)
			resizeObserver.observe(marqueeRef.current)

			return () => resizeObserver?.disconnect()
		}
	}, [calculateWidth, containerRef])

	return (
		<div
			ref={containerRef}
			onTouchStart={() => setIsClicked(true)}
			onTouchEnd={() => setIsClicked(false)}
			className={cn(
				'w-full',
				className,
				'overflow-hidden flex flex-row group/marquee'
			)}
		>
			<RenderMarquee
				ref={marqueeRef}
				items={items}
				length={multiplier}
				animationDuration={duration}
				pauseOnHover={pauseOnHover}
				isClicked={isClicked}
				direction={direction}
			/>
		</div>
	)
}
