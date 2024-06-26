import { useAppContext } from '../../context/app-context/app-context-provider'
import { cn } from '../../lib/utils'
import { Icon } from '../ui/icon'

export function Advantages({ className }) {
	const { advantages: advantagesData } = useAppContext()

	if (!advantagesData || !advantagesData.length) return null

	return (
		<div
			className={cn(
				'space-y-5 md:space-y-0 md:flex justify-between items-stretch gap-5',
				className
			)}
		>
			{advantagesData.map(item => (
				<div
					key={item.id}
					className={cn(
						'rounded-sm p-4 sm:p-5 md:p-3 lg:p-5 xl:p-7 flex flex-1 items-center shadow-xl bg-ternary',
						{
							'bg-accent text-ternary': item.accent,
						}
					)}
				>
					<Icon
						name={item.icon}
						className={cn(
							'fill-gray-600 w-10 h-10 lg:w-12 lg:h-12 xl:w-16 xl:h-16 flex-fixed',
							{
								'fill-ternary': item.accent,
							}
						)}
					/>

					<p className='pl-5 font-medium text-start text-sm lg:text-base'>
						{item.text}
					</p>
				</div>
			))}
		</div>
	)
}
