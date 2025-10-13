import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export function NotFoundPage() {

  const navigate = useNavigate();

  const redirectToHome = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center px-6 py-12 bg-white rounded-xl shadow-lg">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-6xl font-bold text-red-500">404</h1>
          <p className="text-xl text-gray-600 mt-4">A página que você está procurando não foi encontrada.</p>
          <div className="mt-8">
            <button
              className="px-6 py-3 bg-indigo-600 rounded-full hover:bg-indigo-800 transition"
              onClick={redirectToHome}
            >
              Voltar para a Home
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
