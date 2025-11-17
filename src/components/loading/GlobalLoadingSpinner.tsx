import logo from "@/assets/branding/numera-logo.png";

export const GlobalLoadingSpinner = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/10 backdrop-blur-xl">
      <img
        src={logo}
        alt="Loading"
        className="
          w-14 h-14
          animate-spin
          duration-700
          select-none pointer-events-none
        "
      />
    </div>
  );
};
