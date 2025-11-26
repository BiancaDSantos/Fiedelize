import { useNavigate } from "react-router-dom";
import { useState } from "react";
import React from "react";
import { login } from "../services/AuthService";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/authSlice";

function Login() {

    const navigate = useNavigate();
    const dispath = useDispatch();

    const [formData, setFormData] =  useState({
        email: "",
        senha: ""
    });

    const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        
        login(formData)
            .then((loginResponse) => {
                if (!loginResponse.token) {
                    alert("Login falhou. Verifique suas credenciais.");
                    return;
                }

                dispath(loginSuccess({ 
                    user: { email: formData.email, nome: "" }, token: loginResponse.token }
                ));

                navigate("/dashboard");

            }).catch((error) => {
                console.error("Erro ao fazer login:", error);
                alert("Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.");
            });
    }
    
    return (

        <form className="container" onSubmit={handlerSubmit} >
            <h2>Acessar Painel Administrador</h2>
            <div className="form-floating mb-3">
                <input 
                    type="email" 
                    name="email" 
                    className="form-control" 
                    id="email" 
                    value={formData.email}
                    onChange={handlerChange}
                    required  
                />
                <label htmlFor="email" >Email address</label>
            </div>
            <div className="form-floating mb-3">
                <input 
                    type="password" 
                    name="senha" 
                    className="form-control"
                    id="senha"
                    value={formData.senha}
                    onChange={handlerChange} 
                    required  
                />
                <label htmlFor="password" >Senha</label>
            </div>
            <button type="submit" className="btn btn-primary w-100">Logar</button>
        </form>
    );
}


export default Login;