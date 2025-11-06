import { useState, useRef, useEffect } from "react";

interface Option {
  label: string;
  value: string;
};

interface SelectProps {
  value?: string;
  placeholder?: string;
  options: Option[];
  onChange: (value: string) => void;
  className?: string;
};

export const Select: React.FC<SelectProps> = ({
  value,
  placeholder = "Selecione...",
  options,
  onChange,
  className = "",
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options.find((opt) => opt.value === value);

  return (
    <div ref={ref} className={`relative w-full ${className}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full border border-gray-300 bg-white rounded-lg px-3 py-2 text-left text-sm flex justify-between items-center hover:border-gray-400 focus:ring-2 focus:ring-indigo-500 transition"
      >
        <span>{selected ? selected.label : placeholder}</span>
        <svg
          className={`w-4 h-4 ml-2 transform transition-transform ${open ? "rotate-180" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-md max-h-48 overflow-auto text-sm">
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`px-3 py-2 cursor-pointer hover:bg-indigo-50 ${
                opt.value === value ? "bg-indigo-100 font-medium" : ""
              }`}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
