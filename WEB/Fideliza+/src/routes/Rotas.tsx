import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../pages/Dashboard";


function Rotas() {

    return (
        <Routes>
            {/* --- Rotas Públicas --- */}
            <Route path="/" element={<Navigate to="/login-page" replace/>} />
            <Route path="/login-page" element={<Login/>} />
            {/* --- Fim das Rotas Públicas --- */}

            {/* --- Rotas Privadas --- */}
            <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
            {/* --- Fim das Rotas Privadas --- */}
        </Routes>
    )
}

export default Rotas;