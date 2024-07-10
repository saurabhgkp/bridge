import React, { createContext, useContext } from "react";
const ApiContext = createContext();

export const ApiProvider = ({ children }) => {

  return (
    <ApiContext.Provider>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  const context = useContext(ApiContext);
  return context;
};
