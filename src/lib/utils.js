import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...classes) => twMerge(clsx(classes))

export const lockDocumentScroll = (lock = true) => {
	if (lock) {
		document.documentElement.style.marginRight =
			window.innerWidth - document.documentElement.clientWidth + 'px'
		document.documentElement.style.overflowY = 'hidden'
	} else {
		document.documentElement.style.overflowY = 'visible'
		document.documentElement.style.marginRight = '0'
	}
}
