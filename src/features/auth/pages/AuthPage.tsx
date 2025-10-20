import { useState } from "react";
import { RegisterForm } from "../components/RegisterForm";
import { LoginForm } from "../components/LoginForm";
import { Button } from "@/components/ui/Button";
import { Navigate, useSearchParams } from "react-router-dom";
import { AUTH_MODES, type AuthMode } from "@/features/auth/constants/authMode";
import { useAuth } from "@/features/auth/context/useAuth";

export function AuthPage() {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  if (user) {
    return <Navigate to="/" replace />;
  };

  const initialMode = searchParams.get("mode") === AUTH_MODES.LOGIN ? 
    AUTH_MODES.LOGIN : AUTH_MODES.REGISTER;

  const [mode, setMode] = useState<AuthMode>(initialMode);

  function changeMode(newMode: AuthMode) {
    setMode(newMode);
    setSearchParams({ mode: newMode });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">
          {mode === AUTH_MODES.LOGIN ? "Login" : "Registrar"}
        </h1>

        {mode === AUTH_MODES.LOGIN ? <LoginForm /> : <RegisterForm />}

        <div className="mt-4 text-center text-sm">
          {mode === AUTH_MODES.LOGIN ? (
            <p>
              Não tem conta?{" "}
              <Button size="sm" variant="link" onClick={() => changeMode(AUTH_MODES.REGISTER)}>
                Cadastre-se
              </Button>
            </p>
          ) : (
            <p>
              Já tem conta?{" "}
              <Button size="sm" variant="link" onClick={() => changeMode(AUTH_MODES.LOGIN)}>
                Entrar
              </Button>
            </p>
          )}
        </div>
      </div>
    </div>
  )
};
