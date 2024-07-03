import { useRef, useState } from 'react'
import { transliteration } from '../../../../lib/utils'
import { useHighlight } from './useHighlight'
import { useOptions } from './useOptions'
import { groupOptions } from './utils'

const nullCb = () => {}

export function useSelect({
	options: allOptions,
	onChange = nullCb,
	onFocus = nullCb,
	onBlur = nullCb,
	defaultValue,
	debounce = 250,
}) {
	const inputRef = useRef()

	const [search, setSearch] = useState('')

	const [options, fetching] = useOptions(
		allOptions,
		debounce,
		transliteration(search)
	)

	const [option, setOption] = useState(null)
	const [value, setValue] = useState(defaultValue)

	const [focused, setFocused] = useState(false)

	const onSelect = newValue => {
		const decoded = decodeURIComponent(newValue)
		const newOption = options.find(op => op.value === decoded) || option

		setOption(newOption)
		setSearch('')
		setValue(newOption.name)

		onChange(newOption)

		setTimeout(() => {
			if (inputRef.current) inputRef.current.blur()
		}, 0)
	}

	const [keyHandlers, highlighted, setHighlighted] = useHighlight(
		options,
		onSelect,
		inputRef,
		focused
	)
	const groupedOptions = groupOptions(options)

	const snapshot = {
		options: groupedOptions,
		fetching,
		search,
		focus: focused,
		highlighted,
		option,
	}

	const inputProps = {
		tabIndex: '0',
		placeholder: value,
		value: search,
		ref: inputRef,
		...keyHandlers,
		onFocus: e => {
			setFocused(true)
			onFocus(e)
		},
		onBlur: e => {
			setHighlighted(-1)
			setValue(option?.name || defaultValue)
			setFocused(false)
			setSearch('')
			onBlur(e)
		},
		onMouseDown: e => {
			if (focused) {
				e.preventDefault()
				inputRef.current.blur()
			}
		},
		onChange: e => {
			setSearch(e.target.value)
			setValue(search && option?.name)
		},
	}

	const optionProps = {
		tabIndex: '-1',
		onMouseDown(e) {
			e.preventDefault()
			onSelect(e.currentTarget.value)
		},
		// onMouseEnter(e) {
		// 	e.preventDefault()
		// 	const item = e.target.closest('[data-index]')
		// 	console.log(item, highlighted)
		// 	if (item) {
		// 		setHighlighted(+item.dataset.index)
		// 	}
		// },
	}

	return [snapshot, inputProps, optionProps]
}
