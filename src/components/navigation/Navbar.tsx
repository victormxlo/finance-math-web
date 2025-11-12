import { useNavbarProfile } from "@/app/hooks/useNavbarProfile";
import { cn } from "@/lib/utils";
import { Award, Coins, Star } from "lucide-react";
import {  Link, useLocation, useNavigate } from "react-router-dom";
import { AvatarInitials } from "@/components/ui/AvatarInitials";

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { username, xp, levelName, virtualCurrency } = useNavbarProfile();

  const pageTitle = getPageTitle(location.pathname);

  const logoSrc = "";

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-sm",
        "text-sm text-foreground"
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4 min-w-[160px]">
          <Link
            to="/"
            className="flex items-center gap-2 pointer-events-auto"
            aria-label="Ir para o Dashboard"
          >
            {logoSrc ? (
              <img
                src={logoSrc}
                alt="Numera Logo"
                className="h-6 sm:h-8 w-auto object-contain"
              />
            ) : (
              <span className="font-medium text-lg font-extrabold tracking-tight">Numera</span>
            )}
          </Link>

          <span className="font-medium">{pageTitle}</span>
        </div>

        <div className="flex items-center gap-4 min-w-[220px] justify-end">
          <div className="hidden sm:flex items-center gap-4 text-xs text-muted-foreground">
            <StatusItem icon={<Award size={16} />} label={levelName ?? "Lv. —"} />
            <StatusItem icon={<Star size={16} />} label={`${xp} XP`} />
            <StatusItem icon={<Coins size={16} />} label={`${virtualCurrency}`} />
          </div>

          <button
            onClick={() => navigate("/profile")}
            className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-muted/50 transition"
            aria-label="Open profile"
          >
            <AvatarInitials name={username ?? ""} size={36} />
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-sm font-medium leading-none">{username}</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

function StatusItem({ icon, label }: { icon: React.ReactNode; label: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-transparent">
      <div className="opacity-90">{icon}</div>
      <div className="text-xs font-medium">{label}</div>
    </div>
  );
};

function getPageTitle(path: string) {
  const map: Record<string, string> = {
    "/": "Dashboard",
    "/contents": "Contents",
    "/exercises": "Exercises",
    "/challenges": "Challenges",
    "/achievements": "Achievements",
    "/profile": "Profile",
  };

  const exact = map[path];
  if (exact) return exact;
  const prefix = Object.keys(map).find((k) => path.startsWith(k + "/"));
  if (prefix) return map[prefix];
  return "Page";
};
