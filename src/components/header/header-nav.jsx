import { cn } from '../../lib/utils'

export const HeaderNav = ({ data, onItemClick = () => {}, activeItemId }) => {
	if (!data) return null

	if (!activeItemId) activeItemId = data[0].id

	return (
		<nav className='overflow-hidden hidden md:block'>
			<ul className='flex items-center gap-2 py-2'>
				{data.map(item => (
					<li key={item.id} data-id={item.id} className=''>
						<a
							href={item.url}
							onClick={() => onItemClick(item.id)}
							className={cn(
								'text-center text-lg text-ternary font-medium normal-case leading-tight',
								'block px-4 py-3 rounded-[3px]',
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
