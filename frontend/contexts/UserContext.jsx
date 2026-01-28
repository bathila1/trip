import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";

export const userContext = createContext();
export const useUserContext = () => useContext(userContext);

const UserContext = ({ children }) => {
  const router = useRouter();

  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const ACCESS_KEY = "access_token";
  const REFRESH_KEY = "refresh_token";
  const USER_KEY = "user_key";

  // check saved login
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const savedAccess = await SecureStore.getItemAsync(ACCESS_KEY);
        const savedRefresh = await SecureStore.getItemAsync(REFRESH_KEY);
        const savedUser = await AsyncStorage.getItem(USER_KEY);

        //setting token if already saved
        if (savedAccess) {
          setAccessToken(savedAccess);
        }

        //setting user if already saved
        if (savedUser) {
          setUser(JSON.parse(savedUser));
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
  };

  const updateUser = async (user) => {
    setUser(user);
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(ACCESS_KEY);
    await SecureStore.deleteItemAsync(REFRESH_KEY);
    await AsyncStorage.removeItem(USER_KEY);
    setAccessToken(null);
    setUser(null);
  };

  const value = {
    user,
    accessToken,
    loading,
    login,
    logout,
    updateUser,
  };

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};

export default UserContext;
