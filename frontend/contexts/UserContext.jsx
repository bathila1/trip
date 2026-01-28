import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";
import { USER_API } from "../services/api";

export const userContext = createContext();
export const useUserContext = () => useContext(userContext);

const UserContext = ({ children }) => {
  const router = useRouter();

  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const ACCESS_KEY = "access_token";
  const REFRESH_KEY = "refresh_token";

  // check saved login
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const savedAccess = await SecureStore.getItemAsync(ACCESS_KEY);
        const savedRefresh = await SecureStore.getItemAsync(REFRESH_KEY);

        //setting token if already saved
        if (savedAccess) {
          setAccessToken(savedAccess);
        }

        if (savedAccess && savedRefresh) {
          await loadProfile();
        }
      } catch (err) {
        console.log("SecureStore error:", err);
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, []);

  const login = async (accessToken, refreshToken) => {
    await SecureStore.setItemAsync(ACCESS_KEY, accessToken);
    await SecureStore.setItemAsync(REFRESH_KEY, refreshToken);
    setAccessToken(accessToken);

    await loadProfile();
  };

  //if the access token is already expired gets a new access token
  const refreshAccess = async () => {
    const refresh = await SecureStore.getItemAsync(REFRESH_KEY);

    const res = await fetch(USER_API.refresh, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    });

    const data = await res.json();

    await SecureStore.setItemAsync(ACCESS_KEY, data.access);

    return data.access;
  };

  //loads the user profile
  const loadProfile = async () => {
    let access = await SecureStore.getItemAsync(ACCESS_KEY);
    if (!access) return null;

    // try with current access token
    let res = await fetch(USER_API.profile, {
      headers: { Authorization: `Bearer ${access}` },
    });

    // if expired -> refresh -> retry once
    if (res.status === 401) {
      const newAccess = await refreshAccess();
      if (!newAccess) return null;

      res = await fetch(USER_API.profile, {
        headers: { Authorization: `Bearer ${newAccess}` },
      });
    }

    if (!res.ok) return null;

    const data = await res.json(); // user profile data
    setUser(data);
    console.log(data);

    return data;
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(ACCESS_KEY);
    await SecureStore.deleteItemAsync(REFRESH_KEY);
    setAccessToken(null);
    setUser(null);
  };

  const value = {
    user,
    accessToken,
    loading,
    login,
    logout,
    refreshAccess,
    loadProfile,
  };

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};

export default UserContext;
