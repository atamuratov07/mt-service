import { useState } from 'react'
import { useAppContext } from '../../context/app-context'
import { HeaderMain } from './header-main'
import { HeaderNav } from './header-nav'

function getHeaderMainData(headerData, contactsData, baseDir) {
	return {
		logo: baseDir + headerData.logo,
		tels: contactsData.tels,
		schedule: contactsData.shortSchedule,
	}
}

export function Header() {
	const [burgerActive, setBurgerActive] = useState(false)
	const {
		header: headerData,
		contacts: contactsData,
		baseDir,
	} = useAppContext()

	if (!headerData || !contactsData) return null

	return (
		<header>
			<HeaderMain
				data={getHeaderMainData(headerData, contactsData, baseDir)}
				isBurgerActive={burgerActive}
				onBurgerClick={newState => setBurgerActive(newState)}
			/>
			<HeaderNav
				data={headerData.navigation}
				isOpen={burgerActive}
				onItemClick={() => setBurgerActive(false)}
			/>
		</header>
	)
}
