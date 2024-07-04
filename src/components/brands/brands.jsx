import { useAppContext } from '../../context/app-context'
import { cn } from '../../lib/utils'
import { Marquee } from '../ui/marquee'

export function Brands() {
	const { brands: brandsData, baseDir } = useAppContext()

	if (!brandsData?.length) return

	const brandElements = brandsData.map(brandData => {
		return ({ isActive }) => (
			<img
				src={baseDir + brandData.image}
				alt={brandData.name}
				title={brandData.name}
				className={cn(
					'block w-full h-8 md:h-10 grayscale group-hover/marquee-item:grayscale-0 group-active/marquee-item:group-hover:grayscale-0 select-none touch-none pointer-events-none transition-[filter]',
					{ 'grayscale-0': isActive }
				)}
			/>
		)
	})

	return (
		<section id='brands' className='pb-8 pt-40 md:pt-16'>
			<Marquee className='h-12 md:h-20' items={brandElements} speed={120} />
			<Marquee
				className='h-12 md:h-20'
				items={brandElements}
				direction='right'
			/>
		</section>
	)
}
