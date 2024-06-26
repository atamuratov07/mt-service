import { useAppContext } from '../../context/app-context'

export function Icon({ name, ...props }) {
	const { icons } = useAppContext()

	return (
		<svg {...props}>
			<use href={`${icons.path}#${icons.starterId}${name}`} />
		</svg>
	)
}
