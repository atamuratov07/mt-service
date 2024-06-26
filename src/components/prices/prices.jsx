import { useAppContext } from '../../context/app-context'

function RenderTable({ prices }) {
	return (
		<table className='w-full text-start min-w-[430px] border-collapse text-slate-600'>
			<thead>
				<tr>
					<th className='text-start bg-stone-300 text-sm md:text-base px-2.5 py-2 md:p-3 text-primary border border-solid border-stone-300'>
						НАИМЕНОВАНИЕ УСЛУГИ
					</th>
					<th className='text-start bg-stone-300 text-sm md:text-base px-2.5 py-2 md:p-3 text-primary border border-solid border-stone-300'>
						ЦЕНА
					</th>
				</tr>
			</thead>
			<tbody>
				{prices.map(({ service, price }, i) => (
					<tr key={i}>
						<td className='text-sm p-2 md:text-base border border-stone-300 border-solid'>
							{service}
						</td>
						<td className='text-sm p-2 md:text-base border border-stone-300 border-solid'>
							{price}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}

const getPricesData = productCategoriesData =>
	productCategoriesData.map(item => ({
		id: item.id,
		prices: item.prices,
		title: item.title,
	}))

export function Prices() {
	const { productCategories: productCategoriesData } = useAppContext()

	if (!productCategoriesData || !productCategoriesData.length) return null

	const pricesData = getPricesData(productCategoriesData)

	return (
		<section id='prices' className='container py-8 md:pt-16'>
			<h3 className='text-center md:text-start text-3xl md:text-4xl font-condensed font-bold'>
				Цены на все виды услуг
			</h3>

			<div className='space-y-5 mt-8 md:pl-5'>
				{pricesData.map(({ title, id, prices }, i) => (
					<article key={i} id={id}>
						<h4 className='text-accent text-xl md:text-2xl font-condensed font-bold'>
							{title}
						</h4>
						<div className='overflow-x-auto mt-2'>
							<RenderTable prices={prices} />
						</div>
					</article>
				))}
			</div>
		</section>
	)
}
