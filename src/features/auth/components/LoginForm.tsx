import { useAuth } from "@/app/providers/auth/useAuth";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AuthService } from "../api/authApi";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await AuthService.login({ email, password });
      login(response);

      if (isAuthenticated) {
        console.log(isAuthenticated);
        navigate("/");
      }
    } catch (err: any) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button 
        type="submit"
        size="lg"
        className="w-full"
      >
        {loading ? "Entrando" : "Entrar"}
      </Button>
    </form>
  );
};
