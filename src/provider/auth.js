"use client";

const {
  createContext,
  useEffect,
  useState,

  useMemo,
  useCallback,
  use,
} = require("react");

const AuthContext = createContext({
  isLogin: null,
  accessToken: null,
  refreshToken: null,
  user: null,
  setAuth: ({ accessToken, refreshToken, user }) => {},
  logout: () => {},
});

export function AuthContextProvider({ children }) {
  const [isLogin, setIsLogin] = useState(null);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const setAuth = useCallback(
    ({ accessToken, refreshToken, user }) => {
      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));
      setIsLogin(true);
      setToken({ accessToken, refreshToken });
      setUser(user);
      console.log({ accessToken, refreshToken, user });
    },
    [setIsLogin, setToken, setUser]
  );

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setIsLogin(false);
    setToken(null);
    setUser(null);
  };

  const authValue = useMemo(
    () => ({
      isLogin,
      accessToken: token?.accessToken,
      refreshToken: token?.refreshToken,
      user,
      setAuth,
      logout,
    }),
    [isLogin, token, user, setAuth, logout]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!localStorage) return;

    const accessToken = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    const user = JSON.parse(localStorage.getItem("user"));

    console.log({
      accessToken,
      refreshToken,
      user,
    });

    if (accessToken && refreshToken && user) {
      setIsLogin(true);
      setToken({ accessToken, refreshToken });
      setUser(user);

      return;
    }

    setIsLogin(false);
  }, [typeof window]);

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  return use(AuthContext);
};
