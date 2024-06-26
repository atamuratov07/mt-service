import { cn } from '../../lib/utils'
import { Icon } from '../ui/icon'
import { MenuBurger } from '../ui/menu-burger'

const RenderLogo = ({ logoPath }) => (
	<a className='inline-block w-16 md:w-24'>
		<img src={logoPath} alt='Logo MT Service' className='max-w-full' />
	</a>
)

const RenderSchedule = ({ schedule }) => {
	if (!schedule) return null

	return (
		<div className='relative hidden md:block'>
			<Icon
				name='clock'
				className='text-slate-600 w-20 h-20 absolute -top-[20%] -left-8'
			/>
			<div className='relative z-[1] flex flex-col text-end uppercase font-bold font-condensed text-xl text-nowrap'>
				{schedule.map(({ days, time }, i) => (
					<span key={i}>{`${days} ${time}`}</span>
				))}
			</div>
		</div>
	)
}

const RenderTels = ({ tels }) => {
	if (!tels) return

	return (
		<div className='hidden md:flex items-center gap-x-2 sm:gap-x-4'>
			<Icon name='phone' className='w-5 h-5 text-accent' />
			<div className='grid grid-cols-1 xl:grid-cols-2 gap-x-5'>
				{tels.slice(0, 2).map((tel, i) => (
					<a
						key={i}
						href={`tel:${tel.link}`}
						title='Нажмите чтобы набрать номер'
						className='font-bold font-condensed sm:text-lg text-nowrap md:text-xl transition-colors duration-100 hover:text-secondary'
					>
						{tel.value}
					</a>
				))}
			</div>
		</div>
	)
}

export function HeaderMain({ data, isBurgerActive, onBurgerClick }) {
	if (!data) return null

	return (
		<div
			className={cn(
				'relative top-0 left-0 min-h-16 md:min-h-24 bg-bg-blue',
				{ 'ml-4': !isBurgerActive }
			)}
		>
			<div className='fixed top-0 left-0 z-[100] w-full bg-bg-blue text-ternary border-b-[1px] border-slate-800'>
				<div className='container flex items-center min-h-16 md:min-h-24 gap-x-5 lg:gap-x-10'>
					{/* Logo */}
					<div className='flex-auto'>
						<RenderLogo logoPath={data.logo} />
					</div>
					{/* Schedule */}
					<RenderSchedule schedule={data.schedule} />
					{/* Tels */}
					<RenderTels tels={data.tels} />
					{/* Menu Burger */}
					<div className='md:hidden'>
						<MenuBurger
							isActive={isBurgerActive}
							onClick={() => onBurgerClick(!isBurgerActive)}
							onBlur={() => onBurgerClick(false)}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
