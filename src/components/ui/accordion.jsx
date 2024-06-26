import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useOutsideClick } from '../../hooks/useOutsideClick'
import { cn } from '../../lib/utils'
import { Icon } from './icon'

const AccordionContext = createContext({ opened: null })

export function Accordion({ initialOpened, onChange, children, ...props }) {
	const [opened, setOpened] = useState(null)
	const ref = useOutsideClick(() => setOpened(null))

	useEffect(() => {
		setOpened(initialOpened || null)
	}, [])

	useEffect(() => {
		onChange?.(opened)
	}, [opened])

	const onItemClick = (id, isOpen) => setOpened(isOpen ? null : id)

	return (
		<ul {...props} ref={ref}>
			<AccordionContext.Provider value={{ opened, onItemClick }}>
				{children}
			</AccordionContext.Provider>
		</ul>
	)
}

const AccordionGroupContext = createContext(null)
Accordion.Group = function AccordionGroup({
	itemId,
	className,
	children,
	...props
}) {
	const [opened, setOpened] = useState(false)

	useEffect(() => {})

	return (
		<li className={cn('', className)} {...props}>
			<AccordionGroupContext.Provider value={{ id: itemId }}>
				{children}
			</AccordionGroupContext.Provider>
		</li>
	)
}

Accordion.GroupHeader = function AccordionHeader({
	className,
	children,
	...props
}) {
	const context = useContext(AccordionContext)
	const { id: itemId } = useContext(AccordionGroupContext)
	const isOpen = context?.opened === itemId

	return (
		<button
			type='button'
			onClick={() => context?.onItemClick?.(itemId, isOpen)}
			className={cn('flex justify-between items-center', className)}
			{...props}
		>
			{children}
			<Icon
				name='chevron-right'
				className={cn(
					'flex-fixed w-3 h-3 sm:w-5 sm:h-5 rotate-90 transition-transform fill-current',
					{
						'-rotate-90': isOpen,
					}
				)}
			/>
		</button>
	)
}

Accordion.GroupContent = function AccordionContent({
	children,
	className,
	...props
}) {
	const context = useContext(AccordionContext)
	const { id: itemId } = useContext(AccordionGroupContext)
	const ref = useRef(null)
	const isOpen = context?.opened === itemId

	return (
		<div
			className={cn('overflow-y-hidden transition-all', className.outer)}
			style={{
				height: isOpen ? ref.current?.offsetHeight || 0 : 0,
			}}
			{...props}
		>
			<div ref={ref} className={cn('', className.inner)}>
				{children}
			</div>
		</div>
	)
}
