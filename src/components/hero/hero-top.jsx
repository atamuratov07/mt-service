import { useAppContext } from '../../context/app-context'
import { Icon } from '../ui/icon'

export function HeroTop() {
	const { baseDir } = useAppContext()

	return (
		<div className='bg-zinc-800 py-8 h-full  lg:h-auto'>
			<div className='container flex flex-col gap-y-8 justify-between h-full font-black uppercase text-xl text-white text-center lg:text-start'>
				<img
					src={baseDir + '/images/logo-white.webp'}
					alt='Logo MT Service'
					width='300'
					className='w-full max-w-[300px] lg:max-w-[400px] mx-auto'
				/>
				<div className='flex flex-col-reverse gap-x-12 gap-y-16 lg:items-center justify-between lg:flex-row'>
					<img
						src={baseDir + '/images/hero/coffee-machines.webp'}
						alt='Coffee Machine Image'
						width='350'
						className='w-full md:max-w-[500px] 2xl:max-w-[600px] drop-shadow-[0_0_60px_#fff]'
					/>
					<h1 className='font-heavy text-3xl xl:text-5xl'>
						<span className='text-accent-secondary text-7xl xl:text-9xl'>
							Ремонт
						</span>
						<br />и обслуживание
						<br />
						<span className='text-[44px] xl:text-7xl leading-snug'>
							кофемашин
						</span>
					</h1>
				</div>
				<ul className='flex items-center gap-2'>
					<li>
						<a
							href='https://t.me/Timur84MT'
							target='_blank'
							className='flex flex-nowrap lg:justify-end justify-center gap-x-3 text-2xl'
						>
							<Icon
								name='telegram'
								className='text-white bg-blue-500 p-1 w-9 rounded-full aspect-square'
							/>
						</a>
					</li>
					<li>
						<a
							href='tel:+998998226362'
							className='flex flex-nowrap lg:justify-end justify-center gap-x-3 text-2xl'
						>
							<Icon
								name='phone'
								className='text-accent-secondary bg-white p-1 w-9 rounded-full aspect-square'
							/>
							+998 99 822-63-62
						</a>
					</li>
				</ul>
			</div>
		</div>
	)
}
