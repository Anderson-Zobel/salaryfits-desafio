import React, { createContext, useContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';

interface TriggerProps {
    propString?: string;
    propNumber?: number;
    createClient?: boolean;
    createPet?: boolean;
}

interface GlobalContextProps {
    trigger: TriggerProps | null;
    setTrigger: Dispatch<SetStateAction<TriggerProps | null>>;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [trigger, setTrigger] = useState<TriggerProps | null>(null);

    const contextValue: GlobalContextProps = {
        trigger,
        setTrigger,
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
