import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AuthService } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/app/providers/auth/useAuth";

export function RegisterForm() {
  const { login, isAuthenticated } = useAuth();
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
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
      const type = 0;
      const response = await AuthService
        .register({ username, fullName, email, password, type });
      login(response);

      if (isAuthenticated) {
        navigate("/");
        console.log("authenticated");
      }
    } catch (err: any) {
      setError(err);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input 
        type="text" 
        placeholder="Username"
        className="w-full p-2 border rounded"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input 
        type="text" 
        placeholder="Full name"
        className="w-full p-2 border rounded"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
      />
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
        value={password}
        className="w-full p-2 border rounded"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button
        type="submit"
        size="lg"
        className="w-full"
      >
        Cadastrar
      </Button>
    </form>
  );
};
