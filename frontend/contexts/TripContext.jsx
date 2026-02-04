import { createContext, useContext, useState } from "react";

export const tripContext = createContext();
export const useTripContext = () => useContext(tripContext);

const TripContext = ({ children }) => {
  const [trips, setTrips] = useState([]);

  const createTrip = (trip) => {
    const newTrip = {
      id: `trip_${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...trip,
    };
    setTrips((prev) => [newTrip, ...prev]);
  };

  const getTripById = (tripId) => trips.find((t) => t.id === tripId);

  const deleteTrip = (tripId) => {
    setTrips((prev) => prev.filter((t) => t.id !== tripId));
  };

  const updateTrip = (tripId, updates) => {
    setTrips((prev) =>
      prev.map((t) => {
        if (t.id !== tripId) return t;
        return { ...t, ...updates };
      }),
    );
  };

  const value = {
    trips,
    createTrip,
    getTripById,
    deleteTrip,
    updateTrip,
  };

  return <tripContext.Provider value={value}>{children}</tripContext.Provider>;
};

export default TripContext;
