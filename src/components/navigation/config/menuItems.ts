import { Home, Trophy, BookOpen, Brain, User } from "lucide-react";

type MenuItem = {
  to: string;
  label: string;
  icon: React.ComponentType<{ size: number }>;
};

export const menuItems: MenuItem[] = [
  { to: "/", label: "Dashboard", icon: Home },
  { to: "/achievements", label: "Conquistas", icon: Trophy },
  { to: "/challenges", label: "Desafios", icon: Brain },
  { to: "/contents", label: "Conteúdos", icon: BookOpen },
  { to: "/exercises", label: "Exercícios", icon: BookOpen },
  { to: "/profile", label: "Perfil", icon: User },
];
