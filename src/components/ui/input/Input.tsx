interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
};

export const Input: React.FC<InputProps> = ({ label, className = "", ...props }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <input
        {...props}
        className={`border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg px-3 py-2 text-sm transition-all outline-none ${className}`}
      />
    </div>
  );
};
