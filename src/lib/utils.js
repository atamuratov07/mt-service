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

const EN_RU_ALPHABET = {
	a: 'а',
	b: 'б',
	v: 'в',
	g: 'г',
	d: 'д',
	e: 'е',
	e: 'ё',
	zh: 'ж',
	z: 'з',
	i: 'и',
	y: 'й',
	k: 'к',
	l: 'л',
	m: 'м',
	n: 'н',
	o: 'о',
	p: 'п',
	r: 'р',
	s: 'с',
	t: 'т',
	u: 'у',
	f: 'ф',
	h: 'х',
	c: 'ц',
	ch: 'ч',
	sh: 'ш',
	sch: 'щ',
	y: 'ы',
	e: 'э',
	yu: 'ю',
	ya: 'я',
}
export const transliteration = query => {
	const rus =
		'щ   ш  ч  ю  я  ё  ж  а б в г д е з и й к л м н о п р с т у ф х ц ы э'.split(
			/ +/g
		)
	const eng =
		'shh sh ch yu ya yo zh a b v g d e z i y k l m n o p r s t u f h c i e'.split(
			/ +/g
		)

	query

	for (let i = 0; i < rus.length; i++) {
		const charRu = rus[i] || ''
		const charEn = eng[i] || ''
		query = query.split(charEn).join(charRu)
	}

	return query
}
