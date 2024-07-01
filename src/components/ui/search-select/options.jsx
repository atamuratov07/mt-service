/* eslint-disable react/prop-types */
import { Option } from './option'

function isSelected(option, selectedOption) {
	if (!selectedOption) return false

	return selectedOption.value === option.value
}

export function Options(props) {
	const { options, optionProps, snapshot, classes } = props

	return (
		<ul className={classes.options}>
			{options.map(o => {
				if (o.items) {
					return (
						<li role='none' className={classes.item} key={o.name}>
							<div className={classes.group}>
								<div className={classes.groupHeader}>{o.name}</div>
								<Options {...props} options={o.items} />
							</div>
						</li>
					)
				}

				return (
					<Option
						key={o.value}
						classes={classes}
						option={o}
						optionProps={optionProps}
						selected={isSelected(o, snapshot.option)}
						highlighted={snapshot.highlighted === o.index}
						disabled={o.disabled}
					/>
				)
			})}
		</ul>
	)
}
