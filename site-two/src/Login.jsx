import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAuth } from './AuthContext'

function Login() {
    let [searchParams] = useSearchParams()
    let token = searchParams.get("token")
    let { setToken } = useAuth()

    useEffect(() => {
        if (token) {
            setToken(token)
            window.opener.postMessage("login", "http://localhost:3000")
        }
    }, [])

    return (
        <div>Login</div>
    )
}

export default Login