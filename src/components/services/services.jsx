import { useAppContext } from '../../context/app-context'
import { Accordion } from '../ui/accordion'

const getServicesData = productCategoriesData =>
	productCategoriesData.map(item => ({
		title: item.serviceTitle,
		id: item.id,
		kinds: item.kinds,
	}))

export function Services() {
	const { productCategories: productCategoriesData } = useAppContext()

	if (!productCategoriesData || !productCategoriesData.length) return null

	const servicesData = getServicesData(productCategoriesData)

	return (
		<section id='services' className='container py-8 md:pt-16'>
			<h3 className='text-center md:text-start text-3xl md:text-4xl font-condensed font-bold'>
				Наши услуги
			</h3>
			<div className='mt-8'>
				<Accordion initialOpened={servicesData[0].id}>
					{servicesData.map(({ title, id, kinds }) => (
						<Accordion.Group key={id} itemId={id} className=''>
							<Accordion.GroupHeader className='w-full p-2 sm:px-5 bg-accent-gradient text-ternary text-sm md:text-lg font-semibold uppercase gap-x-3'>
								<h4 className='flex-auto text-start'>{title}</h4>
							</Accordion.GroupHeader>
							<Accordion.GroupContent
								className={{
									outer: 'mb-5',
								}}
							>
								<ul className='text-slate-700 p-2'>
									{kinds.map((kind, i) => {
										return (
											<li
												key={i}
												className='leading-8 px-3 even:bg-gray-200'
											>
												{kind}
											</li>
										)
									})}
								</ul>
								<a
									href={`#${id}`}
									className='inline-block font-medium w-full sm:w-auto text-center px-1 py-2 sm:py-2 sm:px-5 rounded-md border-2 border-accent border-solid text-accent hover:bg-accent hover:text-ternary transition-colors'
								>
									Посмотреть цены
								</a>
							</Accordion.GroupContent>
						</Accordion.Group>
					))}
				</Accordion>
			</div>
		</section>
	)
}
