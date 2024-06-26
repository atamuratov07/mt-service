import { useOutsideClick } from '../../hooks/useOutsideClick'
import { cn } from '../../lib/utils'

export function MenuBurger({ isActive, onClick, onBlur }) {
	const ref = useOutsideClick(onBlur)
	return (
		<div
			ref={ref}
			onClick={onClick}
			className='cursor-pointer text-ternary w-12 h-11 p-2.5 transition-colors rounded-sm hover:bg-accent'
		>
			<div
				className={cn(
					'relative top-0 w-full h-1 rounded-sm bg-current translate-y-2.5 transition-all duration-0 delay-300',
					'before:content-[""] before:absolute before:left-0 before:bottom-2.5  before:w-full before:h-1 before:rounded-sm before:bg-current before:transition-burger-bottom',
					'after:content-[""] after:left-0 after:top-2.5 after:absolute after:w-full after:h-1 after:rounded-sm after:bg-current after:transition-burger-top',
					{
						'bg-transparent before:-rotate-45 before:bottom-0 before:transition-burger-bottom-after after:rotate-45 after:top-0 after:transition-burger-top-after':
							isActive,
					}
				)}
			/>
		</div>
	)
}
