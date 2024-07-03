import { useEffect, useRef, useState } from 'react'
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
	if (!pricesData || !pricesData.length) {
		return (
			<div className='flex justify-center text-center py-20 font-bold text-2xl'>
				Введите в поисковик нужную вам услугу
			</div>
		)
	}

	return (
		<div className='space-y-5 mt-8 md:px-5'>
			{pricesData.map(({ name, prices, warnings }, i) => (
				<article key={i} id={name}>
					<h4 className='text-accent text-xl md:text-2xl font-condensed font-bold'>
						{name}
					</h4>
					<div className='overflow-x-auto mt-2'>
						<RenderTable prices={prices} />
					</div>
					<ul className='flex flex-col text-gray-500 py-2 leading-7'>
						{warnings.map((text, i) => (
							<li key={i}>{`* ${text}`}</li>
						))}
					</ul>
				</article>
			))}
		</div>
	)
}

const getPricesData = (productCategoriesData, option) => {
	if (!productCategoriesData || !option) return []

	return productCategoriesData
		.find(category => option.group === category.title)
		?.kinds?.filter(kind => kind.name === option.value)
}

const getSearchOptions = productCategoriesData => {
	if (!productCategoriesData) return []

	return productCategoriesData.map(category => ({
		name: category.title,
		items: category.kinds.map(kind => ({
			value: kind.name,
			name: kind.name,
		})),
	}))
}

export function Prices() {
	const { productCategories: productCategoriesData } = useAppContext()

	const [pricesData, setPricesData] = useState()
	const [searchOptions, setSearchOptions] = useState([])
	const optionRef = useRef(null)

	useEffect(() => {
		setPricesData(getPricesData(productCategoriesData, optionRef.current))
		setSearchOptions(getSearchOptions(productCategoriesData))
	}, [productCategoriesData])

	const onOptionChange = newOption => {
		setPricesData(getPricesData(productCategoriesData, newOption))
		optionRef.current = newOption
	}

	return (
		<section id='prices' className='container py-8 md:pt-16'>
			<div className='space-y-5 lg:flex items-center justify-between'>
				<h3 className='text-center md:text-start text-3xl md:text-4xl font-condensed font-bold'>
					Услуги и Цены
				</h3>

				<SearchSelect
					options={searchOptions}
					onChange={onOptionChange}
					classes={{ container: 'md:min-w-80 max-w-full' }}
				/>
			</div>
			<RenderPricesList pricesData={pricesData} />
		</section>
	)
}
