import { cn } from '../../../lib/utils'

export function Option({
	classes,
	optionProps,
	highlighted,
	selected,
	option,
	disabled,
}) {
	const props = {
		...optionProps,
		value: encodeURIComponent(option.value),
		disabled,
	}

	return (
		<li className={classes.item} role='menuitem' data-index={option.index}>
			<button
				type='button'
				{...props}
				className={cn(classes.option, {
					[classes.highlighted]: highlighted && !selected,
					[classes.selected]: selected,
				})}
			>
				{option.name}
			</button>
		</li>
	)
}
