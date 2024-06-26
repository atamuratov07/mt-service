import { createPortal } from 'react-dom'
import { useMountTransition } from '../../hooks/useMountTransition'
import { cn, lockDocumentScroll } from '../../lib/utils'

export function Modal({ className, open = false, onClose, children }) {
	const showModal = useMountTransition(open, 200)

	lockDocumentScroll(open)

	if (!showModal && !open) return null

	const modal = (
		<div
			onClick={onClose}
			className={cn(
				'fixed inset-0 z-[1000] w-screen overflow-y-auto backdrop-blur-0 bg-black/0',
				'transition-[backdrop-filter,background-color] duration-300 ease-out',
				{ 'bg-black/75 backdrop-blur-[2px]': open && showModal },
				{ 'duration-200 ease-in': !open && showModal }
			)}
		>
			<div className='flex justify-center items-center min-h-full p-5 pt-10'>
				<div
					onClick={e => e.stopPropagation()}
					className={cn(
						'relative overflow-hidden',
						'opacity-0 scale-95 transition-[transform,opacity] ease-out duration-300',
						className,
						{
							'opacity-100 scale-100': open && showModal,
						},
						{ 'duration-200 ease-in': !open && showModal }
					)}
				>
					{children}
				</div>
			</div>
		</div>
	)

	return createPortal(modal, document.getElementById('modals'))
}

Modal.Panel = function ModalPanel({ className, children }) {
	return (
		<div
			className={cn(
				'max-w-[480px] min-w-[320px] bg-ternary shadow-md rounded-lg p-6 pt-14',
				className
			)}
		>
			{children}
		</div>
	)
}

Modal.Close = function ModalClose({ onClose, className }) {
	return (
		<button
			className={cn(
				'absolute bg-red-600 hover:bg-red-700 top-4 right-4 w-8 h-8 rounded-full transition-all duration-200',
				'before:content-[""] before:block before:absolute before:top-[50%] before:left-[50%] before:-translate-x-1/2 before:-translate-y-1/2 before:w-0.5 before:h-4 before:rounded-sm before:bg-ternary before:rotate-45 hover:before:rotate-[405deg] before:transition-transform',
				'after:content-[""] after:block after:absolute after:top-[50%] after:left-[50%] after:-translate-x-1/2 after:-translate-y-1/2 after:w-0.5 after:h-4 after:rounded-sm after:bg-ternary after:-rotate-45 hover:after:rotate-[315deg] after:transition-transform',
				className
			)}
			onClick={onClose}
		></button>
	)
}

Modal.Header = function ModalHeader({ className, children, ...props }) {
	return (
		<h4 className={cn('font-condensed text-6 font-bold mb-5', className)}>
			{children}
		</h4>
	)
}
