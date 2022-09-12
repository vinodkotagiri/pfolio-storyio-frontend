import { useContext } from 'react'
import { ThemeContext, ThemeProvider } from '../context/theme'
import TopNav from '../components/TopNav'
import { Toaster } from 'react-hot-toast'
function MyApp({ Component, pageProps }) {
	return (
		<ThemeProvider>
			<TopNav />
			<Toaster />
			<Component {...pageProps} />
		</ThemeProvider>
	)
}
export default MyApp
