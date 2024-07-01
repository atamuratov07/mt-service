import { useAppContext } from '../../context/app-context'
import { Marquee } from '../ui/marquee'

export function Brands() {
	const { brands: brandsData, baseDir } = useAppContext()

	if (!brandsData?.length) return

	const brandElements = brandsData.map(brandData => {
		return () => (
			<img
				src={baseDir + brandData.image}
				alt={brandData.name}
				title={brandData.name}
				className='block w-full h-8 md:h-10 grayscale hover:grayscale-0 active:grayscale-0 transition-[filter]'
			/>
		)
	})

	return (
		<section id='brands' className='py-8 md:pt-16'>
			<Marquee className='h-12 md:h-20' items={brandElements} speed={120} />
			<Marquee
				className='h-12 md:h-20'
				items={brandElements}
				direction='right'
			/>
		</section>
	)
}
