import React, { useState, useEffect, useContext } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const AuthContext = React.createContext()

export function AuthProvider({ children }) {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    useEffect(() => {
        let jwt = localStorage.getItem("token")
        if (jwt) {
            try {
                let decoded = JSON.parse(atob(jwt.split(".")[1]))
                if (new Date() < new Date(decoded.exp * 1000)) {
                    setUser(decoded.manager_id)
                } else {
                    setUser(null)
                }
            } catch (e) {
                setUser(null)
            }
        } else {
            setUser(null)
        }
        setLoading(false)
    }, [])

    const value = {
        login: async (username, password) => {
            let response = await fetch('https://dev-api.nevo.cc/api/v2/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: username,
                    password
                })
            })
            let result = await response.json()
            let jwt = result?.access
            if (jwt) {
                localStorage.setItem("token", jwt)
                try {
                    let decoded = JSON.parse(atob(jwt.split(".")[1]))
                    setUser(decoded.manager_id)
                    return true
                } catch (e) {
                    setUser(null)
                }
            }
            return false
        },
        logout: () => {
            setUser(null)
            localStorage.removeItem("token")
        },
        user
    }

    return (
        <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthRoute() {
    const { user } = useAuth()
    const location = useLocation()

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }
    return <Outlet />
}