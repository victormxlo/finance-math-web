import { cn } from "@/lib/utils";
import { footerLinks } from "@/lib/constants/footerLinks";
import { Github } from "lucide-react";

interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer
      role="contentinfo"
      className={cn(
        "w-full border-t bg-white text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300",
        "py-6",
        className
      )}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col">
            <span className="text-lg font-semibold">Numera</span>
            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400 max-w-lg">
              Plataforma gamificada de Educação Financeira.
            </p>
          </div>

          <div className="flex items-center justify-end gap-4">
            <a
              href={footerLinks.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ver repositório do projeto no GitHub"
              className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-800 dark:text-neutral-300"
            >
              <Github size={16} aria-hidden />
              <span className="hidden sm:inline">GitHub</span>
            </a>

            <div className="text-xs text-neutral-500 dark:text-neutral-400 text-right">
              <div>© {new Date().getFullYear()} Numera</div>
              <div className="mt-0.5">{footerLinks.meta.version}</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;