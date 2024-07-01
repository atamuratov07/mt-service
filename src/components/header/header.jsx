import { useState } from 'react'
import { useAppContext } from '../../context/app-context'
import { MenuBurger } from '../ui/menu-burger'
import { HeaderNav } from './header-nav'
import { HeaderNavMobile } from './header-nav-mobile'

const RenderLogo = ({ logoPath }) => {
	if (!logoPath) return null

	return (
		<a className='inline-block w-16 md:w-24'>
			<img src={logoPath} alt='Logo MT Service' className='max-w-full' />
		</a>
	)
}

export function Header() {
	const { baseDir, header } = useAppContext()

	const { navigation, logo } = header || {}

	const [burgerActive, setBurgerActive] = useState(false)
	const [activeNavItemId, setActiveNavItemId] = useState(navigation?.[0]?.id)

	return (
		<header>
			<div className='min-h-16 md:min-h-24 bg-bg-blue'>
				<div className='fixed top-0 left-0 z-[100] w-full bg-bg-blue text-ternary border-b-[1px] border-slate-800'>
					<div className='container min-h-16 md:min-h-24 flex items-center justify-between gap-x-5 lg:gap-x-10'>
						<RenderLogo logoPath={baseDir + logo} />

						<HeaderNav
							data={navigation}
							activeItemId={activeNavItemId}
							onItemClick={itemId => {
								setActiveNavItemId(itemId)
							}}
						/>
						<div className='md:hidden'>
							<MenuBurger
								isActive={burgerActive}
								onClick={() => setBurgerActive(last => !last)}
								onBlur={() => setBurgerActive(false)}
							/>
						</div>
					</div>
				</div>
			</div>
			<HeaderNavMobile
				data={navigation}
				activeItemId={activeNavItemId}
				isActive={burgerActive}
				onItemClick={itemId => {
					setBurgerActive(false)
					setActiveNavItemId(itemId)
				}}
			/>
		</header>
	)
}
