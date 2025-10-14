import { useState } from "react";
import { RegisterForm } from "../components/RegisterForm";
import { LoginForm } from "../components/LoginForm";
import { Button } from "@/components/ui/button";

export function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">
          {mode === "login" ? "Login" : "Registrar"}
        </h1>

        {mode === "login" ? <LoginForm /> : <RegisterForm />}

        <div className="mt-4 text-center text-sm">
          {mode === "login" ? (
            <p>
              Não tem conta?{" "}
              <Button size="sm" variant="link" onClick={() => setMode("register")}>
                Cadastre-se
              </Button>
            </p>
          ) : (
            <p>
              Já tem conta?{" "}
              <Button size="sm" variant="link" onClick={() => setMode("login")}>
                Entrar
              </Button>
            </p>
          )}
        </div>
      </div>
    </div>
  )
};
