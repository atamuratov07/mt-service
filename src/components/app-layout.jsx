import { Brands } from './brands/brands'
import { Contacts } from './contacts'
import { Header } from './header'
import { Hero } from './hero'
import { Prices } from './prices'
import { Services } from './services'

export function AppLayout() {
	return (
		<>
			<Header />
			<main className='bg-bg-gray'>
				<Hero />
				<Services />
				<Prices />
				<Brands />
				<Contacts />
			</main>
			<div id='modals' className=''></div>
		</>
	)
}
