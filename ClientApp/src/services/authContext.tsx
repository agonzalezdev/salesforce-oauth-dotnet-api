import Cookies from "js-cookie";
import { createContext, useContext, ReactNode, useState } from "react";

type authContextType = {
    user: boolean | null;
    checkLogin: () => void;
    logout: () => void;
};

const authContextDefaultValues: authContextType = {
    user: null,
    checkLogin: () => { },
    logout: () => { },
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export function useAuth() {
    return useContext(AuthContext);
}

type Props = {
    children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
    const [user, setUser] = useState<boolean | null>(null);

    const checkLogin = () => {
        if (Cookies.get("LOGGED_IN")) {
            setUser(true);
        }
    };

    const logout = () => {
        Cookies.remove("LOGGED_IN");
        setUser(false);
    };

    const value = {
        user,
        checkLogin,
        logout,
    };

    return (
        <>
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        </>
    );
}

export default AuthProvider;