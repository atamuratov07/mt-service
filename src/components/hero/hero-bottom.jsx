import { useAppContext } from '../../context/app-context'
import { cn } from '../../lib/utils'
import { Icon } from '../ui/icon'

const RenderContacts = ({ className }) => {
	return (
		<ul className={cn('flex flex-wrap gap-x-10 justify-center', className)}>
			<li className='flex flex-nowrap gap-x-2'>
				<Icon
					name='phone'
					className='text-accent-secondary p-1 w-8 rounded-full aspect-square overflow-visible'
				/>

				<a href='tel:+998909270731' className='text-2xl'>
					+998 90 927-07-31
				</a>
			</li>
			<li className='flex flex-nowrap gap-x-2'>
				<Icon
					name='phone'
					className='text-accent-secondary p-1 w-8 rounded-full aspect-square overflow-visible'
				/>

				<a href='tel:+998998226362' className='text-2xl'>
					+998 99 822-63-62
				</a>
			</li>
		</ul>
	)
}

export function HeroBottom() {
	const { baseDir } = useAppContext()

	return (
		<div className='bg-white py-8'>
			<div className='container text-xl font-black uppercase text-primary-alt text-center lg:text-start space-y-10'>
				<div className='lg:flex justify-between md:space-y-10 lg:space-y-0'>
					<div className='space-y-4'>
						<h1 className='font-heavy text-3xl lg:text-4xl'>
							<span className='text-accent-secondary text-7xl lg:text-8xl'>
								Ремонт
							</span>
							<br />
							Бытовой техники
						</h1>
						<ul className='flex flex-col items-center lg:items-start text-nowrap'>
							<li className='relative w-fit before:content-[""] before:absolute before:top-1/2 before:-translate-y-1/2 before:-left-3 before:block before:bg-accent-secondary before:rounded-full before:w-1 before:aspect-square'>
								Роботы-пылесосы
							</li>
							<li className='relative w-fit before:content-[""] before:absolute before:top-1/2 before:-translate-y-1/2 before:-left-3 before:block before:bg-accent-secondary before:rounded-full before:w-1 before:aspect-square'>
								Микроволновые печи
							</li>
							<li className='relative w-fit before:content-[""] before:absolute before:top-1/2 before:-translate-y-1/2 before:-left-3 before:block before:bg-accent-secondary before:rounded-full before:w-1 before:aspect-square'>
								Телевизоры
							</li>
							<li className='relative w-fit before:content-[""] before:absolute before:top-1/2 before:-translate-y-1/2 before:-left-3 before:block before:bg-accent-secondary before:rounded-full before:w-1 before:aspect-square'>
								Утюги
							</li>
							<li className='relative w-fit before:content-[""] before:absolute before:top-1/2 before:-translate-y-1/2 before:-left-3 before:block before:bg-accent-secondary before:rounded-full before:w-1 before:aspect-square'>
								Фены
							</li>
							<li className='relative w-fit before:content-[""] before:absolute before:top-1/2 before:-translate-y-1/2 before:-left-3 before:block before:bg-accent-secondary before:rounded-full before:w-1 before:aspect-square'>
								И другое
							</li>
						</ul>
						<RenderContacts className='hidden lg:block' />
					</div>
					<div className='md:space-y-6 lg:space-y-0'>
						<ul className='hidden md:block relative z-[5] lg:text-right'>
							<li>Режим Работы</li>
							<li>
								Пн - Пт:{' '}
								<span className='text-red-600'>09:00 - 18:00</span>
							</li>
							<li>
								Сб: <span className='text-red-600'>09:00 - 14:00</span>
							</li>
							<li>
								Вс: <span className='text-red-600'>Выходной</span>
							</li>
						</ul>
						<img
							src={baseDir + '/images/hero/appliances.webp'}
							alt='Appliances Image'
							className='block w-full lg:max-w-[600px] lg:translate-y-[-10%]'
						/>
					</div>
				</div>
				<RenderContacts className='lg:hidden' />
			</div>
		</div>
	)
}
