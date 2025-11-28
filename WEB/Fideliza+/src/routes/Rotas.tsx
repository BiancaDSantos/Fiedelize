import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../pages/Dashboard";
import CadastrarCliente from "../pages/CadastrarCliente";
import ConsultarClientes from "../pages/ConsultarClientes";
import LancarPontos from "../pages/LançarPontos";


function Rotas() {

    return (
        <Routes>
            {/* --- Rotas Públicas --- */}
            <Route path="/" element={<Navigate to="/login-page" replace/>} />
            <Route path="/login-page" element={<Login/>} />
            {/* --- Fim das Rotas Públicas --- */}

            {/* --- Rotas Privadas --- */}
            <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
            <Route path="/cadastrar-cliente" element={<PrivateRoute><CadastrarCliente/></PrivateRoute>} />
            <Route path="/cadastrar-cliente/:id" element={<PrivateRoute><CadastrarCliente/></PrivateRoute>} />
            <Route path="/lançar-pontos" element={<PrivateRoute><LancarPontos/></PrivateRoute>} />
            <Route path="/consultar-clientes" element={<PrivateRoute><ConsultarClientes/></PrivateRoute>} />
            {/* --- Fim das Rotas Privadas --- */}
        </Routes>
    )
}

export default Rotas;