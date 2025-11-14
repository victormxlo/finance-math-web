import { Home, Trophy, BookOpen, User, Target, ClipboardCheck } from "lucide-react";

type MenuItem = {
  to: string;
  label: string;
  icon: React.ComponentType<{ size: number }>;
};

export const baseMenuItems: MenuItem[] = [
  { to: "/", label: "Dashboard", icon: Home },
  { to: "/contents", label: "Conteúdos", icon: BookOpen },
  { to: "/exercises", label: "Exercícios", icon: ClipboardCheck },
  { to: "/challenges", label: "Desafios", icon: Target },
  { to: "/achievements", label: "Conquistas", icon: Trophy },
  { to: "/profile", label: "Perfil", icon: User },
];
