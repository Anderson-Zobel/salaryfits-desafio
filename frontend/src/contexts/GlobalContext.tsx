import React, { createContext, useContext, ReactNode } from 'react';

interface GlobalContextProps {
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const contextValue: GlobalContextProps = {
    };

    return <GlobalContext.Provider value={contextValue}>{children}</GlobalContext.Provider>;
};

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobalContext deve ser usado dentro de um GlobalProvider');
    }
    return context;
};
