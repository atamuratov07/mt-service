import { cn } from '../../lib/utils'

export function Button({ className, onClick, children }) {
	const styles = cn(
		'inline-block bg-accent border-none rounded-sm px-8 py-4',
		'text-ternary text-center font-bold uppercase',
		'active:bg-slate-500 active:translate-y-px active:scale-95 active:shadow-none',
		'hover:shadow-lg',
		className
	)

	return (
		<button onClick={onClick} className={styles}>
			{children}
		</button>
	)
}
