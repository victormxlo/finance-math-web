import {  Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="border-b bg-card text-card-foreground">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <Link to="/" className="font-bold text-lg">
          Numera
        </Link>
        <div className="flex gap-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/about" className="hover:underline">
            Sobre
          </Link>
        </div>
      </div>
    </nav>
  );
}