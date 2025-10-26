import React, { createContext, useContext, useEffect } from "react";
import { setApiBaseUrl } from "../api/client";

interface ApiContextType { apiUrl: string; }
const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const apiUrl = import.meta.env.VITE_API_URL as string;

  useEffect(() => {
    setApiBaseUrl(apiUrl);
  }, [apiUrl]);

  return <ApiContext.Provider value={{ apiUrl }}>{children}</ApiContext.Provider>;
};

export const useApi = () => {
  const ctx = useContext(ApiContext);
  if (!ctx) throw new Error("useApi must be used within ApiProvider");
  return ctx;
};
