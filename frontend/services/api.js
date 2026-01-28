import { useEffect } from "react";
import { useDestinationContext } from "../contexts/DestinationContext";

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
