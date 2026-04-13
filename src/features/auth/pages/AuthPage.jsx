import { useState } from "react";
import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from "../components/RegisterForm"; 
import { ForgotPassForm } from "../components/ForgotPassForm"; 

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [isForgot, setIsForgot] = useState(false);

    // Funciones para cambiar de vista
    const handleToRegister = () => {
        setIsLogin(false);
        setIsForgot(false);
    };

    const handleToLogin = () => {
        setIsLogin(true);
        setIsForgot(false);
    };

    const handleToForgot = () => {
        setIsForgot(true);
    };

    return (
        <div className="bg-gradient-to-r from-[#009246] via-[45%] via-[#F5F5F5] to-[#CE2B37] min-h-screen flex items-center justify-center">    
    <div className="w-full max-w-xl bg-white rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.25)] border border-gray-200 p-6 md:p-10">  
                
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <img src="/src/assets/img/pastor_kinaliani.png" alt="Logo" className="h-20 w-auto" />
                </div>

                <div className="text-center mb-6">
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                        {isForgot ? "Recuperar Contraseña" : isLogin ? "Bienvenido de nuevo" : "Crea tu cuenta"}
                    </h1>
                    <p className="text-gray-600 text-base max-w-md mx-auto">
                        {isForgot 
                            ? "Ingresa tu correo electrónico para recuperar tu contraseña" 
                            : isLogin 
                                ? "Ingresa a tu cuenta de administrador de Pastor Kinaliani" 
                                : "Regístrate como administrador de Pastor Kinaliani"}
                    </p>
                </div>

                {/* Renderizado condicional */}
                {isForgot ? (
                    <ForgotPassForm onSwitchLogin={handleToLogin} />
                ) : isLogin ? (
                    <LoginForm onSwitchRegister={handleToRegister} onSwitchForgot={handleToForgot} />
                ) : (
                    <RegisterForm onSwitchLogin={handleToLogin} />
                )}
            </div>
        </div>
    );
};

export { AuthPage };