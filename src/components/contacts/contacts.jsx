import { useAppContext } from '../../context/app-context'
import { cn } from '../../lib/utils'
import { Icon } from '../ui/icon'
import { YandexMap } from './map'

function RenderMedia({ data, className }) {
	return (
		<ul
			className={cn(
				'flex gap-x-4 justify-center sm:justify-start',
				className
			)}
		>
			{data.map(({ name, icon, link }, i) => {
				return (
					<li key={i}>
						<a
							href={link}
							target='_blank'
							title={name}
							className='flex items-center justify-center w-8 h-8 rounded-sm bg-ternary transition-shadow hover:shadow-[0_0_5px] hover:shadow-ternary'
						>
							<Icon name={icon} className='w-5 h-5  text-bg-blue' />
						</a>
					</li>
				)
			})}
		</ul>
	)
}

function RenderContactsInfo({ data }) {
	return (
		<ul className='space-y-2 sm:space-y-5 text-sm sm:text-base lg:text-lg font-medium'>
			<li className='flex gap-3 justify-start items-center'>
				<Icon
					name='clock'
					className='aspect-square min-w-5 max-w-4 sm:min-w-5 lg:w-7 fill-ternary'
				/>
				<table className=''>
					<tbody>
						{data.schedule.map(({ days, time }, i) => {
							return (
								<tr key={i}>
									<td className='pr-2'>{days}</td>
									<td className='pl-2'>{time}</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</li>
			<li className='flex gap-3 justify-start items-center'>
				<Icon
					name='location'
					className='aspect-square min-w-4 max-w-4 sm:min-w-5 lg:w-7 fill-ternary'
				/>
				{data.address.name}
			</li>
			<li className='flex gap-3 justify-start items-center'>
				<Icon
					name='phone'
					className='aspect-square min-w-4 max-w-4 sm:min-w-5 lg:w-7 fill-ternary'
				/>
				<div className='flex flex-col'>
					{data.tels.map(({ link, value }, i) => {
						return (
							<a
								key={i}
								href={`tel:${link}`}
								className='underline hover:text-accent transition-colors'
							>
								{value}
							</a>
						)
					})}
				</div>
			</li>
			<li className='flex gap-3 justify-start items-center'>
				<Icon
					name='email'
					className='aspect-square min-w-4 max-w-4 sm:min-w-5 lg:w-7 fill-ternary'
				/>
				<a
					href={`mailto:${data.email}`}
					className='underline hover:text-accent transition-colors'
				>
					{data.email}
				</a>
			</li>
		</ul>
	)
}

export function Contacts() {
	const { contacts: contactsData, baseDir } = useAppContext()

	if (!contactsData) return null

	return (
		<section
			id='contacts'
			className='pb-8 pt-16 md:pt-24 bg-bg-blue text-ternary'
		>
			<div className='container space-y-8'>
				<h3 className='text-center md:text-start text-3xl md:text-4xl font-condensed font-bold'>
					Контакты
				</h3>
				<div className='p-4 md:p-8 border border-gray-400 flex flex-col md:flex-row gap-4 sm:gap-9 overflow-hidden'>
					<img
						src={baseDir + contactsData.address.photo}
						alt='Address Image'
						className='md:max-w-[40%] object-cover'
					/>
					<div className='space-y-5'>
						<h4 className='text-xl sm:text-2xl lg:text-4xl text-center sm:text-start font-condensed font-bold'>
							Контактная информация
						</h4>
						<RenderContactsInfo data={contactsData} />
						<RenderMedia data={contactsData.media} />
					</div>
				</div>
				<YandexMap address={contactsData.address} />
			</div>
		</section>
	)
}
