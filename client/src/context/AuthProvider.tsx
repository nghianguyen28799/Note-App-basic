import React, { createContext, useContext, useEffect, useState } from "react";
import { User, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { clearLocalStorage, setLocalStorage } from "@/utils";

type ContextProps = {
  user?: User | null;
  handleSetUser: (value: User | null) => void;
};

const defaultValue = {
  user: null,
  handleSetUser: () => {},
};

const AuthContext = createContext<Partial<ContextProps>>(defaultValue);

export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSetUser = (value: User | null): void => {
    setUser(value);
  };

  useEffect(() => {
    const unsubscribed = auth.onIdTokenChanged((user) => {
      if (user && user?.uid) {
        handleSetUser(user);
        setLocalStorage("accessToken", (user as any)?.accessToken);
        return;
      }

      setUser(null);
      clearLocalStorage();
      navigate("/login");
    });
    return () => {
      unsubscribed();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, user?.uid]);

  return <AuthContext.Provider value={{ user, handleSetUser }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
