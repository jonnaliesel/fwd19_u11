import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const LoginScreen = ({ history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        if(localStorage.getItem('authToken')) {
            history.push('/')
        }
    }, [history])

    const loginHandler = async (e) => {
        e.preventDefault()

        const config = {
            header: {
                "Content-Type": "application/json"
            }
        }

        try {
            const { data } = await axios.post(
                '/api/auth/login',
                { email, password },
                config
            )

            localStorage.setItem('authToken', data.token)
            history.push('/')
        } catch (error) {
            setError(error.response.data.error)
            setTimeout(() => {
                setError('')
            }, 5000)
        }
    }

    return (
        <div className="h-screen w-screen flex justify-center bg-light">
            <form onSubmit={loginHandler} className="my-auto bg-accent p-8">
                <h3 className="font-bold text-xl">Login</h3>
                {error && <span className="text-red-800">{error}</span>}
                
                <div className="mt-4">
                    <label htmlFor="email">Email</label>
                    <input 
                        className="block mt-2 px-4 py-2"
                        type="email"
                        required
                        id="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                
                <div className="mt-4">
                    <label htmlFor="password">Password</label>
                    <input 
                        className="block mt-2 px-4 py-2"
                        type="password"
                        required
                        id="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button 
                    type="submit" 
                    className="mt-4 px-6 py-1 
                        bg-coffee hover:bg-light 
                        rounded-full 
                        text-light hover:text-coffee"
                >Login</button>
                <span className="block text-xs mt-4">
                    Don't have an account yet? <Link to="/register" className="hover:text-coffee">Register</Link>
                </span>
            </form>
        </div>
    )
}

export default LoginScreen