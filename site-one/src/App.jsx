import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthRoute } from './AuthContext'
import Info from './Info'
import Login from './Login'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />}></Route>
                <Route element={<AuthRoute />}>
                    <Route path="/" element={<Info />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
