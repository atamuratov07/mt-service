import { YMaps } from '@pbe/react-yandex-maps'
import { AppLayout } from './components/app-layout'
import { AppContextProvider } from './context/app-context'
function App() {
	return (
		<AppContextProvider>
			<YMaps
				query={{
					apikey: '2f90da4a-ca57-4584-9c84-8b1e8f39997c',
					lang: 'ru_RU',
				}}
			>
				<AppLayout />
			</YMaps>
		</AppContextProvider>
	)
}

export default App
