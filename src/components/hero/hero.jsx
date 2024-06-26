import { useAppContext } from '../../context/app-context'
import { Advantages } from '../advantages'

export function Hero() {
	const { hero: heroData, baseDir } = useAppContext()

	if (!heroData) return null

	return (
		<section
			id='main'
			className='relative flex justify-between h-[80vmin] min-h-[700px] md:min-h-[800px] bg-slate-800'
		>
			{heroData.backgroundImage && (
				<img
					alt='Hero background image'
					src={baseDir + heroData.backgroundImage}
					className='absolute inset-0 opacity-50 block w-full h-full object-cover'
				/>
			)}
			<div className='relative z-[1] container flex flex-col'>
				<div className='flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-start'>
					<h1 className='text-4xl sm:text-5xl md:text-6xl text-ternary font-condensed font-extrabold max-w-[700px]'>
						{heroData.title}
					</h1>
					<h2 className='inline-block mt-2 text-base text-nowrap sm:text-xl md:text-2xl px-2 bg-gray-800 text-ternary'>
						{heroData.subTitle}
					</h2>
				</div>
				<Advantages className='pb-4' />
			</div>
		</section>
	)
}
