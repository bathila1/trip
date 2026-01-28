import { useEffect } from "react";
import { useDestinationContext } from "../contexts/DestinationContext";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export default function FetchingDestinations() {
  const { destinations, setDestinations } = useDestinationContext();

  useEffect(() => {
    fetch(
      "https://nonsocialistic-blanca-cleverishly.ngrok-free.dev/api/destinations/",
    )
      .then((res) => res.json())
      .then((data) => setDestinations(data))
      .catch((err) => console.error("API error:", err));
  }, []);
}

export const USER_API = {
  login: `${BASE_URL}/api/auth/login/`,
  register: `${BASE_URL}/api/auth/register/`,
  refresh: `${BASE_URL}api/auth/token/refresh/`,
  profile: `${BASE_URL}/api/auth/profile/`,
};
