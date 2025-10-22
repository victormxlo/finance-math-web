import { Home, Trophy, BookOpen, User, Target, ClipboardCheck } from "lucide-react";

type MenuItem = {
  to: string;
  label: string;
  icon: React.ComponentType<{ size: number }>;
};

export const menuItems: MenuItem[] = [
  { to: "/", label: "Dashboard", icon: Home },
  { to: "/contents", label: "Contents", icon: BookOpen },
  { to: "/exercises", label: "Exercises", icon: ClipboardCheck },
  { to: "/challenges", label: "Challenges", icon: Target },
  { to: "/achievements", label: "Achievements", icon: Trophy },
  { to: "/profile", label: "Profile", icon: User },
];
