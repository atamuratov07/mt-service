import { useEffect, useRef } from 'react'
import { useMountTransition } from '../../../hooks/useMountTransition'
import { cn } from '../../../lib/utils'
import { Icon } from '../icon'
import { useSelect } from './lib/useSelect'
import { Options } from './options'

const defaultClasses = {
	container: 'relative max-w-80',
	value: '',
	searchIcon:
		'absolute top-1/2 left-2 -translate-y-1/2 w-4 h-4 fill-current pointer-events-none',
	input: 'w-full p-2 pl-8 bg-white border rounded-md border-gray-300 hover:border-gray-400 hover:cursor-pointer outline-none placeholder:text-current',
	placeholder: 'placeholder:text-gray-500',
	focused: '!border-accent ring-1 ring-accent/95',
	select:
		'absolute z-10 top-full w-full bg-ternary shadow-md rounded-md opacity-0 transition-all overflow-hidden',
	selectActive: 'translate-y-3 opacity-100',
	options: '',
	empty: 'text-2xl font-bold text-center py-8 text-gray-700',
	option:
		'w-full text-start transition-colors p-2 rounded-[3px] hover:bg-accent/25 hover:bg-sky-100',
	highlighted: 'bg-accent/25 bg-sky-100',
	selected: '!bg-accent text-ternary',
	item: '',
	group: 'min-h-max',
	groupHeader: 'text-gray-500 font-medium',
	groupList: '',
}

const mergeClasses = (a, b) => {
	return Object.fromEntries(
		Object.entries(a).map(([name, className]) => [
			name,
			cn(className, b?.[name]),
		])
	)
}

export const SearchSelect = ({
	id,
	defaultValue = 'Найти услугу',
	emptyMessage = 'Ничего не найдено',
	autoComplete = 'on',
	classes,
	...hookProps
}) => {
	const selectRef = useRef(null)

	const mergedClasses = mergeClasses(defaultClasses, classes)

	const [snapshot, valueProps, optionProps] = useSelect({
		defaultValue,
		...hookProps,
	})
	const { highlighted, option, fetching, focus } = snapshot

	const { mount: mountSelect, show: showSelect } = useMountTransition(
		focus,
		150
	)

	// scroll to selected option
	useEffect(() => {
		const { current } = selectRef

		if (current) {
			const selected = current.querySelector(
				highlighted > -1
					? `[data-index="${highlighted}"]`
					: `[value="${encodeURIComponent(option?.value)}"]`
			)

			if (selected) {
				const rect = current.getBoundingClientRect()
				const selectedRect = selected.getBoundingClientRect()

				current.scrollTop =
					selected.offsetTop - rect.height / 2 + selectedRect.height / 2
			}
		}
	}, [option, highlighted, selectRef.current])

	return (
		<div id={id} className={mergedClasses.container}>
			<div className={mergedClasses.value}>
				<Icon name='search' className={mergedClasses.searchIcon} />
				<input
					{...valueProps}
					autoComplete={autoComplete}
					className={cn(mergedClasses.input, {
						[mergedClasses.focused]: focus,
						[mergedClasses.placeholder]: !option,
					})}
				/>
			</div>
			{mountSelect && (
				<div
					className={cn(mergedClasses.select, {
						[mergedClasses.selectActive]: showSelect,
					})}
					onMouseDown={e => e.preventDefault()}
				>
					<div ref={selectRef} className='overflow-y-auto max-h-80 p-1'>
						{snapshot.options.length > 0 && (
							<Options
								classes={mergedClasses}
								options={snapshot.options}
								optionProps={optionProps}
								snapshot={snapshot}
							/>
						)}
						{!snapshot.options.length && (
							<ul className={mergedClasses.options}>
								{!snapshot.options.length && (
									<li className={mergedClasses.empty}>
										{emptyMessage}
									</li>
								)}
							</ul>
						)}
					</div>
				</div>
			)}
		</div>
	)
}
