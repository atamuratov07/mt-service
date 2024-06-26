import { Map, Placemark } from '@pbe/react-yandex-maps'
import React from 'react'

export function YandexMap({ address, className, ...props }) {
	if (!address) return

	return (
		// <div id='address' className='min-h-48'>
		<Map
			id='address'
			style={{
				width: '100%',
				height: '400px',
			}}
			defaultState={{
				center: address.coordinates,
				zoom: 16,
				controls: ['zoomControl', 'fullscreenControl'],
			}}
			modules={['control.ZoomControl', 'control.FullscreenControl']}
			{...props}
		>
			<Placemark defaultGeometry={address.coordinates} />
		</Map>
		// </div>
	)
}
