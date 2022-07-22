import { createContext, useContext } from "react";

const Context = createContext();
const useGlobalState = () => useContext(Context);

export { Context, useGlobalState };
