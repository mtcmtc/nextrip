import { useEffect, useState } from 'react'
export default function Loading ({loading}) {
	const [timer, setTimer] = useState(null)
	const [ellipses, setEllipses] = useState('.')
	useEffect(()=>{
		let loader = ''
		const id = setInterval(()=>{
			// console.log(loader)
			if(loader.length < 5){
				loader += '.'
			}else loader = ''
			setEllipses(loader)
		}, 500)

		setTimer(id)

		return () => clearInterval(id)
	}, [])
	return <p className={`transition-opacity ${loading ? 'opacity-100' : 'opacity-100'}`}>Loading{ellipses}</p>
}