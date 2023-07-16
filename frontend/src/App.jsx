import './App.css'
import CreateProperty from './components/CreateProperty';
import { FinderDashboard } from './components/FinderDashboard';
import LandingPage from './components/LandingPage';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Routes, Route } from 'react-router-dom';
import UpdateProperty from './components/UpdateProperty';
import UserPgDashboard from './components/UserPgDashboard';
import Property from './components/Property';
import { CloudinaryContext } from 'cloudinary-react';

function App() {
    return (
        <>
        <CloudinaryContext cloudName="dbev6vdma">
            <Routes>
                <Route  path="/" element={<LandingPage />} />
                <Route  path="/login" element={<Login />} />
                <Route  path="/register" element={<Register />} />
                <Route  path="/pg/create" element={<CreateProperty />} />
                <Route  path="/search" element={<FinderDashboard />} />
                <Route  path="/pg/update" element={<UpdateProperty />} />
                <Route  path="/pg/my" element={<UserPgDashboard />} />
                <Route  path="/pg/:id" element={<Property />} />
            </Routes>
        </CloudinaryContext>
        </>
    )
}

export default App
