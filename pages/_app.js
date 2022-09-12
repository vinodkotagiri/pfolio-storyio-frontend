import { useContext } from 'react'
import { ThemeProvider } from '../context/theme'
import { AuthProvider } from '../context/AuthContext'
import TopNav from '../components/TopNav'
import { Toaster } from 'react-hot-toast'
function MyApp({ Component, pageProps }) {
	return (
		<ThemeProvider>
			<AuthProvider>
				<TopNav />
				<Toaster />
				<Component {...pageProps} />
			</AuthProvider>
		</ThemeProvider>
	)
}
export default MyApp
