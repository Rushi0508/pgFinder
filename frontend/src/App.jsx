import './App.css'
import CreateProperty from './components/CreateProperty';
import LandingPage from './components/LandingPage';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Routes, Route } from 'react-router-dom';

function App() {

    return (
        <>
            <Routes>
                <Route  path="/" element={<LandingPage />} />
                <Route  path="/login" element={<Login />} />
                <Route  path="/register" element={<Register />} />
                <Route  path="/pg/create" element={<CreateProperty />} />
            </Routes>
        </>
    )
}

export default App
