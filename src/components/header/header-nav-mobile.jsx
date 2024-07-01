import { useEffect } from 'react'
import { cn, lockDocumentScroll } from '../../lib/utils'

export const HeaderNavMobile = ({
	data,
	isActive,
	onItemClick,
	activeItemId,
}) => {
	useEffect(() => {
		lockDocumentScroll(isActive)
	}, [isActive])

	if (!data) return null

	if (!activeItemId) activeItemId = data[0].id

	return (
		<nav
			className={cn(
				'fixed z-50 -top-full left-0 pt-20 h-full w-full bg-bg-blue overflow-y-auto md:overflow-hidden',
				'transition-[top] duration-500',
				{
					'top-0': isActive,
				}
			)}
		>
			<ul className=''>
				{data.map(item => (
					<li
						key={item.id}
						data-id={item.id}
						className=' border-solid border-t border-slate-800 last:border-b'
					>
						<a
							href={item.url}
							onClick={() => onItemClick(item.id)}
							className={cn(
								'text-center text-lg text-ternary uppercase',
								'block p-4 md:py-3',
								'transition-colors hover:bg-hover',
								{
									'bg-active text-accent': activeItemId === item.id,
								}
							)}
						>
							{item.title}
						</a>
					</li>
				))}
			</ul>
		</nav>
	)
}
