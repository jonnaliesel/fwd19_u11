import { useState, useEffect } from 'react'
import axios from 'axios'

const PrivateScreen = ({ history }) => {
    const [error, setError] = useState('')
    const [userInfo, setUserInfo] = useState('')

    useEffect(() => {
        if(!localStorage.getItem('authToken')) {
            history.push('/login')
        }
        
        const fetchUserInfo = async () => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            }

            try {
                const { data } = await axios.get('/api/private', config)
                setUserInfo(data.data)
            } catch (error) {
                localStorage.removeItem('authToken')
                setError('You are not authorized, please login')
            }
        }

        fetchUserInfo()
    }, [history])
    
    const logoutHandler = () => {
        localStorage.removeItem('authToken')
        history.push('login')
    }

    return error ? (
        <span className="text-red-800">{error}</span>
    ) : (
        <>
            <div className="bg-coffee text-white p-6">{userInfo.firstName} {userInfo.lastName}</div>
            <button className="" onClick={logoutHandler}>Logout</button>
        </>
    )
}

export default PrivateScreen