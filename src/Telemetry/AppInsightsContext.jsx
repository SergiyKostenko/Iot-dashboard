import React, { createContext } from "react";
import { reactPlugin } from "./AppInsights";

const AppInsightsContext = createContext(reactPlugin);

const AppInsightsContextProvider = ({ children }) => {
    return (
        <AppInsightsContext.Provider value={reactPlugin}>
            {children}
        </AppInsightsContext.Provider>
    );
};

export { AppInsightsContext, AppInsightsContextProvider };