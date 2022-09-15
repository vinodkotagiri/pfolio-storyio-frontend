import { createContext, useState, useEffect } from 'react'
import axios from 'axios'

const baseURL = 'http://localhost:5002'

const AuthContext = createContext()
const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState({
		user: null,
		token: '',
	})

	//Configure axios
	axios.defaults.baseURL = baseURL
	axios.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`
	useEffect(() => {
		if (localStorage.getItem('auth')) {
			setAuth(JSON.parse(localStorage.getItem('auth')))
		}
	}, [])

	return (
		<AuthContext.Provider value={[auth, setAuth]}>
			{children}
		</AuthContext.Provider>
	)
}

export { AuthContext, AuthProvider }
