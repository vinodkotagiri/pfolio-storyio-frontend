import React, { Fragment, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
const Home = () => {
	const [auth, setAuth] = useContext(AuthContext)
	return (
		<div>
			<h1>Home</h1>
			<pre>{JSON.stringify(auth)}</pre>
		</div>
	)
}

export default Home
