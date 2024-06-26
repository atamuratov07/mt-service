import { useEffect } from 'react'
import { cn, lockDocumentScroll } from '../../lib/utils'

export function HeaderNav({
	data,
	className,
	isOpen,
	activeItemId = data[0].id,
	onItemClick,
}) {
	if (!data) return null

	useEffect(() => {
		lockDocumentScroll(isOpen)
	}, [isOpen])

	return (
		<div className={className}>
			<nav
				className={cn(
					'fixed z-50 -top-full left-0 pt-20 h-full w-full bg-bg-blue overflow-y-auto',
					'md:static md:pt-0 md:h-auto md:bg-bg-gray md:border-solid md:border-y md:border-gray-200',
					'transition-[top] duration-500',
					{
						'top-0': isOpen,
					}
				)}
			>
				<ul className='md:container md:flex md:items-center'>
					{data.map(item => (
						<li
							key={item.id}
							data-id={item.id}
							className='md:flex-auto 
							border-solid border-t border-slate-800 last:border-b md:border-gray-200 md:border-y-0 md:border-l md:last:border-y-0 md:last:border-r'
						>
							<a
								href={item.url}
								onClick={onItemClick}
								className={cn(
									'text-center text-lg text-ternary md:text-primary md:font-medium uppercase md:normal-case',
									'block p-4 md:px-0',
									'transition-colors hover:text-accent hover:bg-hover md:hover:bg-accent md:hover:text-ternary',
									{
										'bg-active text-accent md:text-ternary md:bg-accent':
											activeItemId === item.id,
									}
								)}
							>
								{item.title}
							</a>
						</li>
					))}
				</ul>
			</nav>
		</div>
	)
}
