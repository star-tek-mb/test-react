import React from 'react'
import { useAuth } from './AuthContext'

function Info() {
    const { user } = useAuth()
    return (
        <div>Info: {user}</div>
    )
}

export default Info