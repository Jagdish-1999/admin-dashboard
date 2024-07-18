import Loading from "@/app/loading";
import React, { useEffect, useState } from "react";

const SuppressHydration = ({ children }: { children: React.ReactNode }) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return <Loading />;
  }

  return children;
};

export default SuppressHydration;
