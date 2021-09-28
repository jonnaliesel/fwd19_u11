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
        <div className="">
            <form onSubmit={loginHandler} className="">
                <h3 className="">Login</h3>
                {error && <span className="text-red-800">{error}</span>}
                <div className="">
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email"
                        required
                        id="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                
                <div className="">
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password"
                        required
                        id="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn-primary">Login</button>
                <span className="">
                    Don't have an account yet? <Link to="/register">Register</Link>
                </span>
            </form>
        </div>
    )
}

export default LoginScreen