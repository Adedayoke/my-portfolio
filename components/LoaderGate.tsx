"use client";

import { useState, useEffect } from "react";
import PageLoader from "./PageLoader";

const SESSION_KEY = "nd_loaded";

export default function LoaderGate({ children }: { children: React.ReactNode }) {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Skip loader on subsequent visits within the same session
    if (sessionStorage.getItem(SESSION_KEY)) {
      setShowLoader(false);
    }
  }, []);

  const handleComplete = () => {
    sessionStorage.setItem(SESSION_KEY, "1");
    setShowLoader(false);
  };

  return (
    <>
      {showLoader && <PageLoader onComplete={handleComplete} />}
      {children}
    </>
  );
}
