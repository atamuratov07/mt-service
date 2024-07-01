import { useEffect, useState } from 'react'
import { useAppContext } from '../../context/app-context'
import { SearchSelect } from '../ui/search-select/search-select'

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

function RenderPricesList({ pricesData }) {
	if (!pricesData?.length) {
		return (
			<div className='flex justify-center py-20 font-bold text-2xl'>
				Ничего не найдено
			</div>
		)
	}

	return (
		<div className='space-y-5 mt-8 md:px-5'>
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
	)
}

const getPricesData = (productCategoriesData, query = '') => {
	if (!productCategoriesData) return []

	return productCategoriesData
		.filter(item => !query || query.includes(item.id))
		.map(item => ({
			id: item.id,
			prices: item.prices,
			title: item.title,
		}))
}

const getSearchOptions = productCategoriesData => {
	if (!productCategoriesData) return []

	return productCategoriesData.map(item => ({
		name: item.title,
		items: item.kinds.map(kind => ({
			value: item.id + ' ' + kind,
			name: kind,
		})),
	}))
}

export function Prices() {
	const { productCategories: productCategoriesData } = useAppContext()

	const [pricesData, setPricesData] = useState()
	const [searchOptions, setSearchOptions] = useState([])

	useEffect(() => {
		setPricesData(getPricesData(productCategoriesData))
		setSearchOptions(getSearchOptions(productCategoriesData))
	}, [productCategoriesData])

	const onOptionChange = newOption => {
		setPricesData(getPricesData(productCategoriesData, newOption.value))
	}

	return (
		<section id='prices' className='container py-8 md:pt-16'>
			<div className='space-y-5 lg:flex items-center justify-between'>
				<h3 className='text-center md:text-start text-3xl md:text-4xl font-condensed font-bold'>
					Цены на все виды услуг
				</h3>

				<SearchSelect
					options={searchOptions}
					onChange={onOptionChange}
					classes={{ container: 'min-w-80 max-w-full' }}
				/>
			</div>

			<RenderPricesList pricesData={pricesData} />
		</section>
	)
}
