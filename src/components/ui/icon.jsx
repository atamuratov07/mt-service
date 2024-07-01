import { useAppContext } from '../../context/app-context'

export function Icon({ name, ...props }) {
	const { icons, baseDir } = useAppContext()

	if (!icons) return null

	return (
		<svg {...props}>
			<use href={`${baseDir}${icons.path}#${icons.starterId}${name}`} />
		</svg>
	)
}
