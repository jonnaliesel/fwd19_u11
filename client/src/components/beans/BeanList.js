import { useState, useEffect } from 'react'
import axios from 'axios'

const BeanList = (props) => {
    const { userId } = props
    const [beans, setBeans] = useState([])

    useEffect = (() => {
        try {
            const { data } = axios.get(`/api/bean/all/${userId}`)
            setBeans(data)
        } catch (error) {
            
        }
    }, [])
    
    return (
        <h2>This is your beans: {beans.map(bean => <p>{bean.name}</p>)}</h2>
    )
}

export default BeanList