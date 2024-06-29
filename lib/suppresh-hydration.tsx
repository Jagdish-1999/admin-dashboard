import React, { useEffect, useState } from "react";
import { ImSpinner8 } from "react-icons/im";

const SuppressHydration = ({ children }: { children: React.ReactNode }) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <ImSpinner8 className="w-8 h-8 text-neutral-500 animate-spin duration-1000 transition-all ease-in" />
      </div>
    );
  }

  return children;
};

export default SuppressHydration;
