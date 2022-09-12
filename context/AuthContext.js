import { createContext, useState, useEffect } from 'react'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState({
		user: {},
		token: '',
	})

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
