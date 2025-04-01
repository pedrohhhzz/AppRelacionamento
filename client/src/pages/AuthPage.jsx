import { useState } from "react";

import { LoginForm } from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm"


const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#211C84] to-[#6A5ACD] p-4">
      <div className="w-full max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-white mb-8">
          {isLogin ? "Entre" : "Crie uma Conta"}
        </h2>

        <div className="bg-white shadow-xl rounded-b-lg p-8">
          {isLogin ? <LoginForm /> : <SignUpForm />}

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? "Nova conta?" : "Já tem uma conta?"}
            </p>

            <button
              onClick={() => setIsLogin((prevIsLogin) => !prevIsLogin)}
              className="mt-2 text-[#211C84] hover:text-[#100A5B] font-medium transition-colors duration-300"
            >
              {isLogin ? "Criar uma conta" : "Logar-se"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;