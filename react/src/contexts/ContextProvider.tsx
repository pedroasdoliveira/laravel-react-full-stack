import {
    Dispatch,
    ReactNode,
    createContext,
    useContext,
    useState,
} from "react";

type Props = {
    children: ReactNode;
};

interface StateTypes {
    user: null | {};
    token: null | string;
    setUser: Dispatch<{}>
    setToken: (token: string) => void;
}

const StateContext = createContext<StateTypes>({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {},
});

export const ContextProvider = ({ children }: Props) => {
    const [user, setUser] = useState({});
    const [token, _setToken] = useState<null | string>(
        localStorage.getItem("ACCESS_TOKEN")
    );

    const setToken = (token: string) => {
        _setToken(token);
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };

    return (
        <StateContext.Provider value={{ user, token, setUser, setToken }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
