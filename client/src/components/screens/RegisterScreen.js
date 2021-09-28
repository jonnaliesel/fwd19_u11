import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const RegisterScreen = ({ history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        if(localStorage.getItem('authToken')) {
            history.push('/')
        }
    }, [history])

    const registerHandler = async (e) => {
        e.preventDefault()

        const config = {
            header: {
                "Content-Type": "application/json"
            }
        }
        
        if(password !== confirmPassword) {
            setPassword('')
            setConfirmPassword('')
            setTimeout(() => {
                setError('')
            }, 5000)
            return setError('Passwords do not match')
        }

        try {
            const { data } = await axios.post('/api/auth/register', {email, password},
            config)

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
            <form onSubmit={registerHandler} className="">
                <h3 className="">Register</h3>
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

                <div className="">
                    <label htmlFor="confirmpassword">Confirm password:</label>
                    <input 
                        type="password"
                        required
                        id="confirmpassword"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn-primary">Register</button>
                <span className="">Already have an account? <Link to="/login">Login</Link></span>
            </form>
        </div>
    )
}

export default RegisterScreen