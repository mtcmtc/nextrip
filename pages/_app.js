import '../styles/globals.css'

function App({ Component, pageProps }) {
	return (
		<div suppressHydrationWarning>
			{typeof window === 'undefined' ? null : <Component {...pageProps} />}
		</div>
	)
}

export default App
