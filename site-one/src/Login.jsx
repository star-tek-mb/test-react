import React, { useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [form, setForm] = useState({
        username: '',
        password: ''
    })
    const navigate = useNavigate()
    const { login } = useAuth()
    const [wnd, setWnd] = useState(null)

    const handleFormChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }

    useEffect(() => {
        const handler = (event) => {
            console.log(event)
            // TODO: check domain
            if (event.data == "login") {
                if (wnd) {
                    wnd.close()
                    navigate("/", { replace: true })
                }
            }
        }
        window.addEventListener("message", handler)
        return () => window.removeEventListener("message", handler)
    }, [wnd])

    const onSubmit = async (e) => {
        e.preventDefault()
        let success = await login(form.username, form.password)
        if (success) {
            let token = localStorage.getItem("token")
            setWnd(window.open(`http://localhost:3001/login?token=${token}`, "Login", "popup"))
        } else {
            alert("Неверный логин или пароль")
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input id="username" type="text" value={form.username} onChange={handleFormChange} />
                <br />
                <input id="password" type="password" value={form.password} onChange={handleFormChange} />
                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default Login